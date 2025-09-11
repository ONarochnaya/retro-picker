export function Card({ children, className = "" }) {
    return (
        <div className={`card shadow-sm mb-3 ${className}`}>
            {children}
        </div>
    );
}

Card.Header = function CardHeader({ children, className = "" }) {
    return (
        <div className={`card-header fw-semibold ${className}`}>
            {children}
        </div>
    );
};

Card.Body = function CardBody({ children, className = "" }) {
    return (
        <div className={`card-body ${className}`}>
            {children}
        </div>
    );
};

Card.Footer = function CardFooter({ children, className = "" }) {
    return (
        <div className={`card-footer bg-light ${className}`}>
            {children}
        </div>
    );
};