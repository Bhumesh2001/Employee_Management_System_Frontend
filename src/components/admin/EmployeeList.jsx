import Button from '../common/Button';

export default function EmployeeList({ employees, onEdit, onDelete, onGeneratePayslip }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Employees</h2>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Email</th>
                        <th className="text-left p-2">Position</th>
                        <th className="text-left p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(emp => (
                        <tr key={emp._id}>
                            <td className="p-2">{emp.name}</td>
                            <td className="p-2">{emp.email}</td>
                            <td className="p-2">{emp.position}</td>
                            <td className="p-2 flex gap-2">
                                <Button
                                    onClick={() => onEdit(emp)}
                                    className="bg-yellow-500 text-white hover:bg-yellow-600"
                                >
                                    Edit
                                </Button>
                                <Button
                                    onClick={() => onDelete(emp._id)}
                                    className="bg-red-500 text-white hover:bg-red-600"
                                >
                                    Delete
                                </Button>
                                <Button
                                    onClick={() => onGeneratePayslip(emp._id)}
                                    className="bg-blue-500 text-white hover:bg-blue-600"
                                >
                                    Generate Payslip
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}