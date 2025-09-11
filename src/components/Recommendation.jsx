import {useState, useMemo} from 'react';
import {minutesToPlan} from '../utils/timeUtils.js';
import {buildSingleFormatMarkdown} from '../utils/exportUtils.js';
import {Card, Pill} from './UIComponents.jsx';

export function Recommendation({
                                   format,
                                   requestedMinutes,
                                   answers,
                                   onCopy,            // optional: keeps your old "toast" style handler
                                   onCopyMarkdown,    // optional: new handler that receives the markdown
                               }) {
    const [copied, setCopied] = useState(false);

    const total = requestedMinutes
        ? Number(requestedMinutes)
        : Math.min(Math.max(format.time.min, 45), format.time.max);

    const plan = useMemo(
        () => minutesToPlan(total, format.structure),
        [total, format.structure]
    );

    async function handleCopy() {
        try {
            const md = buildSingleFormatMarkdown(answers, format);

            if (typeof onCopyMarkdown === 'function') {
                await onCopyMarkdown(md);
            } else if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(md);
            } else {
                // very old browsers
                throw new Error('No clipboard API available');
            }

            if (typeof onCopy === 'function') {
                onCopy(`${format.name} copied to clipboard`);
            }

            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (e) {
            alert('Copy failed. You can manually select and copy.');
        }
    }

    return (
        <Card
            title={`${format.name} · Suggested plan (${total} min)`}
            footer={
                <div className="d-flex gap-2">
                    <button
                        className={`btn btn-sm ${copied ? 'btn-success' : 'btn-outline-dark'}`}
                        style={copied ? {backgroundColor: '#d4edda', color: '#155724'} : {}}
                        onClick={handleCopy}
                        title="Copy this format as Markdown"
                    >
                        {copied ? 'Copied' : 'Copy Markdown'}
                    </button>
                </div>
            }
        >
            <div className="mb-2">
                <Pill>
                    {format.time.min}–{format.time.max} min
                </Pill>
                {format.tags.map((t) => (
                    <Pill key={t}>{t}</Pill>
                ))}
            </div>

            <ol className="list-group list-group-numbered mb-3">
                {plan.map((b, idx) => (
                    <li
                        key={idx}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        <span>{b.label}</span>
                        <span className="badge bg-primary rounded-pill">{b.minutes}m</span>
                    </li>
                ))}
            </ol>

            <div className="mb-3">
                <div className="fw-semibold mb-1">Facilitation tips</div>
                <ul className="mb-0">
                    {format.tips.map((t, i) => (
                        <li key={i}>{t}</li>
                    ))}
                </ul>
            </div>
        </Card>
    );
}
