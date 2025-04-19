import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import api from '../../services/api';

export default function LeaveForm() {
    const [leave, setLeave] = useState({ startDate: '', endDate: '' });
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        try {
            await api.post('/api/leave', leave);
            alert('Leave applied successfully');
            setLeave({ startDate: '', endDate: '' });
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to apply leave');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Apply for Leave</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <Input
                type="date"
                value={leave.startDate}
                onChange={(e) => setLeave({ ...leave, startDate: e.target.value })}
            />
            <Input
                type="date"
                value={leave.endDate}
                onChange={(e) => setLeave({ ...leave, endDate: e.target.value })}
            />
            <Button
                onClick={handleSubmit}
                className="bg-green-500 text-white hover:bg-green-600"
            >
                Apply Leave
            </Button>
        </div>
    );
};
