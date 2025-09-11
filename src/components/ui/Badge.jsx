export function Badge({ children, variant = "secondary", className = "" }) {
    const variants = {
        primary: "bg-primary",
        secondary: "bg-secondary",
        success: "bg-success",
        danger: "bg-danger",
        warning: "bg-warning text-dark",
        info: "bg-info",
    };

    return (
        <span className={`badge ${variants[variant]} ${className} me-2`}>
            {children}
        </span>
    );
}