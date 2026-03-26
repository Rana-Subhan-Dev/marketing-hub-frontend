/**
 * @file Badge.jsx
 * @description Status badge component — maps status strings to colour classes.
 */
import clsx from 'clsx';

const statusMap = {
  active:    'bg-emerald-100 text-emerald-700',
  completed: 'bg-blue-100 text-blue-700',
  paused:    'bg-amber-100 text-amber-700',
  draft:     'bg-gray-100 text-gray-600',
  review:    'bg-purple-100 text-purple-700',
  inactive:  'bg-red-100 text-red-600',
  scheduled: 'bg-brand-100 text-brand-700',
};

export default function Badge({ status, label, className }) {
  const display = label || status;
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
        statusMap[status] || 'bg-gray-100 text-gray-600',
        className
      )}
    >
      {display}
    </span>
  );
}
