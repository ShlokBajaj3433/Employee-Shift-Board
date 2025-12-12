import { useState } from 'react';
import api from '../api/axios';

const ShiftAssignmentForm = ({ onSuccess }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [date, setDate] = useState('');
  const [shiftType, setShiftType] = useState('MORNING');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await api.post('/shifts', {
        employeeId: parseInt(employeeId),
        date,
        shiftType
      });
      setMessage('Shift assigned successfully!');
      setEmployeeId('');
      setDate('');
      setShiftType('MORNING');
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data || 'Failed to assign shift');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
          <input
            type="number"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>

      </div>
      {message && <div className="bg-gray-200 border border-gray-400 text-gray-800 px-4 py-2 rounded text-sm">{message}</div>}
      {error && <div className="bg-gray-200 border border-gray-400 text-gray-800 px-4 py-2 rounded text-sm">{error}</div>}
      <button
        type="submit"
        className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition duration-200"
      >
        Assign Shift
      </button>
    </form>
  );
};

export default ShiftAssignmentForm;
