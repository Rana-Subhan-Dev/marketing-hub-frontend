/**
 * @file AuthContext.jsx
 * @description Mock authentication context.
 *              Stores auth state in localStorage so sessions persist on refresh.
 *              Swap the login() function body for a real API call when backend is ready.
 */
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

// Mock user object — replace with real user data from API
const MOCK_USER = {
  id: '1',
  name: 'Alex Johnson',
  email: 'fipopurove@mailinator.com',
  role: 'Admin',
  avatar: null,
  company: 'Brandography',
  joinedAt: '2024-01-15',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Rehydrate auth state from localStorage on app load
  useEffect(() => {
    const stored = localStorage.getItem('bh_auth');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  /**
   * Mock login — accepts any email/password and sets the mock user.
   * Replace the internals with a real API call when backend is ready.
   */
  const login = (email, password) => {
    // TODO: replace with → const res = await axios.post('/api/auth/login', { email, password })
    const userData = { ...MOCK_USER, email };
    setUser(userData);
    localStorage.setItem('bh_auth', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bh_auth');
  };

  const updateUser = (updatedFields) => {
    const updated = { ...user, ...updatedFields };
    setUser(updated);
    localStorage.setItem('bh_auth', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
