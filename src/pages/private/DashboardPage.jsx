/**
 * @file DashboardPage.jsx
 * @description Main dashboard — KPI stat cards, overview chart, activity feed, quick links.
 */
import {
  RiFolderLine, RiMegaphoneLine, RiTeamLine,
  RiBarChartLine, RiArrowRightLine,
} from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import StatCard from '../../components/dashboard/StatCard';
import OverviewChart from '../../components/dashboard/OverviewChart';
import ActivityFeed from '../../components/dashboard/ActivityFeed';
import { MOCK_PROJECTS } from '../../mock/projects.mock';
import { MOCK_CAMPAIGNS } from '../../mock/campaigns.mock';
import { MOCK_TEAM } from '../../mock/team.mock';
import { KPI_STATS } from '../../mock/analytics.mock';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const activeProjects  = MOCK_PROJECTS.filter(p => p.status === 'active').length;
  const activeCampaigns = MOCK_CAMPAIGNS.filter(c => c.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Good morning, {user?.name?.split(' ')[0]} 👋</h2>
        <p className="text-sm text-gray-500 mt-1">Here’s what’s happening with your hub today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Active Projects"  value={activeProjects}              trend={12}  icon={RiFolderLine}    iconBg="bg-brand-100" />
        <StatCard label="Active Campaigns" value={activeCampaigns}             trend={8}   icon={RiMegaphoneLine} iconBg="bg-purple-100" />
        <StatCard label="Total Reach"      value={KPI_STATS.totalReach.toLocaleString()} trend={22}  icon={RiBarChartLine}  iconBg="bg-emerald-100" />
        <StatCard label="Team Members"     value={MOCK_TEAM.length}            trend={-5}  icon={RiTeamLine}      iconBg="bg-amber-100" />
      </div>

      {/* Chart + Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <OverviewChart />
        </div>
        <ActivityFeed />
      </div>

      {/* Recent Projects */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900">Recent Projects</h3>
          <button
            onClick={() => navigate('/projects')}
            className="text-sm text-brand-600 font-medium flex items-center gap-1 hover:underline"
          >
            View all <RiArrowRightLine size={14} />
          </button>
        </div>
        <div className="space-y-3">
          {MOCK_PROJECTS.slice(0, 4).map(p => (
            <div
              key={p.id}
              onClick={() => navigate(`/projects/${p.id}`)}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                <p className="text-xs text-gray-400">{p.client}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 w-32">
                  <div className="flex-1 h-1.5 rounded-full bg-gray-100">
                    <div className="h-1.5 rounded-full bg-brand-500" style={{ width: `${p.progress}%` }} />
                  </div>
                  <span className="text-xs text-gray-500 w-8 text-right">{p.progress}%</span>
                </div>
                <Badge status={p.status} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Clicks',      value: KPI_STATS.totalClicks.toLocaleString() },
          { label: 'Conversions',       value: KPI_STATS.totalConversions.toLocaleString() },
          { label: 'Avg CTR',           value: KPI_STATS.avgCTR },
          { label: 'Campaign ROI',      value: KPI_STATS.roi },
        ].map(({ label, value }) => (
          <Card key={label} className="p-4 text-center">
            <p className="text-xs text-gray-400 mb-1">{label}</p>
            <p className="text-xl font-bold text-gray-900">{value}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
