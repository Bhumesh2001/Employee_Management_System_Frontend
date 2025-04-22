import { useState, useEffect } from 'react';
import api from '../services/api';
import LeaveForm from '../components/employee/LeaveForm';
import AttendanceTracker from '../components/employee/AttendanceTracker';
import PayslipList from '../components/employee/PayslipList';
import Button from '../components/common/Button';

export default function EmployeeDashboard({ onLogout }) {
    const [payslips, setPayslips] = useState([]);

    useEffect(() => {
        const fetchPayslips = async () => {
            try {
                const response = await api.get('/payslip/my');
                setPayslips(response.data.data);
            } catch (err) {
                alert(err.response?.data?.message || 'Failed to fetch payslips');
            }
        };
        fetchPayslips();
    }, []);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Employee Dashboard</h1>
                <Button
                    onClick={() => onLogout('employee')}
                    className="bg-red-500 text-white hover:bg-red-600"
                >
                    Logout
                </Button>
            </div>
            <LeaveForm />
            <AttendanceTracker />
            <PayslipList payslips={payslips} />
        </div>
    );
};
