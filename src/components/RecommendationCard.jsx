import {useState, useMemo} from "react";
import {minutesToPlan} from "../utils/timeUtils.js";
import {buildSingleFormatMarkdown} from "../utils/exportUtils.js";
import {Badge} from "./ui/Badge.jsx";
import {Button} from "./ui/Button.jsx";

export function RecommendationCard({format, requestedMinutes, answers}) {
    const [copied, setCopied] = useState(false);

    const totalMinutes = useMemo(() => {
        if (requestedMinutes) return Number(requestedMinutes);
        return Math.min(Math.max(format.time.min, 45), format.time.max);
    }, [requestedMinutes, format]);

    const plan = useMemo(
        () => minutesToPlan(totalMinutes, format.structure),
        [totalMinutes, format.structure]
    );

    const handleCopyMarkdown = async () => {
        try {
            const markdown = buildSingleFormatMarkdown(answers, format);
            await navigator.clipboard.writeText(markdown);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy:", error);
            alert("Copy failed. Please try selecting and copying manually.");
        }
    };

    return (
        <div className="recommendation-card">
            <div className="d-flex justify-content-between align-items-start mb-3">
                <h5 className="mb-0">{format.name}</h5>
                <Badge variant="primary">{totalMinutes} min</Badge>
            </div>

            <div className="mb-3">
                <Badge>{format.time.min}–{format.time.max} min</Badge>
                {format.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                        {tag}
                    </Badge>
                ))}
            </div>

            <ol className="list-group list-group-numbered mb-3">
                {plan.map((step, idx) => (
                    <li
                        key={idx}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        <span>{step.label}</span>
                        <Badge variant="info">{step.minutes}m</Badge>
                    </li>
                ))}
            </ol>

            <div className="mb-3">
                <h6 className="fw-semibold mb-2">Facilitation tips</h6>
                <ul className="mb-0 small">
                    {format.tips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                    ))}
                </ul>
            </div>

            <Button
                variant={copied ? "success" : "outline"}
                size="sm"
                onClick={handleCopyMarkdown}
                className="w-100"
            >
                {copied ? "✓ Copied" : "Copy as Markdown"}
            </Button>
        </div>
    );
}