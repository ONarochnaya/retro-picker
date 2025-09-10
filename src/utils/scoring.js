import { FORMATS } from '../data/formats.js';

function includes(format, tagList) {
    return tagList.some((t) => format.tags.includes(t));
}

function scoreFormat(answers, format) {
    let score = 0;
    const t = Number(answers.time || 0);

    // Time fit (soft preference if close)
    if (t && t >= format.time.min && t <= format.time.max) score += 3;
    else if (t) {
        const dist = Math.min(
            Math.abs(t - format.time.min),
            Math.abs(t - format.time.max)
        );
        if (dist <= 10) score += 2;
        else if (dist <= 20) score += 1;
    }

    // Goal match
    if (answers.goal === "action" && includes(format, ["action", "process-tuning"])) score += 3;
    if (answers.goal === "learning" && includes(format, ["learning"])) score += 3;
    if (answers.goal === "trust" && includes(format, ["trust", "emotional-processing"])) score += 3;
    if (answers.goal === "vision" && includes(format, ["vision", "product-focus", "risk-review"])) score += 3;

    // Mood
    if (answers.mood === "tense" && includes(format, ["trust", "emotional-processing"])) score += 2;
    if (answers.mood === "stressed" && includes(format, ["short-time", "balanced"])) score += 2;

    // Sprint outcome
    if (answers.outcome === "many-bugs" && includes(format, ["incident", "many-bugs"])) score += 3;
    if (answers.outcome === "blocked" && includes(format, ["blocked", "risk-review"])) score += 3;
    if (answers.outcome === "overran" && includes(format, ["process-tuning"])) score += 2;
    if (answers.outcome === "met-goals" && includes(format, ["learning", "vision", "balanced"])) score += 2;

    // Mode (slight nudge to remote-friendly which is basically all)
    if (answers.mode === "remote") score += 1;

    // Novelty preference (slight nudge)
    if (answers.novelty === "low" && includes(format, ["balanced", "short-time"])) score += 1;
    if (answers.novelty === "high" && includes(format, ["emotional-processing", "vision"])) score += 1;

    return score;
}

export function suggestFormats(answers) {
    return FORMATS
        .map((f) => ({ ...f, score: scoreFormat(answers, f) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
}