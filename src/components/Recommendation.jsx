import { useMemo } from 'react';
import { minutesToPlan } from '../utils/timeUtils.js';
import { Card, Pill } from './UIComponents.jsx';

export function Recommendation({ format, requestedMinutes }) {
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