import {useState, useCallback, useMemo} from "react";

export function useQuestionnaire(questions) {
    const [answers, setAnswers] = useState({});
    const [currentStep, setCurrentStep] = useState(0);

    const isAllAnswered = useMemo(
        () => questions.every((q) => answers[q.key]),
        [questions, answers]
    );

    const handleAnswer = useCallback((key, value) => {
        setAnswers((prev) => ({...prev, [key]: value}));
    }, []);

    const handleNext = useCallback(() => {
        setCurrentStep((prev) => Math.min(prev + 1, questions.length - 1));
    }, [questions.length]);

    const handlePrev = useCallback(() => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    }, []);

    const handleReset = useCallback(() => {
        setAnswers({});
        setCurrentStep(0);
    }, []);

    return {
        answers,
        currentStep,
        isAllAnswered,
        handleAnswer,
        handleNext,
        handlePrev,
        handleReset,
    };
}