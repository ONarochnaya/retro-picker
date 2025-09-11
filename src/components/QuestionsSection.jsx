import { OptionChips } from "./OptionChips.jsx";
import { Card } from "./ui/Card.jsx";
import { Button } from "./ui/Button.jsx";

export function QuestionsSection({
                                     questions,
                                     answers,
                                     currentStep,
                                     totalSteps,
                                     isAllAnswered,
                                     onAnswer,
                                     onNext,
                                     onPrev,
                                     onReset,
                                     onSubmit,
                                 }) {
    const currentQuestion = questions[currentStep];
    const isAnswered = !!answers[currentQuestion.key];
    const isLastStep = currentStep === totalSteps - 1;
    const canGoNext = isAnswered;

    return (
        <Card>
            <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                    <span>{currentQuestion.label}</span>
                    <span className="progress">{currentStep + 1}/{totalSteps}</span>
                </div>
            </Card.Header>

            <Card.Body>
                <OptionChips
                    question={currentQuestion}
                    value={answers[currentQuestion.key]}
                    onChange={onAnswer}
                />
                {currentQuestion.hint && (
                    <div className="help mt-3">{currentQuestion.hint}</div>
                )}
            </Card.Body>

            <Card.Footer>
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <div className="d-flex gap-2">
                        <Button variant="ghost" onClick={onReset}>
                            Reset
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={onPrev}
                            disabled={currentStep === 0}
                        >
                            ← Back
                        </Button>
                    </div>

                    {!isLastStep ? (
                        <Button
                            variant="outline-primary"
                            onClick={onNext}
                            disabled={!canGoNext}
                        >
                            Next {canGoNext ? "" : " (choose an option)"} →
                        </Button>
                    ) : (
                        <Button
                            variant="primary"
                            onClick={onSubmit}
                            disabled={!isAllAnswered}
                        >
                            Get recommendation
                        </Button>
                    )}
                </div>
            </Card.Footer>
        </Card>
    );
}