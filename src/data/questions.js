// src/data/questions.js
export const QUESTIONS = [
    {
        key: "mood",
        label: "What’s the overall team mood?",
        // type не обязателен для чипов, но оставим для ясности
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
            { value: "met-goals", label: "Met goals",           icon: "✅", sub: "on track" },
            { value: "overran",   label: "Overran / carried",   icon: "⏩", sub: "spillover work" },
            { value: "many-bugs", label: "Many bugs/incidents", icon: "🐞", sub: "quality issues" },
            { value: "blocked",   label: "Blocked deps",        icon: "🧱", sub: "waiting on others" },
        ],
    },

    {
        key: "time",
        label: "How much time do you have?",
        options: [
            { value: "25", label: "~25 min", icon: "⏱️" },
            { value: "40", label: "~40 min", icon: "⏱️" },
            { value: "60", label: "~60 min", icon: "⏱️" },
            { value: "90", label: "~90 min", icon: "⏱️" },
        ],
    },

    {
        key: "mode",
        label: "Collaboration mode",
        options: [
            { value: "remote", label: "Remote / hybrid", icon: "🌐", sub: "miro/mural/figjam" },
            { value: "room",   label: "Same room",       icon: "👥", sub: "whiteboard/cards" },
        ],
    },

    {
        key: "goal",
        label: "What matters most right now?",
        options: [
            { value: "action",   label: "Actionable fixes",   icon: "🔧", sub: "clear next steps" },
            { value: "learning", label: "Capture learning",   icon: "📚", sub: "insights & takeaways" },
            { value: "trust",    label: "Repair/build trust", icon: "🤝", sub: "team dynamics" },
            { value: "vision",   label: "Refocus on goals",   icon: "🎯", sub: "direction & focus" },
        ],
    },

    {
        key: "novelty",
        label: "How much novelty do you want?",
        options: [
            { value: "low",  label: "Keep it simple",      icon: "😌", sub: "familiar format" },
            { value: "med",  label: "A bit of spice",      icon: "🌶️", sub: "moderate change" },
            { value: "high", label: "Something different", icon: "✨", sub: "fresh experience" },
        ],
    },
];
