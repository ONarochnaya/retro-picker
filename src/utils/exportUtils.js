import {minutesToPlan} from './timeUtils.js';

export function buildExportJson(answers, top) {
    return JSON.stringify(
        {
            answers,
            recommendations: top.map((f) => {
                const total = answers.time ? Number(answers.time) : Math.min(Math.max(f.time.min, 45), f.time.max);
                return {
                    id: f.id,
                    name: f.name,
                    time: f.time,
                    tags: f.tags,
                    planMinutes: total,
                    agenda: minutesToPlan(total, f.structure),
                    tips: f.tips,
                };
            }),
        },
        null,
        2
    );
}

export function buildExportMarkdown(answers, top) {
    if (!top.length) return "";
    const f = top[0];
    const total = answers.time ? Number(answers.time) : Math.min(Math.max(f.time.min, 45), f.time.max);
    const agenda = minutesToPlan(total, f.structure);

    const lines = [
        `# Retro: ${f.name} (${total} min)`,
        ``,
        `**Goal:** ${answers.goal ?? "—"}    `,
        `**Team mood:** ${answers.mood ?? "—"}    `,
        `**Sprint outcome:** ${answers.outcome ?? "—"}    `,
        `**Mode:** ${answers.mode ?? "—"}    `,
        ``,
        `## Agenda`,
        ...agenda.map((b) => `- ${b.label} — ${b.minutes}m`),
        ``,
        `## Tips`,
        ...f.tips.map((t) => `- ${t}`),
    ];
    return lines.join("\n");
}

export function buildSingleFormatMarkdown(answers, format) {
    const total = answers.time ? Number(answers.time) : Math.min(Math.max(format.time.min, 45), format.time.max);
    const agenda = minutesToPlan(total, format.structure);

    const lines = [
        `# Retro: ${format.name} (${total} min)`,
        ``,
        `**Goal:** ${answers.goal ?? "—"}    `,
        `**Team mood:** ${answers.mood ?? "—"}    `,
        `**Sprint outcome:** ${answers.outcome ?? "—"}    `,
        `**Mode:** ${answers.mode ?? "—"}    `,
        ``,
        `## Agenda`,
        ...agenda.map((b) => `- ${b.label} — ${b.minutes}m`),
        ``,
        `## Tips`,
        ...format.tips.map((t) => `- ${t}`),
    ];
    return lines.join("\n");
}