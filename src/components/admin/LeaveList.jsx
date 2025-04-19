import api from '../../services/api';

export default function LeaveList({ leaves }) {
    const handleStatusUpdate = async (leaveId, status) => {
        try {
            await api.patch(`/api/leave/${leaveId}`, { status });
            alert(`Leave ${status}`);
        } catch (err) {
            console.error(err);
            alert('Failed to update leave status');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Leave Applications</h2>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-left p-2">Employee</th>
                        <th className="text-left p-2">Start Date</th>
                        <th className="text-left p-2">End Date</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leaves.map(leave => (
                        <tr key={leave._id}>
                            <td className="p-2">{leave.employeeId?.name || 'Unknown'}</td>
                            <td className="p-2">{new Date(leave.startDate).toLocaleDateString()}</td>
                            <td className="p-2">{new Date(leave.endDate).toLocaleDateString()}</td>
                            <td className="p-2 font-medium">{leave.status}</td>
                            <td className="p-2 flex gap-2">
                                <button
                                    onClick={() => handleStatusUpdate(leave._id, 'Approved')}
                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                    disabled={leave.status === 'Approved'}
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate(leave._id, 'Rejected')}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    disabled={leave.status === 'Rejected'}
                                >
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
