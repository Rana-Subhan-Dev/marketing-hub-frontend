/**
 * @file ResetPasswordPage.jsx
 * @description Public reset password page — UI only, shows success state.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiStackLine, RiCheckboxCircleLine } from 'react-icons/ri';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function ResetPasswordPage() {
  const [form, setForm]       = useState({ password: '', confirm: '' });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);

  const validate = () => {
    const e = {};
    if (!form.password || form.password.length < 8) e.password = 'Min. 8 characters required';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 900);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        <div className="flex items-center gap-2 mb-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
            <RiStackLine className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">Brandography Hub</span>
        </div>

        {done ? (
          <div className="text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 mx-auto mb-4">
              <RiCheckboxCircleLine size={26} className="text-emerald-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">Password updated!</h1>
            <p className="text-sm text-gray-500 mb-6">Your password has been reset successfully.</p>
            <Link
              to="/login"
              className="inline-block px-6 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-lg hover:bg-brand-700 transition-colors"
            >
              Back to Sign In
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Reset your password</h1>
            <p className="text-sm text-gray-500 mb-7">Enter a new password for your account.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="New password" id="password" type="password" placeholder="Min. 8 characters"
                value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} error={errors.password} />
              <Input label="Confirm password" id="confirm" type="password" placeholder="••••••••"
                value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} error={errors.confirm} />
              <Button type="submit" loading={loading} className="w-full" size="lg">Reset Password</Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
