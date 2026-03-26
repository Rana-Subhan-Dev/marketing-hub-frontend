/**
 * @file App.jsx
 * @description Root app component — wraps everything in AuthProvider and renders the router.
 */
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { router } from './router/index';

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
