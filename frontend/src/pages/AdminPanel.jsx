import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../api/axios';

const AdminPanel = () => {
  const [employees, setEmployees] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedRole, setSelectedRole] = useState('USER');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [employeesRes, usersRes] = await Promise.all([
        api.get('/employees'),
        api.get('/admin/users').catch(() => ({ data: [] })) // Fallback if endpoint doesn't exist
      ]);
      setEmployees(employeesRes.data);
      setUsers(usersRes.data || []);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignRole = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!selectedEmployee) {
      setError('Please select an employee');
      return;
    }

    try {
      const response = await api.post('/admin/assign-role', {
        employeeId: parseInt(selectedEmployee),
        role: selectedRole
      });
      setMessage(`Role assigned successfully! ${response.data.message || ''}`);
      setSelectedEmployee('');
      setSelectedRole('USER');
      fetchData();
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data || 'Failed to assign role');
    }
  };

  const getEmployeeDetails = (employeeId) => {
    return employees.find(e => e.id === employeeId);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
          <p className="text-gray-600 mt-1">System administration and role management</p>
        </div>

        {/* Messages */}
        {message && (
          <div className="bg-gray-200 border border-gray-400 text-gray-800 px-4 py-3 rounded">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-gray-200 border border-gray-400 text-gray-800 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Role Assignment Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Assign Role to Employee</h2>
            <form onSubmit={handleAssignRole} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Employee *
                </label>
                <select
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                >
                  <option value="">-- Choose Employee --</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.employeeCode}) - {emp.department}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Role *
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                >
                  <option value="USER">USER - Normal Employee Access</option>
                  <option value="ADMIN">ADMIN - Full System Access</option>
                </select>
              </div>
              <div className="bg-gray-100 p-4 rounded-md">
                <h3 className="font-semibold text-gray-900 mb-2">Important Notes:</h3>
                <ul className="text-sm text-gray-800 space-y-1">
                  <li>• Role can only be assigned to existing employees</li>
                  <li>• A temporary password will be generated for new users</li>
                  <li>• Existing users will have their role updated</li>
                  <li>• Username will be based on employee code</li>
                </ul>
              </div>
              <button
                type="submit"
                className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 transition"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Assign Role'}
              </button>
            </form>
          </div>

          {/* System Statistics */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">System Statistics</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-100 rounded-md">
                  <div>
                    <p className="text-sm text-gray-600">Total Employees</p>
                    <p className="text-2xl font-bold text-gray-800">{employees.length}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-100 rounded-md">
                  <div>
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-800">{users.length}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-100 rounded-md">
                  <div>
                    <p className="text-sm text-gray-600">Admin Users</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {users.filter(u => u.role === 'ADMIN').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Role Descriptions</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-gray-500 pl-4">
                  <h3 className="font-semibold text-gray-800">USER Role</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    • Can view their own shifts<br/>
                    • Can view employee information<br/>
                    • Cannot create or delete data<br/>
                    • Standard employee access level
                  </p>
                </div>
                <div className="border-l-4 border-gray-700 pl-4">
                  <h3 className="font-semibold text-gray-800">ADMIN Role</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    • Full system access<br/>
                    • Can create/edit/delete employees<br/>
                    • Can create/delete shifts<br/>
                    • Can assign roles to employees<br/>
                    • Can view all data
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Employee List with User Status */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Employee User Accounts</h2>
            <p className="text-sm text-gray-600 mt-1">Overview of which employees have user accounts</p>
          </div>
          {loading ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User Account</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {employees.map((employee) => {
                    const user = users.find(u => u.employeeId === employee.id);
                    return (
                      <tr key={employee.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {employee.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                            {employee.employeeCode}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.department}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {user ? (
                            <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                              Has Account
                            </span>
                          ) : (
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                              No Account
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {user ? (
                            <span className="px-2 py-1 rounded text-xs font-medium bg-gray-200 text-gray-800">
                              {user.role}
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminPanel;
