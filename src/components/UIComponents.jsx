export function Selector({ q, value, onChange }) {
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

export function Card({ title, children, footer }) {
    return (
        <div className="card shadow-sm mb-3">
            <div className="card-header fw-semibold">{title}</div>
            <div className="card-body">{children}</div>
            {footer && <div className="card-footer bg-light">{footer}</div>}
        </div>
    );
}

export function Pill({ children }) {
    return <span className="badge bg-secondary me-2">{children}</span>;
}