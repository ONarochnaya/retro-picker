export function Alert({ children, variant = "info", className = "" }) {
    const variants = {
        info: "alert-info",
        success: "alert-success",
        warning: "alert-warning",
        danger: "alert-danger",
    };

    return (
        <div className={`alert ${variants[variant]} ${className}`}>
            {children}
        </div>
    );
}