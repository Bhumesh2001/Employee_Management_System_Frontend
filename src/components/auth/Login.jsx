import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';

export default function Login() {
    const { loginUser } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employee');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        try {
            await loginUser(email, password, role);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    options={[
                        { value: 'employee', label: 'Employee' },
                        { value: 'admin', label: 'Admin' },
                    ]}
                />
                <Button
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 text-white hover:bg-blue-600"
                >
                    Login
                </Button>
            </div>
        </div>
    );
};
