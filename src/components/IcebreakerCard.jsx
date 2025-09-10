import React from "react";

export default function IcebreakerCard({
                                           title = "Icebreaker",
                                           loading,
                                           error,
                                           hasImages,
                                           imageUrl,
                                           onPick,
                                           onCopyImage,
                                           onCopyUrl,
                                           onDownload,
                                           copiedMode,      // "image" | "url" | "" (for button feedback)
                                       }) {
    const copiedImage = copiedMode === "image";
    const copiedUrl = copiedMode === "url";

    return (
        <div className="card shadow-sm mb-3">
            <div className="card-header fw-semibold">{title}</div>
            <div className="card-body">
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="d-flex flex-wrap gap-2 mb-2">
                    <button
                        className="btn btn-outline-primary"
                        disabled={loading || !hasImages}
                        onClick={onPick}
                    >
                        {loading ? "Loading..." : "Pick icebreaker"}
                    </button>

                    <button
                        className={`btn ${copiedImage ? "btn-success" : "btn-outline-dark"}`}
                        disabled={!imageUrl}
                        onClick={onCopyImage}
                        title="Copy image to clipboard (falls back to URL if unsupported)"
                    >
                        {copiedImage ? "Copied" : "Copy image"}
                    </button>

                    <button
                        className={`btn ${copiedUrl ? "btn-success" : "btn-outline-secondary"}`}
                        disabled={!imageUrl}
                        onClick={onCopyUrl}
                        title="Copy image URL"
                    >
                        {copiedUrl ? "URL Copied" : "Copy URL"}
                    </button>

                    <button
                        className="btn btn-outline-success"
                        disabled={!imageUrl}
                        onClick={onDownload}
                    >
                        Download
                    </button>
                </div>

                {imageUrl ? (
                    <div className="text-center">
                        <img
                            src={imageUrl}
                            alt="Icebreaker"
                            className="img-fluid rounded border"
                            style={{ maxHeight: 260, objectFit: "contain" }}
                        />
                        <div className="small text-muted mt-1">{imageUrl.split("/").pop()}</div>
                    </div>
                ) : (
                    !loading && hasImages && (
                        <div className="text-muted">
                            Click <span className="fw-semibold">Pick icebreaker</span> to show a random image.
                        </div>
                    )
                )}

                {loading && <div className="text-muted">Loading images…</div>}
                {!loading && !hasImages && !error && (
                    <div className="text-muted">No images found in <code>/public/icebreakers</code>.</div>
                )}
            </div>
        </div>
    );
}
