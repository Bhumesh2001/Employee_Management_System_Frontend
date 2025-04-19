export default function Button({ children, onClick, className, ...props }) {
    return (
        <button
            className={`px-4 py-2 rounded ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}