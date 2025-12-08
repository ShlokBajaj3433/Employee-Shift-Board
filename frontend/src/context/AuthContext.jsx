import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedRole = localStorage.getItem('role');
    const savedUser = localStorage.getItem('username');
    if (token && savedRole) {
      setRole(savedRole);
      setUser(savedUser);
    }
  }, []);

  const login = (token, userRole, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);
    localStorage.setItem('username', username);
    setRole(userRole);
    setUser(username);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    setUser(null);
    setRole(null);
  };

  const isAdmin = () => role === 'ADMIN';

  return (
    <AuthContext.Provider value={{ user, role, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
