/**
 * @file ActivityFeed.jsx
 * @description Recent activity feed for the dashboard.
 */
import { MOCK_ACTIVITY } from '../../mock/activity.mock';
import Avatar from '../ui/Avatar';
import Card from '../ui/Card';

export default function ActivityFeed() {
  return (
    <Card className="p-5">
      <h3 className="text-base font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {MOCK_ACTIVITY.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <Avatar initials={item.initials} color={item.color} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700">
                <span className="font-medium">{item.user}</span>{' '}
                <span className="text-gray-500">{item.action}</span>{' '}
                <span className="font-medium text-brand-600">{item.target}</span>
              </p>
              {item.project && (
                <p className="text-xs text-gray-400 mt-0.5">{item.project}</p>
              )}
            </div>
            <span className="text-xs text-gray-400 flex-shrink-0">{item.time}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
