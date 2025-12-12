import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import api from '../api/axios';

const ShiftsPage = () => {
  const { isAdmin } = useAuth();
  const [shifts, setShifts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterDate, setFilterDate] = useState('');
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    date: '',
    startTime: '',
    endTime: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [modalError, setModalError] = useState('');

  useEffect(() => {
    fetchShifts();
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/employees');
      setEmployees(response.data);
    } catch (err) {
      console.error('Failed to fetch employees:', err);
    }
  };

  const fetchShifts = async () => {
    try {
      const params = {};
      if (filterDate) params.date = filterDate;

      const response = await api.get('/shifts', { params });
      setShifts(response.data);
    } catch (err) {
      setError('Failed to fetch shifts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setModalError('');

    try {
      await api.post('/shifts', {
        employeeId: parseInt(formData.employeeId),
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime
      });
      setMessage('Shift created successfully!');
      setFormData({
        employeeId: '',
        date: '',
        startTime: '',
        endTime: ''
      });
      setEmployeeSearch('');
      setShowAddModal(false);
      fetchShifts();
    } catch (err) {
      setModalError(err.response?.data?.error || err.response?.data || 'Failed to create shift');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this shift?')) return;

    try {
      await api.delete(`/shifts/${id}`);
      setMessage('Shift deleted successfully!');
      fetchShifts();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete shift');
    }
  };

  const getEmployeeCode = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    return employee ? employee.employeeCode : 'N/A';
  };

  const getFilteredEmployees = () => {
    if (!employeeSearch.trim()) return employees;
    const search = employeeSearch.toLowerCase();
    return employees.filter(emp => 
      emp.employeeCode.toLowerCase().includes(search) ||
      emp.name.toLowerCase().includes(search)
    );
  };

  const selectEmployee = (employee) => {
    setFormData({ ...formData, employeeId: employee.id });
    setEmployeeSearch(`${employee.employeeCode} - ${employee.name}`);
    setShowEmployeeDropdown(false);
  };

  const handleEmployeeSearchChange = (value) => {
    setEmployeeSearch(value);
    setShowEmployeeDropdown(true);
    if (!value.trim()) {
      setFormData({ ...formData, employeeId: '' });
    }
  };

  const closeModal = () => {
    setShowAddModal(false);
    setModalError('');
    setFormData({
      employeeId: '',
      date: '',
      startTime: '',
      endTime: ''
    });
    setEmployeeSearch('');
  };



  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Shifts</h1>
            <p className="text-gray-600 mt-1">Manage shift schedules and assignments</p>
          </div>
          {isAdmin() && (
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
            >
              + Create Shift
            </button>
          )}
        </div>

        {/* Messages */}
        {message && (
          <div className="bg-gray-200 border border-gray-400 text-gray-800 px-4 py-3 rounded">
            {message}
          </div>
        )}

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Date</label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={fetchShifts}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Shifts Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">Loading shifts...</p>
            </div>
          ) : shifts.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">No shifts found. {isAdmin() && 'Create a new shift to get started.'}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Time</th>
                    {isAdmin() && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {shifts.map((shift) => (
                    <tr key={shift.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shift.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{getEmployeeCode(shift.employeeId)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shift.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shift.startTime}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shift.endTime}</td>
                      {isAdmin() && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleDelete(shift.id)}
                            className="text-gray-700 hover:text-gray-900 font-medium"
                          >
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {/* Add Shift Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Shift</h2>
            {modalError && (
              <div className="mb-4 bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded">
                {modalError}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee *</label>
                <input
                  type="text"
                  value={employeeSearch}
                  onChange={(e) => handleEmployeeSearchChange(e.target.value)}
                  onFocus={() => setShowEmployeeDropdown(true)}
                  placeholder="Type employee code or name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                  autoComplete="off"
                />
                {showEmployeeDropdown && getFilteredEmployees().length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {getFilteredEmployees().map((employee) => (
                      <div
                        key={employee.id}
                        onClick={() => selectEmployee(employee)}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <span className="font-medium text-gray-900">{employee.employeeCode}</span>
                        <span className="text-gray-600"> - {employee.name}</span>
                        <span className="text-sm text-gray-500 ml-2">({employee.department})</span>
                      </div>
                    ))}
                  </div>
                )}
                {showEmployeeDropdown && employeeSearch && getFilteredEmployees().length === 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    <div className="px-3 py-2 text-gray-500 text-sm">No employees found</div>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time *</label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Time *</label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 transition"
                >
                  Create Shift
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ShiftsPage;
