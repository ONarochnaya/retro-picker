import { useMemo } from 'react';
import { minutesToPlan } from '../utils/timeUtils.js';
import { buildSingleFormatMarkdown } from '../utils/exportUtils.js';
import { Card, Pill } from './UIComponents.jsx';

export function Recommendation({ format, requestedMinutes, answers, onCopy }) {
    const total = requestedMinutes ? Number(requestedMinutes) : Math.min(
        Math.max(format.time.min, 45),
        format.time.max
    );
    const plan = useMemo(() => minutesToPlan(total, format.structure), [total, format.structure]);

    async function copyMarkdown() {
        try {
            const markdown = buildSingleFormatMarkdown(answers, format);
            await navigator.clipboard.writeText(markdown);
            onCopy(`${format.name} copied to clipboard`);
        } catch (e) {
            alert("Copy failed. You can manually select and copy.");
        }
    }

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

            <div className="mb-3">
                <div className="fw-semibold mb-1">Facilitation tips</div>
                <ul className="mb-0">
                    {format.tips.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
            </div>

            <div className="d-flex justify-content-end">
                <button
                    className="btn btn-sm btn-outline-dark"
                    onClick={copyMarkdown}
                    title="Copy this format as Markdown"
                >
                    Copy Markdown
                </button>
            </div>
        </Card>
    );
}