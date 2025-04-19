export default function Input({ type, placeholder, value, onChange, className, ...props }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`w-full p-2 mb-4 border rounded ${className}`}
            {...props}
        />
    );
}