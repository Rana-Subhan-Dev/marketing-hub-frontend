/**
 * @file Card.jsx
 * @description Generic card shell — white background, rounded corners, border, shadow.
 */
import clsx from 'clsx';

export default function Card({ children, className, ...props }) {
  return (
    <div
      className={clsx('bg-white rounded-xl border border-gray-200 shadow-sm', className)}
      {...props}
    >
      {children}
    </div>
  );
}
