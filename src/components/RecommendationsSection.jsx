import {Card} from "./ui/Card.jsx";
import {RecommendationCard} from "./RecommendationCard.jsx";
import {Carousel} from "./ui/Carousel.jsx";

export function RecommendationsSection({
                                           show,
                                           recommendations,
                                           requestedMinutes,
                                           answers,
                                       }) {
    if (!show) {
        return (
            <Card>
                <Card.Header>Top picks</Card.Header>
                <Card.Body>
                    <div className="text-center py-4 text-muted">
                        <p>Fill in the questions and click Get recommendation.</p>
                        <p className="small">Answer the questions to see suggestions.</p>
                    </div>
                </Card.Body>
            </Card>
        );
    }

    return (
        <Card>
            <Card.Header>Top picks</Card.Header>
            <Card.Body>
                <Carousel>
                    {recommendations.map((format) => (
                        <RecommendationCard
                            key={format.id}
                            format={format}
                            requestedMinutes={requestedMinutes}
                            answers={answers}
                        />
                    ))}
                </Carousel>
            </Card.Body>
        </Card>
    );
}