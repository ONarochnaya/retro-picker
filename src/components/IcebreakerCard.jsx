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
                                           copiedMode,      // "image" | "url" | "" (passed from App.jsx)
                                       }) {
    // ✅ these two lines go right after the props:
    const copiedImage = copiedMode === "image";
    const copiedUrl = copiedMode === "url";

    return (
        <div className="card shadow-sm mb-3">
            <div className="card-header fw-semibold">{title}</div>
            <div className="card-body">
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="d-flex flex-wrap gap-2 mb-2">
                    {/* Pick random */}
                    <button
                        className="btn btn-outline-primary"
                        disabled={loading || !hasImages}
                        onClick={onPick}
                    >
                        {loading ? "Loading..." : "Pick icebreaker"}
                    </button>

                    {/* Copy image */}
                    <button
                        className={`btn ${copiedImage ? "btn-success" : "btn-outline-dark"}`}
                        style={
                            copiedImage
                                ? {backgroundColor: "#d4edda", borderColor: "#c3e6cb", color: "#155724"}
                                : undefined
                        }
                        disabled={!imageUrl}
                        onClick={onCopyImage}
                        title="Copy image to clipboard (falls back to URL if unsupported)"
                    >
                        {copiedImage ? "Copied" : "Copy image"}
                    </button>

                    {/* Copy URL */}
                    <button
                        className={`btn ${copiedUrl ? "btn-success" : "btn-outline-secondary"}`}
                        style={
                            copiedUrl
                                ? {backgroundColor: "#d4edda", borderColor: "#c3e6cb", color: "#155724"}
                                : undefined
                        }
                        disabled={!imageUrl}
                        onClick={onCopyUrl}
                        title="Copy image URL"
                    >
                        {copiedUrl ? "URL Copied" : "Copy URL"}
                    </button>

                    {/* Download */}
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
                            style={{maxHeight: 260, objectFit: "contain"}}
                        />
                    </div>
                ) : (
                    !loading &&
                    hasImages && (
                        <div className="text-muted">
                            Click <span className="fw-semibold">Pick icebreaker</span> to show a random image.
                        </div>
                    )
                )}

                {loading && <div className="text-muted">Loading images…</div>}
                {!loading && !hasImages && !error && (
                    <div className="text-muted">
                        No images found in <code>/public/icebreakers</code>.
                    </div>
                )}
            </div>
        </div>
    );
}
