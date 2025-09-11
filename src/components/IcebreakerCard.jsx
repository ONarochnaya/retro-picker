import {Card} from "./ui/Card.jsx";
import {Button} from "./ui/Button.jsx";
import {Alert} from "./ui/Alert.jsx";
import {canCopyImage} from "../utils/browserCapabilities.js";

export function IcebreakerCard({
                                   imageUrl,
                                   isLoading,
                                   error,
                                   copiedMode,
                                   onPick,
                                   onCopyImage,
                                   onCopyUrl,
                                   onDownload,
                               }) {
    const isCopiedImage = copiedMode === "image";
    const isCopiedUrl = copiedMode === "url";
    const hasImage = !!imageUrl;
    const supportsCopyImage = canCopyImage();

    return (
        <Card>
            <Card.Header>Icebreaker</Card.Header>

            <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}

                <div className="d-flex mb-3">
                    <Button
                        variant="primary"
                        disabled={isLoading}
                        onClick={onPick}
                    >
                        {isLoading ? "Loading..." : "Pick icebreaker"}
                    </Button>
                </div>

                {hasImage && (
                    <>
                        <div className="text-center mb-3">
                            <img
                                src={imageUrl}
                                alt="Icebreaker"
                                className="img-fluid rounded border"
                                style={{maxHeight: 260, objectFit: "cover"}}
                            />
                        </div>

                        <div className="d-flex gap-2 flex-wrap">
                            {supportsCopyImage ? (
                                <Button
                                    variant={isCopiedImage ? "success" : "outline-secondary"}
                                    onClick={onCopyImage}
                                    title="Copy image to clipboard"
                                >
                                    {isCopiedImage ? "Copied!" : "Copy image"}
                                </Button>
                            ) : (
                                <div className="w-100">
                                    <label className="form-label mb-1">Image URL</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={imageUrl}
                                        readOnly
                                        onFocus={(e) => e.target.select()}
                                    />
                                    <div className="form-text">
                                        Copy the URL manually (image copy not supported in your browser)
                                    </div>
                                </div>
                            )}

                            {supportsCopyImage && (
                                <Button
                                    variant={isCopiedUrl ? "success" : "outline-secondary"}
                                    onClick={onCopyUrl}
                                    title="Copy image URL"
                                >
                                    {isCopiedUrl ? "URL Copied!" : "Copy URL"}
                                </Button>
                            )}

                            <Button
                                variant="outline-secondary"
                                onClick={onDownload}
                                title="Download image"
                            >
                                Download
                            </Button>
                        </div>
                    </>
                )}

                {!hasImage && !isLoading && (
                    <div className="text-muted">
                        Click <span className="fw-semibold">Pick icebreaker</span> to show a random image.
                    </div>
                )}

                {isLoading && (
                    <div className="text-muted">Loading images...</div>
                )}
            </Card.Body>
        </Card>
    );
}