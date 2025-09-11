import { useState } from "react";

export function Carousel({ children }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const items = Array.isArray(children) ? children : [children];
    const totalItems = items.length;

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? totalItems - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === totalItems - 1 ? 0 : prev + 1));
    };

    if (totalItems === 0) return null;

    return (
        <div className="carousel position-relative">
            <button
                className="carousel-arrow left"
                onClick={goToPrevious}
                aria-label="Previous"
                disabled={totalItems <= 1}
            >
                ‹
            </button>

            <div className="carousel-viewport">
                <div
                    className="carousel-track"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {items.map((item, idx) => (
                        <div key={idx} className="carousel-slide">
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            <button
                className="carousel-arrow right"
                onClick={goToNext}
                aria-label="Next"
                disabled={totalItems <= 1}
            >
                ›
            </button>

            <div className="text-center mt-2 small text-muted">
                {currentIndex + 1} / {totalItems}
            </div>
        </div>
    );
}