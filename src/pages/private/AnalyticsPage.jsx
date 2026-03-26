/**
 * @file AnalyticsPage.jsx
 * @description Analytics & reports — KPI summary, line chart, pie chart, campaign table.
 */
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell,
} from 'recharts';
import {
  OVERVIEW_CHART_DATA, CHANNEL_DATA,
  CAMPAIGN_PERFORMANCE, KPI_STATS, WEEKLY_ACTIVITY,
} from '../../mock/analytics.mock';
import Card from '../../components/ui/Card';
import { RiDownloadLine } from 'react-icons/ri';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
          <p className="text-sm text-gray-500 mt-0.5">Performance overview across all campaigns</p>
        </div>
        <button className="inline-flex items-center gap-1.5 border border-gray-200 text-sm font-medium px-3.5 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          <RiDownloadLine size={15} /> Export Report
        </button>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          { label: 'Total Reach',       value: KPI_STATS.totalReach.toLocaleString() },
          { label: 'Total Clicks',      value: KPI_STATS.totalClicks.toLocaleString() },
          { label: 'Conversions',       value: KPI_STATS.totalConversions.toLocaleString() },
          { label: 'Avg CTR',           value: KPI_STATS.avgCTR },
          { label: 'Total Spend',       value: `$${KPI_STATS.totalSpend.toLocaleString()}` },
          { label: 'ROI',               value: KPI_STATS.roi },
        ].map(({ label, value }) => (
          <Card key={label} className="p-4 text-center">
            <p className="text-xs text-gray-400 mb-1">{label}</p>
            <p className="text-xl font-bold text-gray-900">{value}</p>
          </Card>
        ))}
      </div>

      {/* Line + Pie row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-1">Monthly Performance</h3>
          <p className="text-xs text-gray-400 mb-4">Reach, Clicks & Conversions</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={OVERVIEW_CHART_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#cbd5e1" />
              <YAxis tick={{ fontSize: 12 }} stroke="#cbd5e1" />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="reach"       stroke="#6366f1" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="clicks"      stroke="#8b5cf6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-1">Channel Mix</h3>
          <p className="text-xs text-gray-400 mb-4">Revenue by channel</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={CHANNEL_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                {CHANNEL_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {CHANNEL_DATA.map(({ name, value, color }) => (
              <div key={name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
                  <span className="text-gray-600">{name}</span>
                </div>
                <span className="font-semibold text-gray-900">{value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Weekly activity bar chart */}
      <Card className="p-5">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Weekly Activity</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={WEEKLY_ACTIVITY}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#cbd5e1" />
            <YAxis tick={{ fontSize: 12 }} stroke="#cbd5e1" />
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="posts"  fill="#6366f1" radius={[3,3,0,0]} />
            <Bar dataKey="emails" fill="#8b5cf6" radius={[3,3,0,0]} />
            <Bar dataKey="ads"    fill="#10b981" radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Campaign performance table */}
      <Card className="p-5">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Campaign Performance</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                {['Campaign', 'Reach', 'Clicks', 'CTR', 'Conversions'].map(h => (
                  <th key={h} className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {CAMPAIGN_PERFORMANCE.map(row => (
                <tr key={row.name} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{row.name}</td>
                  <td className="px-4 py-3 text-gray-600">{row.reach.toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-600">{row.clicks.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`font-semibold ${ row.ctr > 20 ? 'text-emerald-600' : row.ctr > 10 ? 'text-amber-600' : 'text-gray-600' }`}>
                      {row.ctr}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{row.conversions.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
