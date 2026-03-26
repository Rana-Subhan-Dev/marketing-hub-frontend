/**
 * @file useAuth.js
 * @description Custom hook to consume AuthContext cleanly.
 *              Throws if used outside of AuthProvider — catches wiring mistakes early.
 */
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return ctx;
}
