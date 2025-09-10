export const QUESTIONS = [
    {
        key: "mood",
        label: "What’s the overall team mood?",
        type: "emoji",
        options: [
            { value: "happy", label: "Happy", icon: "😊" },
            { value: "ok",    label: "Okay",  icon: "🙂" },
            { value: "sad",   label: "Sad",   icon: "🙁" },
            { value: "meh",   label: "Meh",   icon: "😕" },
        ],
        hint: "Pick what matches the iteration best.",
    },
    {
        key: "outcome",
        label: "How did the sprint feel?",
        options: [
            { value: "met-goals", label: "Met goals" },
            { value: "overran", label: "Overran / carried over" },
            { value: "many-bugs", label: "Many bugs / incidents" },
            { value: "blocked", label: "Blocked by dependencies" },
        ],
    },
    {
        key: "time",
        label: "How much time do you have?",
        options: [
            { value: "25", label: "~25 min" },
            { value: "40", label: "~40 min" },
            { value: "60", label: "~60 min" },
            { value: "90", label: "~90 min" },
        ],
    },
    {
        key: "mode",
        label: "Collaboration mode",
        options: [
            { value: "remote", label: "Remote / hybrid" },
            { value: "room", label: "Same room" },
        ],
    },
    {
        key: "goal",
        label: "What matters most right now?",
        options: [
            { value: "action", label: "Actionable fixes" },
            { value: "learning", label: "Capture learning" },
            { value: "trust", label: "Repair / build trust" },
            { value: "vision", label: "Refocus on goals" },
        ],
    },
    {
        key: "novelty",
        label: "How much novelty do you want?",
        options: [
            { value: "low", label: "Keep it simple" },
            { value: "med", label: "A bit of spice" },
            { value: "high", label: "Something different" },
        ],
    },
];