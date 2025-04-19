import { useState, useEffect } from 'react';
import api from '../services/api';
import EmployeeForm from '../components/admin/EmployeeForm';
import EmployeeList from '../components/admin/EmployeeList';
import LeaveList from '../components/admin/LeaveList';
import AttendanceList from '../components/admin/AttendanceList';
import Button from '../components/common/Button';

export default function AdminDashboard({ onLogout }) {
    const [employees, setEmployees] = useState([]);
    const [leaves, setLeaves] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [editEmployee, setEditEmployee] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [empRes, leaveRes, attRes] = await Promise.all([
                    api.get('/api/employee'),
                    api.get('/api/leave'),
                    api.get('/api/attendance/all'),
                ]);
                setEmployees(empRes.data.data);
                setLeaves(leaveRes.data.data);
                setAttendance(attRes.data.data);
            } catch (err) {
                alert(err.response?.data?.message || 'Failed to fetch data');
            }
        };
        fetchData();
    }, []);

    const handleCreateEmployee = async (data) => {
        try {
            const response = await api.post('/api/employee', data);
            setEmployees([...employees, response.data.data]);
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to create employee');
        }
    };

    const handleUpdateEmployee = async (data) => {
        try {
            const response = await api.put(`/api/employee/${editEmployee._id}`, data);
            setEmployees(employees.map(emp => (emp._id === editEmployee._id ? response.data.data : emp)));
            setEditEmployee(null);
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to update employee');
        }
    };

    const handleDeleteEmployee = async (id) => {
        try {
            await api.delete(`/api/employee/${id}`);
            setEmployees(employees.filter(emp => emp._id !== id));
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to delete employee');
        }
    };

    const handleGeneratePayslip = async (employeeId) => {
        try {
            await api.post('/api/payslip', {
                employeeId,
                month: 'April 2025',
                amount: 55000,
            });
            alert(`Payslip generated for employee ${employeeId}`);
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to generate payslip');
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <Button
                    onClick={() => onLogout('admin')}
                    className="bg-red-500 text-white hover:bg-red-600"
                >
                    Logout
                </Button>
            </div>
            <EmployeeForm
                employee={editEmployee}
                onSubmit={editEmployee ? handleUpdateEmployee : handleCreateEmployee}
                onCancel={() => setEditEmployee(null)}
            />
            <EmployeeList
                employees={employees}
                onEdit={setEditEmployee}
                onDelete={handleDeleteEmployee}
                onGeneratePayslip={handleGeneratePayslip}
            />
            <LeaveList leaves={leaves} />
            <AttendanceList attendance={attendance} />
        </div>
    );
};
