import { useMemo, useState } from "react";

/** ---------- Questions ---------- */
const QUESTIONS = [
    {
        key: "mood",
        label: "What's the overall team mood?",
        options: [
            { value: "stressed", label: "Stressed / fatigued" },
            { value: "neutral", label: "Neutral / okay" },
            { value: "excited", label: "Upbeat / energized" },
            { value: "tense", label: "Tense / conflict present" },
        ],
    },
    {
        key: "time",
        label: "How much time do you have?",
        options: [
            { value: "25", label: "~25 min" },
            { value: "40", label: "~40 min" },
            { value: "60", label: "~60 min" },
            { value: "90", label: "~90 min" },
        ],
    },
    {
        key: "goal",
        label: "What matters most right now?",
        options: [
            { value: "action", label: "Actionable fixes" },
            { value: "learning", label: "Capture learning" },
            { value: "trust", label: "Repair / build trust" },
            { value: "vision", label: "Refocus on goals" },
        ],
    },
];

/** ---------- Formats (now with structure + tips) ---------- */
const FORMATS = [
    {
        id: "start-stop-continue",
        name: "Start / Stop / Continue",
        time: { min: 30, max: 60 },
        tags: ["action"],
        structure: [
            { label: "Warm-up & check-in", minutes: 5 },
            { label: "Silent write (Start/Stop/Continue)", minutes: 10 },
            { label: "Group & vote", minutes: 10 },
            { label: "Actions & owners", minutes: 10 },
        ],
        tips: [
            "Aim for 2–3 clear action items.",
            "Timebox writing to keep momentum.",
            "Use dot-voting to prioritize.",
        ],
    },
    {
        id: "mad-sad-glad",
        name: "Mad / Sad / Glad",
        time: { min: 45, max: 75 },
        tags: ["trust"],
        structure: [
            { label: "Safety reminder", minutes: 5 },
            { label: "Silent write (M/S/G)", minutes: 15 },
            { label: "Share & cluster", minutes: 15 },
            { label: "Vote & discuss", minutes: 10 },
            { label: "Actions / experiments", minutes: 10 },
        ],
        tips: [
            "Invite emotional honesty; stay behavior-focused.",
            "Use a parking lot for 1:1 follow-ups.",
        ],
    },
    {
        id: "sailboat",
        name: "Sailboat",
        time: { min: 45, max: 90 },
        tags: ["vision"],
        structure: [
            { label: "Set the scene (island/wind/anchors/rocks)", minutes: 5 },
            { label: "Brainstorm & map", minutes: 20 },
            { label: "Cluster & vote", minutes: 10 },
            { label: "Discuss top themes", minutes: 15 },
            { label: "Commit to experiments", minutes: 10 },
        ],
        tips: [
            "Great when goals feel fuzzy or risks loom.",
            "Ask: which wind can we amplify next sprint?",
        ],
    },
    {
        id: "four-ls",
        name: "4Ls (Liked, Learned, Lacked, Longed for)",
        time: { min: 40, max: 70 },
        tags: ["learning"],
        structure: [
            { label: "Individual write-up (4 columns)", minutes: 15 },
            { label: "Share & group", minutes: 15 },
            { label: "Vote & discuss", minutes: 10 },
            { label: "Actions / next experiments", minutes: 10 },
        ],
        tips: [
            "Balances emotions and learning.",
            "Good after onboarding or big changes.",
        ],
    },
    {
        id: "daki",
        name: "DAKI (Drop, Add, Keep, Improve)",
        time: { min: 30, max: 60 },
        tags: ["action"],
        structure: [
            { label: "Silent notes (D/A/K/I)", minutes: 10 },
            { label: "Cluster & vote", minutes: 10 },
            { label: "Discuss top 2–3", minutes: 10 },
            { label: "Decide actions & owners", minutes: 10 },
        ],
        tips: [
            "Great for rapid process tweaks.",
            "Pair with a quick check-in to set tone.",
        ],
    },
];

/** ---------- Engine ---------- */
function scoreFormat(answers, format) {
    let score = 0;
    const t = Number(answers.time || 0);

    // Time fit (soft preference if close)
    if (t && t >= format.time.min && t <= format.time.max) score += 2;
    else if (t) {
        const dist = Math.min(
            Math.abs(t - format.time.min),
            Math.abs(t - format.time.max)
        );
        if (dist <= 10) score += 1;
    }

    // Goal match
    if (answers.goal && format.tags.includes(answers.goal)) score += 3;

    // Mood heuristics
    if (answers.mood === "tense" && format.id === "mad-sad-glad") score += 2;
    if (answers.mood === "stressed" && format.id === "daki") score += 1;

    return score;
}

