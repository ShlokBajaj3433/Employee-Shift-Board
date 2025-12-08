import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ShiftTable from '../components/ShiftTable';
import ShiftAssignmentForm from '../components/ShiftAssignmentForm';

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout, isAdmin, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-800">Employee Shift Board</h1>
              {user && <p className="text-sm text-gray-600">Welcome, {user}</p>}
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {isAdmin() && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Assign Shift</h2>
              <ShiftAssignmentForm />
            </div>
          )}
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Shifts</h2>
            <ShiftTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
