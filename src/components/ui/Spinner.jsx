/**
 * @file Spinner.jsx
 * @description Reusable loading spinner using Tailwind animate-spin.
 */
import clsx from 'clsx';

const sizes = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-10 w-10 border-4',
};

export default function Spinner({ size = 'md', className }) {
  return (
    <div
      className={clsx(
        'animate-spin rounded-full border-gray-200 border-t-brand-600',
        sizes[size],
        className
      )}
    />
  );
}
