import { useMemo, useState } from "react";
import { QUESTIONS } from './data/questions.js';
import { suggestFormats } from './utils/scoring.js';
import { QuestionsSection } from './components/QuestionsSection.jsx';
import { ExportSection } from './components/ExportSection.jsx';
import { RecommendationsSection } from './components/RecommendationsSection.jsx';

export default function App() {
    const [answers, setAnswers] = useState({});
    const [show, setShow] = useState(false);
    const [copied, setCopied] = useState("");

    const top = useMemo(() => suggestFormats(answers), [answers]);
    const allAnswered = QUESTIONS.every((q) => answers[q.key]);

    function onChange(key, val) {
        setAnswers((prev) => ({ ...prev, [key]: val }));
    }

    function reset() {
        setAnswers({});
        setShow(false);
        setCopied("");
    }

    function handleGetRecommendation() {
        setShow(true);
    }

    function handleCopy(message) {
        setCopied(message);
        setTimeout(() => setCopied(""), 2000);
    }

    return (
        <div className="container py-4">
            <header className="mb-3">
                <h1 className="h4 mb-1">Retro Format Picker</h1>
                <p className="text-muted mb-0">Step 6: more signal (3 extra questions) + 2 formats</p>
            </header>

            <div className="row g-3">
                <div className="col-lg-5">
                    <QuestionsSection
                        answers={answers}
                        onChange={onChange}
                        allAnswered={allAnswered}
                        onGetRecommendation={handleGetRecommendation}
                        onReset={reset}
                    />

                    <ExportSection
                        show={show}
                        answers={answers}
                        top={top}
                        copied={copied}
                        onCopy={handleCopy}
                    />
                </div>

                <div className="col-lg-7">
                    <RecommendationsSection
                        show={show}
                        top={top}
                        requestedMinutes={answers.time}
                    />
                </div>
            </div>
        </div>
    );
}