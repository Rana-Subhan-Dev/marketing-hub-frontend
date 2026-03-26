/**
 * @file SettingsPage.jsx
 * @description Settings page — three tabs: Profile, Account, Notifications.
 */
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';

const TABS = ['Profile', 'Account', 'Notifications'];

export default function SettingsPage() {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('Profile');
  const [form, setForm]           = useState({ name: user?.name || '', email: user?.email || '', company: user?.company || '' });
  const [saved, setSaved]         = useState(false);
  const [loading, setLoading]     = useState(false);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      updateUser({ name: form.name, company: form.company });
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 700);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-sm text-gray-500 mt-0.5">Manage your account preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === tab
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Profile tab */}
      {activeTab === 'Profile' && (
        <Card className="p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-5">Profile Information</h3>

          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <Avatar
              initials={user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
              size="xl"
            />
            <div>
              <button className="text-sm font-medium text-brand-600 hover:underline">Change photo</button>
              <p className="text-xs text-gray-400 mt-0.5">JPG, PNG or GIF. Max 2MB.</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Full name"   id="name"    value={form.name}    onChange={set('name')}    placeholder="Alex Johnson" />
              <Input label="Company"     id="company" value={form.company} onChange={set('company')} placeholder="Brandography" />
            </div>
            <Input label="Email address" id="email"   value={form.email}   onChange={set('email')}   placeholder="you@example.com" helper="Email changes require verification." />

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" loading={loading}>Save Changes</Button>
              {saved && <span className="text-sm text-emerald-600 font-medium">✓ Saved successfully</span>}
            </div>
          </form>
        </Card>
      )}

      {/* Account tab */}
      {activeTab === 'Account' && (
        <Card className="p-6 space-y-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4">Change Password</h3>
            <div className="space-y-3 max-w-sm">
              <Input label="Current password"  id="cur-pw"  type="password" placeholder="••••••••" />
              <Input label="New password"       id="new-pw"  type="password" placeholder="Min. 8 characters" />
              <Input label="Confirm password"   id="conf-pw" type="password" placeholder="••••••••" />
              <Button size="md">Update Password</Button>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-5">
            <h3 className="text-base font-semibold text-gray-900 mb-1">Two-Factor Authentication</h3>
            <p className="text-sm text-gray-500 mb-3">Add an extra layer of security to your account.</p>
            <Button variant="secondary">Enable 2FA</Button>
          </div>

          <div className="border-t border-gray-100 pt-5">
            <h3 className="text-base font-semibold text-red-600 mb-1">Danger Zone</h3>
            <p className="text-sm text-gray-500 mb-3">Permanently delete your account and all data.</p>
            <Button variant="danger">Delete Account</Button>
          </div>
        </Card>
      )}

      {/* Notifications tab */}
      {activeTab === 'Notifications' && (
        <Card className="p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-5">Notification Preferences</h3>
          <div className="space-y-4">
            {[
              { label: 'Project updates',          desc: 'When a project status changes',           defaultOn: true },
              { label: 'Campaign alerts',           desc: 'Campaign performance milestones',          defaultOn: true },
              { label: 'Team mentions',             desc: 'When someone mentions you',               defaultOn: true },
              { label: 'Weekly digest',             desc: 'Summary email every Monday',              defaultOn: false },
              { label: 'Asset uploads',             desc: 'When a new asset is added to your project', defaultOn: false },
              { label: 'Deadline reminders',        desc: '24 hours before a project deadline',      defaultOn: true },
            ].map(({ label, desc, defaultOn }) => {
              const [on, setOn] = useState(defaultOn);
              return (
                <div key={label} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{label}</p>
                    <p className="text-xs text-gray-400">{desc}</p>
                  </div>
                  <button
                    onClick={() => setOn(v => !v)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      on ? 'bg-brand-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${
                      on ? 'translate-x-4' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              );
            })}
          </div>
          <div className="mt-5 pt-4 border-t border-gray-100">
            <Button>Save Preferences</Button>
          </div>
        </Card>
      )}
    </div>
  );
}
