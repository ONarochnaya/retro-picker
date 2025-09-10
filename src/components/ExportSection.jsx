import { Card } from './UIComponents.jsx';
import { buildExportJson, buildExportMarkdown } from '../utils/exportUtils.js';

export function ExportSection({ show, answers, top, copied, onCopy }) {
    async function copyToClipboard(text, label) {
        try {
            await navigator.clipboard.writeText(text);
            onCopy(label);
        } catch (e) {
            alert("Copy failed. You can manually select and copy.");
        }
    }

    return (
        <Card title="Export">
            <p className="mb-2">Copy the plan to share in your retro invite.</p>
            <div className="d-flex flex-wrap gap-2">
                <button
                    className="btn btn-outline-primary"
                    disabled={!show || !top.length}
                    onClick={() => copyToClipboard(buildExportJson(answers, top), "JSON copied")}
                >
                    Copy JSON
                </button>
                <button
                    className="btn btn-outline-dark"
                    disabled={!show || !top.length}
                    onClick={() => copyToClipboard(buildExportMarkdown(answers, top), "Markdown copied")}
                >
                    Copy Markdown
                </button>
            </div>
            {copied && <div className="text-success mt-2 small">{copied}</div>}
        </Card>
    );
}