import {useState, useEffect, useCallback} from "react";
import {
    loadIcebreakerUrls,
    randomIndex,
    copyImageSmart,
    downloadUrl
} from "../utils/icebreakers.js";

export function useIcebreaker(imagesPath = "/icebreakers") {
    const [urls, setUrls] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [copiedMode, setCopiedMode] = useState("");

    // Load images on mount
    useEffect(() => {
        let cancelled = false;

        const loadImages = async () => {
            try {
                setIsLoading(true);
                setError("");
                const loadedUrls = await loadIcebreakerUrls(imagesPath);
                if (!cancelled) {
                    setUrls(loadedUrls);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message || "Failed to load images");
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        };

        loadImages();

        return () => {
            cancelled = true;
        };
    }, [imagesPath]);

    const handlePick = useCallback(() => {
        setCurrentIndex((prev) => randomIndex(urls.length, prev));
        setCopiedMode("");
    }, [urls.length]);

    const handleCopyImage = useCallback(async () => {
        if (currentIndex === null || !urls[currentIndex]) return;

        try {
            const mode = await copyImageSmart(urls[currentIndex]);
            setCopiedMode(mode);
            setTimeout(() => setCopiedMode(""), 1500);
        } catch (err) {
            console.error("Failed to copy image:", err);
        }
    }, [currentIndex, urls]);

    const handleCopyUrl = useCallback(async () => {
        if (currentIndex === null || !urls[currentIndex]) return;

        try {
            await navigator.clipboard.writeText(urls[currentIndex]);
            setCopiedMode("url");
            setTimeout(() => setCopiedMode(""), 1500);
        } catch (err) {
            console.error("Failed to copy URL:", err);
        }
    }, [currentIndex, urls]);

    const handleDownload = useCallback(() => {
        if (currentIndex === null || !urls[currentIndex]) return;
        downloadUrl(urls[currentIndex]);
    }, [currentIndex, urls]);

    return {
        imageUrl: currentIndex !== null ? urls[currentIndex] : null,
        hasImages: urls.length > 0,
        isLoading,
        error,
        copiedMode,
        handlePick,
        handleCopyImage,
        handleCopyUrl,
        handleDownload,
    };
}