export default function OptionChips({ q, value, onChange }) {
    // ARIA: делаем псевдо-радиогруппу
    return (
        <div className="choice-group" role="radiogroup" aria-label={q.label}>
            {q.options.map((o) => {
                const selected = value === o.value;
                return (
                    <button
                        key={o.value}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        className={`chip ${selected ? "selected" : ""}`}
                        onClick={() => onChange(q.key, o.value)}
                        title={o.label}
                    >
                        {o.icon && <span className="icon" aria-hidden>{o.icon}</span>}
                        <div style={{display:"grid", gap:2}}>
                            <span className="title">{o.label}</span>
                            {o.sub && <span className="sub">{o.sub}</span>}
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
