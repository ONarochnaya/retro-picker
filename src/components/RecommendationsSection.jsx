import { Card } from './UIComponents.jsx';
import { Recommendation } from './Recommendation.jsx';

export function RecommendationsSection({ show, top, requestedMinutes, answers, onCopy }) {
    return (
        <Card
            title="Top picks"
            footer={<small className="text-muted">Heuristic scoring uses time fit, mood, sprint outcome, goal, mode & novelty.</small>}
        >
            {!show && (
                <div className="text-muted">
                    Fill the questions and click <span className="fw-semibold">Get recommendation</span> to see suggestions.
                </div>
            )}
            {show && (
                <>
                    {top.map((f) => (
                        <Recommendation
                            key={f.id}
                            format={f}
                            requestedMinutes={requestedMinutes}
                            answers={answers}
                            onCopy={onCopy}
                        />
                    ))}
                </>
            )}
        </Card>
    );
}