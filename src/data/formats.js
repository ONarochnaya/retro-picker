// src/data/formats.js
export const FORMATS = [
    {
        id: "start-stop-continue",
        name: "Start / Stop / Continue",
        time: { min: 30, max: 60 },
        tags: ["action", "balanced", "short-time"],
        structure: [
            { label: "Warm-up & check-in", minutes: 5 },
            { label: "Silent write (Start/Stop/Continue)", minutes: 10 },
            { label: "Group & vote", minutes: 10 },
            { label: "Actions & owners", minutes: 10 },
        ],
        tips: [
            "Aim for 2–3 clear action items.",
            "Timebox writing to keep momentum.",
            "Use dot-voting to prioritize.",
        ],
    },
    {
        id: "mad-sad-glad",
        name: "Mad / Sad / Glad",
        time: { min: 45, max: 75 },
        tags: ["trust", "emotional-processing"],
        structure: [
            { label: "Safety reminder", minutes: 5 },
            { label: "Silent write (M/S/G)", minutes: 15 },
            { label: "Share & cluster", minutes: 15 },
            { label: "Vote & discuss", minutes: 10 },
            { label: "Actions / experiments", minutes: 10 },
        ],
        tips: [
            "Invite emotional honesty; stay behavior-focused.",
            "Use a parking lot for 1:1 follow-ups.",
        ],
    },
    {
        id: "sailboat",
        name: "Sailboat",
        time: { min: 45, max: 90 },
        tags: ["vision", "product-focus", "risk-review"],
        structure: [
            { label: "Set the scene (island/wind/anchors/rocks)", minutes: 5 },
            { label: "Brainstorm & map", minutes: 20 },
            { label: "Cluster & vote", minutes: 10 },
            { label: "Discuss top themes", minutes: 15 },
            { label: "Commit to experiments", minutes: 10 },
        ],
        tips: [
            "Great when goals feel fuzzy or risks loom.",
            "Ask: which wind can we amplify next sprint?",
        ],
    },
    {
        id: "four-ls",
        name: "4Ls (Liked, Learned, Lacked, Longed for)",
        time: { min: 40, max: 70 },
        tags: ["learning", "balanced"],
        structure: [
            { label: "Individual write-up (4 columns)", minutes: 15 },
            { label: "Share & group", minutes: 15 },
            { label: "Vote & discuss", minutes: 10 },
            { label: "Actions / next experiments", minutes: 10 },
        ],
        tips: [
            "Balances emotions and learning.",
            "Good after onboarding or big changes.",
        ],
    },
    {
        id: "daki",
        name: "DAKI (Drop, Add, Keep, Improve)",
        time: { min: 30, max: 60 },
        tags: ["action", "process-tuning", "short-time"],
        structure: [
            { label: "Silent notes (D/A/K/I)", minutes: 10 },
            { label: "Cluster & vote", minutes: 10 },
            { label: "Discuss top 2–3", minutes: 10 },
            { label: "Decide actions & owners", minutes: 10 },
        ],
        tips: [
            "Great for rapid process tweaks.",
            "Pair with a quick check-in to set tone.",
        ],
    },
    {
        id: "timeline",
        name: "Sprint Timeline",
        time: { min: 45, max: 90 },
        tags: ["incident", "many-bugs", "memory-sync"],
        structure: [
            { label: "Build the timeline together", minutes: 20 },
            { label: "Annotate with facts & feelings", minutes: 10 },
            { label: "Identify turning points", minutes: 10 },
            { label: "Actions to prevent repeats", minutes: 10 },
        ],
        tips: [
            "Useful after incidents or surprises.",
            "Keep judgments out; focus on sequence first.",
        ],
    },
    {
        id: "speedboat",
        name: "Speedboat (fast Sailboat)",
        time: { min: 25, max: 45 },
        tags: ["short-time", "blocked", "vision"],
        structure: [
            { label: "Quick check-in (1 word)", minutes: 3 },
            { label: "Anchors & engines", minutes: 10 },
            { label: "Vote & discuss", minutes: 7 },
            { label: "Actions", minutes: 5 },
        ],
        tips: ["When time is tight but you need focus."],
    },
];