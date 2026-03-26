/**
 * @file Avatar.jsx
 * @description User avatar — shows image if provided, falls back to coloured initials.
 */
import clsx from 'clsx';

const sizes = {
  sm:  'h-7 w-7 text-xs',
  md:  'h-9 w-9 text-sm',
  lg:  'h-12 w-12 text-base',
  xl:  'h-16 w-16 text-xl',
};

export default function Avatar({ src, initials, color = 'bg-brand-500', size = 'md', className }) {
  if (src) {
    return (
      <img
        src={src}
        alt="avatar"
        className={clsx('rounded-full object-cover', sizes[size], className)}
      />
    );
  }

  return (
    <div
      className={clsx(
        'rounded-full flex items-center justify-center font-semibold text-white flex-shrink-0',
        color,
        sizes[size],
        className
      )}
    >
      {initials}
    </div>
  );
}
