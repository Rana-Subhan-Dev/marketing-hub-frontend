/**
 * @file Topbar.jsx
 * @description Top navigation bar — page title, search, notifications, user menu.
 */
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  RiNotification3Line,
  RiSearchLine,
  RiAddLine,
  RiCheckboxCircleLine,
  RiTimeLine,
} from 'react-icons/ri';
import { useAuth } from '../../hooks/useAuth';
import Avatar from '../ui/Avatar';

// Map route paths to human-readable titles
const PAGE_TITLES = {
  '/dashboard':  'Dashboard',
  '/projects':   'Projects',
  '/campaigns':  'Campaigns',
  '/calendar':   'Calendar',
  '/assets':     'Asset Library',
  '/analytics':  'Analytics',
  '/team':       'Team',
  '/settings':   'Settings',
  '/profile':    'My Profile',
};

const MOCK_NOTIFICATIONS = [
  { id: '1', icon: RiCheckboxCircleLine, text: 'Website Redesign moved to Review', time: '5m ago', read: false },
  { id: '2', icon: RiTimeLine, text: 'Summer Sale Blast deadline tomorrow', time: '1h ago', read: false },
  { id: '3', icon: RiCheckboxCircleLine, text: 'Email Campaign Automation completed', time: '3h ago', read: true },
];

export default function Topbar() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifs, setShowNotifs] = useState(false);

  // Derive page title from current path
  const pathBase = '/' + location.pathname.split('/')[1];
  const title = PAGE_TITLES[pathBase] || 'Hub';
  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-6">
      {/* Page title */}
      <h1 className="text-lg font-semibold text-gray-900 flex-1">{title}</h1>

      {/* Search */}
      <div className="relative hidden md:block">
        <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="text"
          placeholder="Search..."
          className="w-64 rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
        />
      </div>

      {/* New button */}
      <button
        className="hidden md:inline-flex items-center gap-1.5 bg-brand-600 text-white text-sm font-medium px-3.5 py-2 rounded-lg hover:bg-brand-700 transition-colors"
      >
        <RiAddLine size={16} /> New
      </button>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setShowNotifs(s => !s)}
          className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <RiNotification3Line size={20} className="text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
          )}
        </button>

        {/* Dropdown */}
        {showNotifs && (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <span className="font-semibold text-gray-900 text-sm">Notifications</span>
              <span className="text-xs text-brand-600 font-medium cursor-pointer hover:underline">Mark all read</span>
            </div>
            <div className="divide-y divide-gray-100">
              {MOCK_NOTIFICATIONS.map(({ id, icon: Icon, text, time, read }) => (
                <div key={id} className={`flex gap-3 px-4 py-3 text-sm ${read ? 'opacity-60' : ''}`}>
                  <Icon size={16} className="mt-0.5 flex-shrink-0 text-brand-500" />
                  <div className="flex-1">
                    <p className="text-gray-700">{text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{time}</p>
                  </div>
                  {!read && <span className="h-2 w-2 rounded-full bg-brand-500 mt-1 flex-shrink-0" />}
                </div>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-gray-100">
              <button className="text-xs text-brand-600 font-medium hover:underline w-full text-center">View all notifications</button>
            </div>
          </div>
        )}
      </div>

      {/* Avatar */}
      <button onClick={() => navigate('/profile')} className="flex-shrink-0">
        <Avatar
          initials={user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
          size="sm"
        />
      </button>
    </header>
  );
}
