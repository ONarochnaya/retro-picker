// Loads /public/icebreakers/images.json and returns absolute URLs.
export async function loadIcebreakerUrls(base = "/icebreakers") {
    const res = await fetch(`${base}/images.json`);
    if (!res.ok) throw new Error("images.json not found in /public/icebreakers/");
    const files = await res.json(); // ["001.jpg","002.jpg",...]
    return files.map((f) => `${base}/${f}`);
}

// Helper: pick a random index (avoid repeating current if provided)
export function randomIndex(len, exclude = null) {
    if (len <= 1) return 0;
    let idx = Math.floor(Math.random() * len);
    if (exclude !== null) while (idx === exclude) idx = Math.floor(Math.random() * len);
    return idx;
}

// Copy bitmap if supported, else copy URL string
export async function copyImageSmart(url) {
    try {
        const resp = await fetch(url, { mode: "cors" });
        const blob = await resp.blob();
        if (window.ClipboardItem && navigator.clipboard?.write) {
            await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
            return "image";
        }
        throw new Error("Bitmap clipboard not supported");
    } catch {
        await navigator.clipboard.writeText(url);
        return "url";
    }
}

// Simple download helper
export function downloadUrl(url, filename = "") {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || url.split("/").pop() || "icebreaker.jpg";
    document.body.appendChild(a);
    a.click();
    a.remove();
}
