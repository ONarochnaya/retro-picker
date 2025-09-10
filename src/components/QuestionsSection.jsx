import { QUESTIONS } from "../data/questions.js";

export function QuestionsSection({ answers, onChange, onSubmit, onReset }) {
    const total = QUESTIONS.length;
    const answeredCount = QUESTIONS.filter(q => !!answers[q.key]).length;

    // Reveal questions progressively: show up to the first unanswered (inclusive)
    const firstUnansweredIdx = QUESTIONS.findIndex(q => !answers[q.key]);
    const visibleCount = firstUnansweredIdx === -1 ? total : firstUnansweredIdx + 1;
    const visibleQs = QUESTIONS.slice(0, visibleCount);

    const allAnswered = answeredCount === total;

    return (
        <div className="card">
            <div className="hd">
                <div className="topbar">
                    <div>What’s the overall team mood?</div>
                    <div className="progress">{answeredCount}/{total}</div>
                </div>
            </div>

            <div className="bd">
                {/* If your first question is mood, show emojis; otherwise keep selects */}
                {visibleQs.map((q, idx) => (
                    <div key={q.key} style={{ marginBottom: 14 }}>
                        <div className="label" style={{ marginBottom: 8 }}>{q.label}</div>

                        {/* If a question has emoji options, render them nicely */}
                        {q.type === "emoji" ? (
                            <div className="emoji-picker">
                                {q.options.map(o => {
                                    const active = answers[q.key] === o.value;
                                    return (
                                        <button
                                            key={o.value}
                                            type="button"
                                            className={`emoji ${active ? "active" : ""}`}
                                            onClick={() => onChange(q.key, o.value)}
                                            aria-label={o.label}
                                            title={o.label}
                                        >
                                            {o.icon /* e.g. "😊" */}
                                        </button>
                                    );
                                })}
                            </div>
                        ) : (
                            <select
                                className="select"
                                value={answers[q.key] || ""}
                                onChange={(e) => onChange(q.key, e.target.value)}
                            >
                                <option value="" disabled>Choose…</option>
                                {q.options.map((o) => (
                                    <option key={o.value} value={o.value}>{o.label}</option>
                                ))}
                            </select>
                        )}

                        {/* Helpful hint below each control (optional) */}
                        {q.hint && <div className="help">{q.hint}</div>}

                        {idx < visibleQs.length - 1 && <div className="rule" />}
                    </div>
                ))}
            </div>

            <div className="ft" style={{ display:"flex", gap:10 }}>
                <button className="btn" disabled={!allAnswered} onClick={onSubmit}>
                    Get recommendation {allAnswered ? "" : ` (${answeredCount}/${total})`}
                </button>
                <button className="btn btn-ghost" onClick={onReset}>Reset</button>
            </div>
        </div>
    );
}
