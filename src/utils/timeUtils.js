export function minutesToPlan(total, blocks) {
    const sum = blocks.reduce((acc, b) => acc + b.minutes, 0) || 1;
    const scaled = blocks.map((b) => ({
        ...b,
        minutes: Math.max(2, Math.round((b.minutes / sum) * total)),
    }));
    const drift = total - scaled.reduce((acc, b) => acc + b.minutes, 0);
    if (drift !== 0 && scaled.length) scaled[0].minutes += drift;
    return scaled;
}