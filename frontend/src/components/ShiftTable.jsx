import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const ShiftTable = ({ onRefresh }) => {
  const [shifts, setShifts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [date, setDate] = useState('');
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (onRefresh) {
      fetchShifts();
    }
  }, [onRefresh]);

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/employees');
      setEmployees(response.data);
    } catch (err) {
      console.error('Failed to fetch employees:', err);
    }
  };

  const getEmployeeCode = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    return employee ? employee.employeeCode : `ID: ${employeeId}`;
  };

  const fetchShifts = async () => {
    if (!employeeId && !date) return;
    
    try {
      const params = {};
      if (employeeId) params.employee = employeeId;
      if (date) params.date = date;
      
      const response = await api.get('/shifts', { params });
      setShifts(response.data);
    } catch (err) {
      console.error('Failed to fetch shifts:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this shift?')) return;
    
    try {
      await api.delete(`/shifts/${id}`);
      setShifts(shifts.filter(shift => shift.id !== id));
    } catch (err) {
      console.error('Failed to delete shift:', err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
          <input
            type="number"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Optional"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={fetchShifts}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-200"
          >
            Search
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              {isAdmin() && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {shifts.length === 0 ? (
              <tr>
                <td colSpan={isAdmin() ? 6 : 5} className="px-6 py-4 text-center text-gray-500">
                  No shifts found. Use the filters above to search.
                </td>
              </tr>
            ) : (
              shifts.map((shift) => (
                <tr key={shift.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shift.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{getEmployeeCode(shift.employeeId)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shift.date}</td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {shift.startTime} - {shift.endTime}
                  </td>
                  {isAdmin() && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleDelete(shift.id)}
                        className="text-gray-700 hover:text-gray-900"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShiftTable;
