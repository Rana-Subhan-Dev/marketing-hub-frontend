/**
 * @file Sidebar.jsx
 * @description Main left sidebar navigation for authenticated layout.
 *              Highlights the active route using NavLink.
 */
import { NavLink, useNavigate } from 'react-router-dom';
import {
  RiDashboardLine,
  RiFolderLine,
  RiMegaphoneLine,
  RiCalendarLine,
  RiImageLine,
  RiBarChartLine,
  RiTeamLine,
  RiSettingsLine,
  RiLogoutBoxLine,
  RiStackLine,
} from 'react-icons/ri';
import { useAuth } from '../../hooks/useAuth';
import Avatar from '../ui/Avatar';
import clsx from 'clsx';

const NAV_ITEMS = [
  { to: '/dashboard',  label: 'Dashboard',  icon: RiDashboardLine },
  { to: '/projects',   label: 'Projects',   icon: RiFolderLine },
  { to: '/campaigns',  label: 'Campaigns',  icon: RiMegaphoneLine },
  { to: '/calendar',   label: 'Calendar',   icon: RiCalendarLine },
  { to: '/assets',     label: 'Assets',     icon: RiImageLine },
  { to: '/analytics',  label: 'Analytics',  icon: RiBarChartLine },
  { to: '/team',       label: 'Team',       icon: RiTeamLine },
  { to: '/settings',   label: 'Settings',   icon: RiSettingsLine },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-gray-100">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
          <RiStackLine className="h-4 w-4 text-white" />
        </div>
        <span className="text-lg font-bold text-gray-900">Brandography</span>
        <span className="ml-auto text-[10px] font-semibold bg-brand-100 text-brand-700 px-1.5 py-0.5 rounded">HUB</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-brand-50 text-brand-600'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )
            }
          >
            <Icon className="h-4.5 w-4.5 flex-shrink-0" size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User footer */}
      <div className="border-t border-gray-100 px-3 py-4 space-y-1">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            clsx(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
              isActive
                ? 'bg-brand-50 text-brand-600'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            )
          }
        >
          <Avatar initials={user?.name?.split(' ').map(n => n[0]).join('') || 'U'} size="sm" />
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-gray-900 truncate">{user?.name}</span>
            <span className="text-xs text-gray-400 truncate">{user?.role}</span>
          </div>
        </NavLink>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-150"
        >
          <RiLogoutBoxLine size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
