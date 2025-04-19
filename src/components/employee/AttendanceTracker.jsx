import { useState } from 'react';
import Button from '../common/Button';
import api from '../../services/api';

export default function AttendanceTracker() {
    const [attendance, setAttendance] = useState(null);
    const [error, setError] = useState('');

    const handleSignInOut = async (action) => {
        try {
            const response = await api.post(`/api/attendance/${action}`);
            setAttendance(response.data.data);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || `Failed to ${action}`);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Attendance</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex gap-2 mb-4">
                <Button
                    onClick={() => handleSignInOut('signin')}
                    className="bg-blue-500 text-white hover:bg-blue-600"
                >
                    Sign In
                </Button>
                <Button
                    onClick={() => handleSignInOut('signout')}
                    className="bg-blue-500 text-white hover:bg-blue-600"
                >
                    Sign Out
                </Button>
            </div>
            {attendance && (
                <p>
                    Last {attendance.signIn ? 'Sign In' : 'Sign Out'} at {attendance.signIn || attendance.signOut}
                </p>
            )}
        </div>
    );
};
