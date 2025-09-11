// src/utils/icebreakers.js

// Load from /public/icebreakers/images.json (or CDN by changing base)
export async function loadIcebreakerUrls(base = "/icebreakers") {
    const res = await fetch(`${base}/images.json`);
    if (!res.ok) throw new Error("images.json not found in /public/icebreakers/");
    const files = await res.json(); // ["001.jpg","002.jpg",...]
    return files.map((f) => `${base}/${f}`);
}

// Pick random index, avoiding the current one if provided
export function randomIndex(len, exclude = null) {
    if (len <= 1) return 0;
    let idx = Math.floor(Math.random() * len);
    if (exclude !== null) while (idx === exclude) idx = Math.floor(Math.random() * len);
    return idx;
}

// Copy bitmap if supported; otherwise copy URL text
export async function copyImageSmart(url) {
    try {
        const resp = await fetch(url, {mode: "cors", credentials: "omit", cache: "no-cache"});
        if (!resp.ok) throw new Error(`Failed to fetch image: ${resp.status}`);
        const blob = await resp.blob();

        const canWriteImage =
            typeof window !== "undefined" &&
            "ClipboardItem" in window &&
            navigator.clipboard &&
            typeof navigator.clipboard.write === "function";

        if (canWriteImage) {
            const item = new ClipboardItem({[blob.type]: blob});
            await navigator.clipboard.write([item]); // HTTPS/localhost + user gesture
            return "image";
        }

        await navigator.clipboard.writeText(url);
        return "url";
    } catch {
        try {
            await navigator.clipboard.writeText(url);
            return "url";
        } catch {
            window.prompt("Copy image URL:", url);
            return "url";
        }
    }
}

// Trigger a download
export function downloadUrl(url, filename = "") {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || url.split("/").pop() || "icebreaker.jpg";
    document.body.appendChild(a);
    a.click();
    a.remove();
}
