import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { Card } from "./UIComponents.jsx";
import { Recommendation } from "./Recommendation.jsx";

export function RecommendationsSection({ show, top, requestedMinutes, answers, onCopy }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    return (
        <Card
            title="Top picks"
            footer={<small className="small-muted">Use arrows to browse recommended formats.</small>}
        >
            {!show && (
                <div className="small-muted">
                    Fill the questions and click <span className="fw-semibold">Get recommendation</span>.
                </div>
            )}

            {show && (
                <div className="relative">
                    {/* Arrows */}
                    <button className="carousel-btn left" onClick={scrollPrev}>‹</button>
                    <button className="carousel-btn right" onClick={scrollNext}>›</button>

                    {/* Carousel */}
                    <div className="embla" ref={emblaRef}>
                        <div className="embla__container">
                            {top.map((f) => (
                                <div className="embla__slide" key={f.id}>
                                    <Recommendation
                                        format={f}
                                        requestedMinutes={requestedMinutes}
                                        answers={answers}
                                        onCopy={onCopy}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
}
