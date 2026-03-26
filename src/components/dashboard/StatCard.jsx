/**
 * @file StatCard.jsx
 * @description KPI stat card for the dashboard — shows metric, label, and trend.
 */
import clsx from 'clsx';
import Card from '../ui/Card';

export default function StatCard({ label, value, trend, trendLabel, icon: Icon, iconBg }) {
  const isPositive = trend > 0;
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend !== undefined && (
            <p className={clsx('text-xs font-medium mt-1', isPositive ? 'text-emerald-600' : 'text-red-500')}>
              {isPositive ? '▲' : '▼'} {Math.abs(trend)}% {trendLabel || 'vs last month'}
            </p>
          )}
        </div>
        {Icon && (
          <div className={clsx('flex h-10 w-10 items-center justify-center rounded-xl', iconBg || 'bg-brand-100')}>
            <Icon size={20} className="text-brand-600" />
          </div>
        )}
      </div>
    </Card>
  );
}
