import { useState } from 'react';
import api from '../api/axios';

const ShiftAssignmentForm = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await api.post('/shifts', {
        employeeId: parseInt(employeeId),
        date
      });
      setMessage('Shift assigned successfully!');
      setEmployeeId('');
      setDate('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to assign shift');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
          <input
            type="number"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>
      {message && <div className="text-green-600 text-sm">{message}</div>}
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Assign Shift
      </button>
    </form>
  );
};

export default ShiftAssignmentForm;