function suggestFormats(answers) {
    return FORMATS
        .map((f) => ({ ...f, score: scoreFormat(answers, f) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
}

/** ---------- Helpers ---------- */
function minutesToPlan(total, blocks) {
    // scale structure proportionally to total minutes
    const sum = blocks.reduce((acc, b) => acc + b.minutes, 0) || 1;
    const scaled = blocks.map((b) => ({
        ...b,
        minutes: Math.max(2, Math.round((b.minutes / sum) * total)),
    }));
    // fix rounding drift
    const drift = total - scaled.reduce((acc, b) => acc + b.minutes, 0);
    if (drift !== 0 && scaled.length) scaled[0].minutes += drift;
    return scaled;
}

/** ---------- UI Bits ---------- */
function Selector({ q, value, onChange }) {
    return (
        <div className="mb-3">
            <label className="form-label">{q.label}</label>
            <select
                className="form-select"
                value={value || ""}
                onChange={(e) => onChange(q.key, e.target.value)}
            >
                <option value="" disabled>Choose…</option>
                {q.options.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                ))}
            </select>
        </div>
    );
}

function Card({ title, children, footer }) {
    return (
        <div className="card shadow-sm mb-3">
            <div className="card-header fw-semibold">{title}</div>
            <div className="card-body">{children}</div>
            {footer && <div className="card-footer bg-light">{footer}</div>}
        </div>
    );
}

function Pill({ children }) {
    return <span className="badge bg-secondary me-2">{children}</span>;
}

function Recommendation({ format, requestedMinutes }) {
    const total = requestedMinutes ? Number(requestedMinutes) : Math.min(
        Math.max(format.time.min, 45),
        format.time.max
    );
    const plan = useMemo(() => minutesToPlan(total, format.structure), [total, format.structure]);

    return (
        <Card title={`${format.name} · Suggested plan (${total} min)`}>
            <div className="mb-2">
                <Pill>{format.time.min}–{format.time.max} min</Pill>
                {format.tags.map((t) => <Pill key={t}>{t}</Pill>)}
            </div>

            <ol className="list-group list-group-numbered mb-3">
                {plan.map((b, idx) => (
                    <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{b.label}</span>
                        <span className="badge bg-primary rounded-pill">{b.minutes}m</span>
                    </li>
                ))}
            </ol>

            <div>
                <div className="fw-semibold mb-1">Facilitation tips</div>
                <ul className="mb-0">
                    {format.tips.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
            </div>
        </Card>
    );
}

/** ---------- App ---------- */
export default function App() {
    const [answers, setAnswers] = useState({});
    const [show, setShow] = useState(false);

    const top = useMemo(() => suggestFormats(answers), [answers]);
    const allAnswered = QUESTIONS.every((q) => answers[q.key]);

    function onChange(key, val) {
        setAnswers((prev) => ({ ...prev, [key]: val }));
    }

    function reset() {
        setAnswers({});
        setShow(false);
    }

    return (
        <div className="container py-4">
            <header className="mb-3">
                <h1 className="h4 mb-1">Retro Format Picker</h1>
                <p className="text-muted mb-0">Step 4: recommendations as cards with auto-scaled agenda</p>
            </header>

            <div className="row g-3">
                <div className="col-lg-5">
                    <Card title="Quick questions">
                        {QUESTIONS.map((q) => (
                            <Selector key={q.key} q={q} value={answers[q.key]} onChange={onChange} />
                        ))}
                        <div className="d-flex gap-2">
                            <button className="btn btn-primary" disabled={!allAnswered} onClick={() => setShow(true)}>
                                Get recommendation
                            </button>
                            <button className="btn btn-outline-secondary" onClick={reset}>Reset</button>
                        </div>
                    </Card>
                </div>

                <div className="col-lg-7">
                    <Card
                        title="Top picks"
                        footer={<small className="text-muted">Heuristic scoring based on time fit, mood, and goal.</small>}
                    >
                        {!show && (
                            <div className="text-muted">
                                Fill the questions and click <span className="fw-semibold">Get recommendation</span> to see suggestions.
                            </div>
                        )}
                        {show && (
                            <>
                                {top.map((f) => (
                                    <Recommendation key={f.id} format={f} requestedMinutes={answers.time} />
                                ))}
                            </>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}
