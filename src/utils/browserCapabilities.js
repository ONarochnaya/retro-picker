/**
 * Check if the browser supports copying images to clipboard
 */
export function canCopyImage() {
    return (
        typeof window !== "undefined" &&
        "ClipboardItem" in window &&
        navigator.clipboard &&
        typeof navigator.clipboard.write === "function"
    );
}

/**
 * Check if the browser supports clipboard API
 */
export function canUseClipboard() {
    return (
        typeof navigator !== "undefined" &&
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
    );
}

/**
 * Get browser name for specific handling
 */
export function getBrowserInfo() {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.includes("safari") && !userAgent.includes("chrome")) {
        return {name: "safari", supportsCopyImage: false};
    }
    if (userAgent.includes("firefox")) {
        return {name: "firefox", supportsCopyImage: true};
    }
    if (userAgent.includes("chrome")) {
        return {name: "chrome", supportsCopyImage: true};
    }
    if (userAgent.includes("edge")) {
        return {name: "edge", supportsCopyImage: true};
    }

    return {name: "unknown", supportsCopyImage: canCopyImage()};
}