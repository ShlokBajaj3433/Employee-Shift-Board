import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import api from '../api/axios';

const Dashboard = () => {
  const { isAdmin, user } = useAuth();
  const [stats, setStats] = useState({
    totalEmployees: 0,
    todayShifts: 0,
    upcomingShifts: 0
  });
  const [recentShifts, setRecentShifts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getEmployeeCode = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    return employee ? employee.employeeCode : `ID: ${employeeId}`;
  };

  const fetchDashboardData = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Fetch today's shifts
      const shiftsResponse = await api.get('/shifts', {
        params: { date: today }
      });
      
      // Fetch all employees
      const employeesResponse = await api.get('/employees');
      const employeesData = employeesResponse.data;
      setEmployees(employeesData);

      let employeesCount = 0;
      if (isAdmin()) {
        employeesCount = employeesData.length;
      }

      setStats({
        totalEmployees: employeesCount,
        todayShifts: shiftsResponse.data.length,
        upcomingShifts: 0
      });

      setRecentShifts(shiftsResponse.data.slice(0, 5));
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user}!</h1>
          <p className="text-gray-300">
            {isAdmin() 
              ? 'Manage employees, shifts, and system administration.'
              : 'View your shifts and schedule information.'}
          </p>
        </div>

        {/* Statistics Cards */}
        {isAdmin() && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Employees</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {loading ? '...' : stats.totalEmployees}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Today's Shifts</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {loading ? '...' : stats.todayShifts}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Upcoming Shifts</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {loading ? '...' : stats.upcomingShifts}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Shifts */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Today's Shifts</h2>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : recentShifts.length === 0 ? (
            <p className="text-gray-500">No shifts scheduled for today.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentShifts.map((shift) => (
                    <tr key={shift.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shift.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{getEmployeeCode(shift.employeeId)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shift.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {shift.startTime} - {shift.endTime}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>


      </div>
    </Layout>
  );
};

export default Dashboard;
