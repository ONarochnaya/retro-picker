export function OptionChips({question, value, onChange}) {
    const handleSelect = (optionValue) => {
        onChange(question.key, optionValue);
    };

    const getGridClass = () => {
        const optionCount = question.options.length;
        if (optionCount === 2) return "choice-group-2";
        if (optionCount === 3) return "choice-group-3";
        return "choice-group-4";
    };

    return (
        <div
            className={`choice-group ${getGridClass()}`}
            role="radiogroup"
            aria-label={question.label}
        >
            {question.options.map((option) => (
                <OptionChip
                    key={option.value}
                    option={option}
                    isSelected={value === option.value}
                    onSelect={handleSelect}
                />
            ))}
        </div>
    );
}

function OptionChip({option, isSelected, onSelect}) {
    return (
        <button
            type="button"
            role="radio"
            aria-checked={isSelected}
            className={`chip ${isSelected ? "selected" : ""}`}
            onClick={() => onSelect(option.value)}
            title={option.label}
        >
            {option.icon && (
                <span className="chip-icon" aria-hidden="true">
                    {option.icon}
                </span>
            )}
            <div className="chip-content">
                <span className="chip-title">{option.label}</span>
                {option.sub && (
                    <span className="chip-subtitle">{" " + "(" + option.sub + ")"}</span>
                )}
            </div>
        </button>
    );
}