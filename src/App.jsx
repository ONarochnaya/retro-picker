import { useMemo, useState } from "react";
import { QUESTIONS } from './data/questions.js';
import { suggestFormats } from './utils/scoring.js';
import { QuestionsSection } from './components/QuestionsSection.jsx';
import { RecommendationsSection } from './components/RecommendationsSection.jsx';
import { useEffect } from "react";
import IcebreakerCard from "./components/IcebreakerCard.jsx";
import { loadIcebreakerUrls, randomIndex, copyImageSmart, downloadUrl } from "./utils/icebreakers.js";


export default function App() {
    const [iceUrls, setIceUrls] = useState([]);
    const [iceIdx, setIceIdx] = useState(null);
    const [iceLoading, setIceLoading] = useState(false);
    const [iceError, setIceError] = useState("");
    const [iceCopiedMode, setIceCopiedMode] = useState(""); // "image" | "url" | ""

    const [answers, setAnswers] = useState({});
    const [show, setShow] = useState(false);
    const [, setCopied] = useState("");

    const top = useMemo(() => suggestFormats(answers), [answers]);
    const allAnswered = QUESTIONS.every((q) => answers[q.key]);

    function onChange(key, val) {
        setAnswers((prev) => ({ ...prev, [key]: val }));
    }

    function reset() {
        setAnswers({});
        setShow(false);
        setCopied("");
    }

    function handleGetRecommendation() {
        setShow(true);
    }

    function handleCopy(message) {
        setCopied(message);
        setTimeout(() => setCopied(""), 2000);
    }

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
        return () => { cancelled = true; };
    }, []);

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

    return (
        <div className="container py-4">
            <header className="mb-3">
                <h1 className="h4 mb-1">Retro Format Picker</h1>
            </header>

            <div className="row g-3">
                {/* LEFT: questions */}
                <div className="col-lg-4">
                    <QuestionsSection
                        answers={answers}
                        onChange={onChange}
                        allAnswered={allAnswered}
                        onGetRecommendation={handleGetRecommendation}
                        onReset={reset}
                    />
                </div>

                {/* MIDDLE: recommendations */}
                <div className="col-lg-5">
                    <RecommendationsSection
                        show={show}
                        top={top}
                        requestedMinutes={answers.time}
                        answers={answers}
                        onCopy={handleCopy}
                    />
                </div>

                {/* RIGHT: icebreaker */}
                <div className="col-lg-3">
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
        </div>
    );


}