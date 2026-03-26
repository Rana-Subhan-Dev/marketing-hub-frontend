/**
 * @file CampaignDetailPage.jsx
 * @description Campaign detail — stats, performance metrics, spend vs budget.
 */
import { useParams, useNavigate } from 'react-router-dom';
import { RiArrowLeftLine, RiEyeLine, RiCursorLine, RiPercentLine, RiMoneyDollarCircleLine } from 'react-icons/ri';
import { MOCK_CAMPAIGNS } from '../../mock/campaigns.mock';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function CampaignDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const campaign = MOCK_CAMPAIGNS.find(c => c.id === id);

  if (!campaign) return (
    <div className="text-center py-20">
      <p className="text-gray-500">Campaign not found.</p>
      <button onClick={() => navigate('/campaigns')} className="mt-4 text-brand-600 text-sm hover:underline">Back</button>
    </div>
  );

  const ctr = campaign.reach > 0 ? ((campaign.clicks / campaign.reach) * 100).toFixed(1) : '0.0';
  const spentPct = campaign.budget > 0 ? Math.round((campaign.spent / campaign.budget) * 100) : 0;

  const chartData = [
    { name: 'Reach',       value: campaign.reach },
    { name: 'Clicks',      value: campaign.clicks },
    { name: 'Conversions', value: campaign.conversions },
  ];

  return (
    <div className="space-y-6">
      <button onClick={() => navigate('/campaigns')} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-600 transition-colors">
        <RiArrowLeftLine size={15} /> Back to Campaigns
      </button>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold text-gray-900">{campaign.name}</h2>
            <Badge status={campaign.status} />
          </div>
          <p className="text-sm text-gray-500">{campaign.project} &middot; <span className="font-medium text-gray-700">{campaign.type}</span></p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50">Edit</button>
          <button className="px-4 py-2 text-sm font-medium bg-brand-600 text-white rounded-lg hover:bg-brand-700">Duplicate</button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Reach',   value: campaign.reach.toLocaleString(),       icon: RiEyeLine,              bg: 'bg-brand-100' },
          { label: 'Total Clicks',  value: campaign.clicks.toLocaleString(),      icon: RiCursorLine,           bg: 'bg-purple-100' },
          { label: 'CTR',           value: `${ctr}%`,                             icon: RiPercentLine,          bg: 'bg-emerald-100' },
          { label: 'Conversions',   value: campaign.conversions.toLocaleString(), icon: RiMoneyDollarCircleLine, bg: 'bg-amber-100' },
        ].map(({ label, value, icon: Icon, bg }) => (
          <Card key={label} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
              </div>
              <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${bg}`}>
                <Icon size={17} className="text-gray-600" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Chart + Budget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-5 lg:col-span-2">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Performance Breakdown</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#cbd5e1" />
              <YAxis tick={{ fontSize: 12 }} stroke="#cbd5e1" />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
              <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <div className="space-y-5">
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Budget</h3>
            <div className="flex items-center justify-between mb-1 text-sm">
              <span className="text-gray-500">Spent</span>
              <span className="font-semibold">${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}</span>
            </div>
            <div className="h-2.5 rounded-full bg-gray-100">
              <div
                className={`h-2.5 rounded-full ${ spentPct > 90 ? 'bg-red-500' : spentPct > 70 ? 'bg-amber-500' : 'bg-emerald-500' }`}
                style={{ width: `${Math.min(spentPct, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1.5">{spentPct}% of budget used</p>
          </Card>

          <Card className="p-5 space-y-2">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Details</h3>
            <div className="text-sm flex justify-between"><span className="text-gray-500">Start</span><span className="font-medium">{campaign.startDate}</span></div>
            <div className="text-sm flex justify-between"><span className="text-gray-500">End</span><span className="font-medium">{campaign.endDate}</span></div>
            <div className="text-sm flex justify-between"><span className="text-gray-500">Type</span><span className="font-medium">{campaign.type}</span></div>
          </Card>
        </div>
      </div>

      <Card className="p-5">
        <h3 className="text-base font-semibold text-gray-900 mb-2">Description</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{campaign.description}</p>
      </Card>
    </div>
  );
}
