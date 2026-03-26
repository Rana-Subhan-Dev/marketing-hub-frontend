/**
 * @file OverviewChart.jsx
 * @description Recharts line chart showing monthly reach, clicks, and conversions.
 */
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { OVERVIEW_CHART_DATA } from '../../mock/analytics.mock';
import Card from '../ui/Card';

export default function OverviewChart() {
  return (
    <Card className="p-5">
      <h3 className="text-base font-semibold text-gray-900 mb-1">Performance Overview</h3>
      <p className="text-xs text-gray-400 mb-4">Reach, Clicks & Conversions — last 7 months</p>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={OVERVIEW_CHART_DATA} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#cbd5e1" />
          <YAxis tick={{ fontSize: 12 }} stroke="#cbd5e1" />
          <Tooltip
            contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Line type="monotone" dataKey="reach"       stroke="#6366f1" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="clicks"      stroke="#8b5cf6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
