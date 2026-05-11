import { createContext, useContext } from 'react';

// No auth required — provides a mock user for display purposes
const AuthContext = createContext(null);
const MOCK_USER = { displayName: 'Demo User', email: 'demo@example.com', uid: 'demo' };

export function AuthProvider({ children }) {
  return <AuthContext.Provider value={{ user: MOCK_USER }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
