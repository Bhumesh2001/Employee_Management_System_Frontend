export default function AttendanceList({ attendance }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Attendance</h2>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-left p-2">Employee</th>
                        <th className="text-left p-2">Date</th>
                        <th className="text-left p-2">Sign In</th>
                        <th className="text-left p-2">Sign Out</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance.map(record => (
                        <tr key={record._id}>
                            <td className="p-2">{record.employeeId?.name || 'Unknown'}</td>
                            <td className="p-2">{new Date(record.date).toLocaleDateString()}</td>
                            <td className="p-2">{record.signIn || '-'}</td>
                            <td className="p-2">{record.signOut || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}