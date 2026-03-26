/**
 * @file ProfilePage.jsx
 * @description User profile page — shows user info, activity summary, and quick settings.
 */
import { useNavigate } from 'react-router-dom';
import { RiEditLine, RiCalendarLine, RiFolderLine, RiMegaphoneLine, RiSettingsLine } from 'react-icons/ri';
import { useAuth } from '../../hooks/useAuth';
import Avatar from '../../components/ui/Avatar';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { MOCK_PROJECTS } from '../../mock/projects.mock';
import { MOCK_CAMPAIGNS } from '../../mock/campaigns.mock';
import { MOCK_ACTIVITY } from '../../mock/activity.mock';

export default function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const initials = user?.name?.split(' ').map(n => n[0]).join('') || 'U';
  const myProjects  = MOCK_PROJECTS.slice(0, 3);
  const myCampaigns = MOCK_CAMPAIGNS.slice(0, 3);
  const myActivity  = MOCK_ACTIVITY.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Profile header card */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <Avatar initials={initials} size="xl" />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
              <Badge status="active" label={user?.role} />
            </div>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <p className="text-sm text-gray-500">{user?.company}</p>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-400">
              <RiCalendarLine size={13} />
              Joined {user?.joinedAt || 'January 2024'}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/settings')}
              className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <RiEditLine size={14} /> Edit Profile
            </button>
            <button
              onClick={() => navigate('/settings')}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              <RiSettingsLine size={16} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-gray-100">
          {[
            { label: 'Projects',   value: MOCK_PROJECTS.length,  icon: RiFolderLine },
            { label: 'Campaigns',  value: MOCK_CAMPAIGNS.length, icon: RiMegaphoneLine },
            { label: 'Activities', value: MOCK_ACTIVITY.length,  icon: RiCalendarLine },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="text-center">
              <div className="flex items-center justify-center gap-1.5 text-gray-400 mb-1">
                <Icon size={14} />
                <span className="text-xs">{label}</span>
              </div>
              <p className="text-xl font-bold text-gray-900">{value}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Projects + Campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">My Projects</h3>
            <button onClick={() => navigate('/projects')} className="text-xs text-brand-600 hover:underline">View all</button>
          </div>
          <div className="space-y-3">
            {myProjects.map(p => (
              <div
                key={p.id}
                onClick={() => navigate(`/projects/${p.id}`)}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.client}</p>
                </div>
                <Badge status={p.status} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">My Campaigns</h3>
            <button onClick={() => navigate('/campaigns')} className="text-xs text-brand-600 hover:underline">View all</button>
          </div>
          <div className="space-y-3">
            {myCampaigns.map(c => (
              <div
                key={c.id}
                onClick={() => navigate(`/campaigns/${c.id}`)}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{c.name}</p>
                  <p className="text-xs text-gray-400">{c.type}</p>
                </div>
                <Badge status={c.status} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Activity */}
      <Card className="p-5">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {myActivity.map(item => (
            <div key={item.id} className="flex items-start gap-3">
              <Avatar initials={item.initials} color={item.color} size="sm" />
              <div className="flex-1">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">{item.user}</span>{' '}
                  {item.action}{' '}
                  <span className="font-medium text-brand-600">{item.target}</span>
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
