import { QUESTIONS } from '../data/questions.js';
import { Card, Selector } from './UIComponents.jsx';

export function QuestionsSection({ answers, onChange, allAnswered, onGetRecommendation, onReset }) {
    return (
        <Card title="Quick questions">
            {QUESTIONS.map((q) => (
                <Selector key={q.key} q={q} value={answers[q.key]} onChange={onChange} />
            ))}
            <div className="d-flex gap-2">
                <button className="btn btn-primary" disabled={!allAnswered} onClick={onGetRecommendation}>
                    Get recommendation
                </button>
                <button className="btn btn-outline-secondary" onClick={onReset}>Reset</button>
            </div>
        </Card>
    );
}