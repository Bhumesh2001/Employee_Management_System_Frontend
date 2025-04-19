import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

export default function EmployeeForm({ employee, onSubmit, onCancel }) {
    const [formData, setFormData] = useState(
        employee || { name: '', email: '', position: '', password: '', role: 'employee' }
    );

    const handleSubmit = () => {
        onSubmit(formData);
        if (!employee) setFormData({ name: '', email: '', position: '', password: '', role: 'employee' });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">{employee ? 'Edit Employee' : 'Create Employee'}</h2>
            <Input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
                type="text"
                placeholder="Position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            />
            {!employee && (
                <Input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
            )}
            <div className="flex gap-2">
                <Button
                    onClick={handleSubmit}
                    className="bg-green-500 text-white hover:bg-green-600"
                >
                    {employee ? 'Update' : 'Create'}
                </Button>
                {employee && (
                    <Button
                        onClick={onCancel}
                        className="bg-gray-500 text-white hover:bg-gray-600"
                    >
                        Cancel
                    </Button>
                )}
            </div>
        </div>
    );
};
