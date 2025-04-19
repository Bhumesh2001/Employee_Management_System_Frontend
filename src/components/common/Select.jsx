export default function Select({ value, onChange, options, className, ...props }) {
    return (
        <select
            value={value}
            onChange={onChange}
            className={`w-full p-2 mb-4 border rounded ${className}`}
            {...props}
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}