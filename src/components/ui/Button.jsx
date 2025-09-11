export function Button({
                           children,
                           variant = "primary",
                           size = "md",
                           disabled = false,
                           onClick,
                           className = "",
                           ...props
                       }) {
    const variants = {
        primary: "btn-primary",
        secondary: "btn-secondary",
        success: "btn-success",
        danger: "btn-danger",
        outline: "btn-outline-primary",
        "outline-primary": "btn-outline-primary",
        "outline-secondary": "btn-outline-secondary",
        ghost: "btn-ghost",
    };

    const sizes = {
        sm: "btn-sm",
        md: "",
        lg: "btn-lg",
    };

    const variantClass = variants[variant] || variants.primary;
    const sizeClass = sizes[size] || sizes.md;

    return (
        <button
            className={`btn ${variantClass} ${sizeClass} ${className}`}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}