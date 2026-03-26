/**
 * @file Input.jsx
 * @description Reusable form input with label, helper text, and error state.
 */
import clsx from 'clsx';

export default function Input({
  label,
  id,
  error,
  helper,
  className,
  ...props
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        className={clsx(
          'w-full rounded-lg border px-3.5 py-2.5 text-sm text-gray-900',
          'placeholder:text-gray-400 bg-white',
          'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500',
          'transition-all duration-150',
          error
            ? 'border-red-400 focus:ring-red-400'
            : 'border-gray-300',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      {helper && !error && <p className="text-xs text-gray-500">{helper}</p>}
    </div>
  );
}
