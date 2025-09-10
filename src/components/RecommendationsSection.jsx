import { Card } from "./UIComponents.jsx";
import { Recommendation } from "./Recommendation.jsx";
import { useState, useMemo } from "react";

export function RecommendationsSection({ show, top, requestedMinutes, answers, onCopy }) {
    const [index, setIndex] = useState(0);
    const clamped = useMemo(() => Math.max(0, Math.min(index, Math.max(top.length - 1, 0))), [index, top.length]);

    function prev() { setIndex(i => (i > 0 ? i - 1 : top.length - 1)); }
    function next() { setIndex(i => (i < top.length - 1 ? i + 1 : 0)); }

    if (!show) {
        return (
            <Card title="Top picks" footer={<small className="help">Answer the questions to see suggestions.</small>}>
                <div className="help">Fill in the questions and click <b>Get recommendation</b>.</div>
            </Card>
        );
    }

    return (
        <Card
            title="Top picks"
            footer={<small className="help">{clamped + 1} / {top.length}</small>}
        >
            <div className="carousel">
                <button className="carousel-arrow left" onClick={prev} aria-label="Previous">‹</button>
                <div className="carousel-viewport" style={{ overflow: "hidden" }}>
                    <div
                        className="carousel-track"
                        style={{ transform: `translateX(-${clamped * 100}%)` }}
                    >
                        {top.map((f) => (
                            <div className="carousel-slide" key={f.id}>
                                <Recommendation
                                    format={f}
                                    requestedMinutes={requestedMinutes}
                                    answers={answers}
                                    onCopy={onCopy}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <button className="carousel-arrow right" onClick={next} aria-label="Next">›</button>
            </div>
        </Card>
    );
}
