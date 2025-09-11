import { useState } from "react";
import { QUESTIONS } from "./data/questions.js";
import { suggestFormats } from "./utils/scoring.js";
import { QuestionsSection } from "./components/QuestionsSection.jsx";
import { RecommendationsSection } from "./components/RecommendationsSection.jsx";
import { IcebreakerCard } from "./components/IcebreakerCard.jsx";
import { useIcebreaker } from "./hooks/useIcebreaker.js";
import { useQuestionnaire } from "./hooks/useQuestionnaire.js";

export default function App() {
    // Custom hooks for better separation of concerns
    const {
        answers,
        currentStep,
        isAllAnswered,
        handleAnswer,
        handleNext,
        handlePrev,
        handleReset,
    } = useQuestionnaire(QUESTIONS);

    const {
        imageUrl,
        isLoading,
        error,
        copiedMode,
        handlePick,
        handleCopyImage,
        handleCopyUrl,
        handleDownload,
    } = useIcebreaker();

    // Recommendations state
    const [showRecommendations, setShowRecommendations] = useState(false);
    const recommendations = suggestFormats(answers);

    const handleGetRecommendations = () => {
        if (isAllAnswered) {
            setShowRecommendations(true);
        }
    };

    const handleFullReset = () => {
        handleReset();
        setShowRecommendations(false);
    };

    return (
        <div className="container py-4">
            <header className="mb-3">
                <h1 className="h4 mb-1">Retro Format Picker</h1>
            </header>

            <QuestionsSection
                questions={QUESTIONS}
                answers={answers}
                currentStep={currentStep}
                totalSteps={QUESTIONS.length}
                isAllAnswered={isAllAnswered}
                onAnswer={handleAnswer}
                onNext={handleNext}
                onPrev={handlePrev}
                onReset={handleFullReset}
                onSubmit={handleGetRecommendations}
            />

            <RecommendationsSection
                show={showRecommendations}
                recommendations={recommendations}
                requestedMinutes={answers.time}
                answers={answers}
            />

            <IcebreakerCard
                imageUrl={imageUrl}
                isLoading={isLoading}
                error={error}
                copiedMode={copiedMode}
                onPick={handlePick}
                onCopyImage={handleCopyImage}
                onCopyUrl={handleCopyUrl}
                onDownload={handleDownload}
            />
        </div>
    );
}