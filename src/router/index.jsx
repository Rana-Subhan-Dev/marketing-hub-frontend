/**
 * @file router/index.jsx
 * @description Central route configuration.
 *              Public routes are accessible without auth.
 *              Private routes are wrapped in ProtectedRoute.
 */
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import AppLayout from '../components/layout/AppLayout';
import ProtectedRoute from '../components/auth/ProtectedRoute';

// Public pages
import LandingPage          from '../pages/public/LandingPage';
import LoginPage            from '../pages/public/LoginPage';
import RegisterPage         from '../pages/public/RegisterPage';
import ForgotPasswordPage   from '../pages/public/ForgotPasswordPage';
import ResetPasswordPage    from '../pages/public/ResetPasswordPage';

// Private pages
import DashboardPage        from '../pages/private/DashboardPage';
import ProjectsPage         from '../pages/private/ProjectsPage';
import ProjectDetailPage    from '../pages/private/ProjectDetailPage';
import CampaignsPage        from '../pages/private/CampaignsPage';
import CampaignDetailPage   from '../pages/private/CampaignDetailPage';
import CalendarPage         from '../pages/private/CalendarPage';
import AssetsPage           from '../pages/private/AssetsPage';
import AnalyticsPage        from '../pages/private/AnalyticsPage';
import TeamPage             from '../pages/private/TeamPage';
import SettingsPage         from '../pages/private/SettingsPage';
import ProfilePage          from '../pages/private/ProfilePage';

export const router = createBrowserRouter([
  // ── Public routes ──────────────────────────────────────────
  { path: '/',                 element: <LandingPage /> },
  { path: '/login',            element: <LoginPage /> },
  { path: '/register',         element: <RegisterPage /> },
  { path: '/forgot-password',  element: <ForgotPasswordPage /> },
  { path: '/reset-password',   element: <ResetPasswordPage /> },

  // ── Private routes (require auth) ──────────────────────────
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/dashboard',          element: <DashboardPage /> },
      { path: '/projects',           element: <ProjectsPage /> },
      { path: '/projects/:id',       element: <ProjectDetailPage /> },
      { path: '/campaigns',          element: <CampaignsPage /> },
      { path: '/campaigns/:id',      element: <CampaignDetailPage /> },
      { path: '/calendar',           element: <CalendarPage /> },
      { path: '/assets',             element: <AssetsPage /> },
      { path: '/analytics',          element: <AnalyticsPage /> },
      { path: '/team',               element: <TeamPage /> },
      { path: '/settings',           element: <SettingsPage /> },
      { path: '/profile',            element: <ProfilePage /> },
    ],
  },

  // Catch-all — redirect unknown routes to landing
  { path: '*', element: <Navigate to="/" replace /> },
]);
