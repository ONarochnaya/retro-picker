import { useMemo, useState, useEffect } from "react";
import { QUESTIONS } from "./data/questions.js";
import { suggestFormats } from "./utils/scoring.js";
import { QuestionsSection } from "./components/QuestionsSection.jsx";
import { RecommendationsSection } from "./components/RecommendationsSection.jsx";
import IcebreakerCard from "./components/IcebreakerCard.jsx";
import { loadIcebreakerUrls, randomIndex, copyImageSmart, downloadUrl } from "./utils/icebreakers.js";

// App.jsx
export default function App() {
    // Icebreaker state
    const [iceUrls, setIceUrls] = useState([]);
    const [iceIdx, setIceIdx] = useState(null);
    const [iceLoading, setIceLoading] = useState(false);
    const [iceError, setIceError] = useState("");
    const [iceCopiedMode, setIceCopiedMode] = useState(""); // "image" | "url" | ""

    // Questionnaire state
    const [answers, setAnswers] = useState({});
    const [show, setShow] = useState(false);
    const [, setCopied] = useState("");

    // Stepper state (one question at a time)
    const [step, setStep] = useState(0);
    const total = QUESTIONS.length;

    // Derived
    const top = useMemo(() => suggestFormats(answers), [answers]);
    const allAnswered = QUESTIONS.every((q) => answers[q.key]);

    // Handlers: questionnaire
    function onChange(key, val) {
        setAnswers((prev) => ({ ...prev, [key]: val }));
    }

    function nextStep() {
        setStep((s) => Math.min(s + 1, total - 1));
    }

    function prevStep() {
        setStep((s) => Math.max(s - 1, 0));
    }

    function reset() {
        setAnswers({});
        setShow(false);
        setCopied("");
        setStep(0);
    }

    function handleGetRecommendation() {
        if (!allAnswered) return; // keep disabled/gated from UI, but also guard here
        setShow(true);
    }

    function handleCopy(message) {
        setCopied(message);
        setTimeout(() => setCopied(""), 2000);
    }

    // Handlers: icebreaker
    function handlePickIce() {
        setIceIdx((cur) => randomIndex(iceUrls.length, cur));
        setIceCopiedMode("");
    }

    async function handleCopyIceImage() {
        if (iceIdx === null) return;
        const mode = await copyImageSmart(iceUrls[iceIdx]); // "image" or "url"
        setIceCopiedMode(mode);
        setTimeout(() => setIceCopiedMode(""), 1500);
    }

    async function handleCopyIceUrl() {
        if (iceIdx === null) return;
        await navigator.clipboard.writeText(iceUrls[iceIdx]);
        setIceCopiedMode("url");
        setTimeout(() => setIceCopiedMode(""), 1500);
    }

    function handleDownloadIce() {
        if (iceIdx === null) return;
        downloadUrl(iceUrls[iceIdx]);
    }

    // Load icebreaker images
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setIceLoading(true);
                setIceError("");
                const urls = await loadIcebreakerUrls("/icebreakers");
                if (!cancelled) setIceUrls(urls);
            } catch (e) {
                if (!cancelled) setIceError(e.message || "Failed to load images");
            } finally {
                if (!cancelled) setIceLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div className="container py-4">
            <header className="mb-3">
                <h1 className="h4 mb-1">Retro Format Picker</h1>
            </header>

            {/* Вопросы */}
            <div className="mb-3">
                <QuestionsSection
                    answers={answers}
                    onChange={onChange}
                    onSubmit={handleGetRecommendation}
                    onReset={reset}
                    step={step}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    total={total}
                />
            </div>

            {/* Топ-рекомендации */}
            <div className="mb-3">
                <RecommendationsSection
                    show={show}
                    top={top}
                    requestedMinutes={answers.time}
                    answers={answers}
                    onCopy={handleCopy}
                />
            </div>

            {/* Айсбрейкер */}
            <div>
                <IcebreakerCard
                    loading={iceLoading}
                    error={iceError}
                    hasImages={iceUrls.length > 0}
                    imageUrl={iceIdx !== null ? iceUrls[iceIdx] : null}
                    onPick={handlePickIce}
                    onCopyImage={handleCopyIceImage}
                    onCopyUrl={handleCopyIceUrl}
                    onDownload={handleDownloadIce}
                    copiedMode={iceCopiedMode}
                />
            </div>
        </div>
    );

}
