import React from "react";

export default function IcebreakerCard({
                                           title = "Icebreaker",
                                           loading,
                                           error,
                                           hasImages,
                                           imageUrl,
                                           onPick,
                                           onCopyImage,
                                           // onCopyUrl, onDownload,  // больше не используем, но оставляем в сигнатуре выше если нужно
                                           copiedMode, // "image" | "" (из App.jsx)
                                       }) {
    // визуальное состояние
    const copiedImage = copiedMode === "image";

    // детект поддержки копирования картинки (в Safari обычно false)
    const canCopyImage =
        typeof navigator !== "undefined" &&
        !!navigator.clipboard &&
        typeof window !== "undefined" &&
        "ClipboardItem" in window;

    return (
        <div className="card shadow-sm mb-3">
            <div className="card-header fw-semibold">{title}</div>
            <div className="card-body">

                {error && <div className="alert alert-danger">{error}</div>}

                {/* 1) Главная CTA */}
                <div className="d-flex mb-3">
                    <button
                        className="btn btn-primary"
                        disabled={loading || !hasImages}
                        onClick={onPick}
                    >
                        {loading ? "Loading..." : "Pick icebreaker"}
                    </button>
                </div>

                {/* 2) Превью изображения */}
                <div className="text-center mb-3">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="Icebreaker"
                            className="img-fluid rounded border"
                            style={{ maxHeight: 260, objectFit: "cover" }}
                        />
                    ) : (
                        !loading &&
                        hasImages && (
                            <div className="text-muted">
                                Click <span className="fw-semibold">Pick icebreaker</span> to show a random image.
                            </div>
                        )
                    )}
                </div>

                {/* 3) Вспомогательная зона */}
                {imageUrl && (
                    canCopyImage ? (
                        // Вариант A: можем копировать картинку
                        <div className="d-flex">
                            <button
                                className={`btn ${copiedImage ? "btn-success" : "btn-outline-secondary"}`}
                                style={
                                    copiedImage
                                        ? { backgroundColor: "#d4edda", borderColor: "#c3e6cb", color: "#155724" }
                                        : undefined
                                }
                                onClick={onCopyImage}
                                title="Copy image to clipboard"
                            >
                                {copiedImage ? "Copied" : "Copy image"}
                            </button>
                        </div>
                    ) : (
                        // Вариант B: Safari / нет поддержки — только URL-бокс
                        <div className="mb-0">
                            <label className="form-label mb-1">Image URL</label>
                            <input
                                type="text"
                                className="form-control"
                                value={imageUrl}
                                readOnly
                                onFocus={(e) => e.target.select()}
                            />
                            <div className="form-text">Safari: copy the URL manually.</div>
                        </div>
                    )
                )}

                {loading && <div className="text-muted mt-2">Loading images…</div>}
                {!loading && !hasImages && !error && (
                    <div className="text-muted">
                        No images found in <code>/public/icebreakers</code>.
                    </div>
                )}
            </div>
        </div>
    );
}
