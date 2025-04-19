import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';

function App() {
    const { user, logout, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <div className="text-gray-600 text-lg font-medium">Loading...</div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {user ? (
                user.role === 'admin' ? (
                    <AdminDashboard onLogout={() => logout('admin')} />
                ) : (
                    <EmployeeDashboard onLogout={() => logout('employee')} />
                )
            ) : (
                <LoginPage />
            )}
        </div>
    );
};

export default App;