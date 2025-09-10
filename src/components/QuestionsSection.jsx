import OptionChips from "./OptionChips.jsx";
import { QUESTIONS } from "../data/questions.js";

export function QuestionsSection({
                                     answers,
                                     onChange,
                                     onSubmit,
                                     onReset,
                                     step,          // current index (0..total-1)
                                     nextStep,
                                     prevStep,
                                     total,         // QUESTIONS.length (passed from App)
                                 }) {
    const q = QUESTIONS[step];
    const answered = !!answers[q.key];
    const allAnswered = QUESTIONS.every((qq) => answers[qq.key]);
    const isLast = step === total - 1;
    const canNext = answered; // require answer before moving forward

    return (
        <div className="card">
            <div className="hd" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>{q.label}</div>
                <div className="progress">{step + 1}/{total}</div>
            </div>

            <div className="bd">
                <OptionChips q={q} value={answers[q.key]} onChange={onChange} />
                {q.hint && <div className="help" style={{marginTop:10}}>{q.hint}</div>}
            </div>

            <div className="ft" style={{ display:"flex", gap:10, justifyContent:"space-between", alignItems:"center", flexWrap:"wrap" }}>
                <div style={{display:"flex", gap:10}}>
                    <button className="btn btn-ghost" onClick={onReset}>Reset</button>
                    <button className="btn btn-ghost" onClick={prevStep} disabled={step === 0}>← Back</button>
                </div>

                {!isLast ? (
                    <button className="btn btn-outline-primary" onClick={nextStep} disabled={!canNext}>
                        Next {canNext ? "" : " (choose an option)"} →
                    </button>
                ) : (
                    <button className="btn btn-outline-primary" onClick={onSubmit} disabled={!allAnswered}>
                        Get recommendation
                    </button>
                )}
            </div>
        </div>
    );
}
