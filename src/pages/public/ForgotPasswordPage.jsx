/**
 * @file ForgotPasswordPage.jsx
 * @description Public forgot password page — shows success state after mock submit.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiStackLine, RiMailLine, RiArrowLeftLine } from 'react-icons/ri';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function ForgotPasswordPage() {
  const [email, setEmail]     = useState('');
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) { setError('Email is required'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
            <RiStackLine className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">Brandography Hub</span>
        </div>

        {sent ? (
          <div className="text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 mx-auto mb-4">
              <RiMailLine size={24} className="text-emerald-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">Check your email</h1>
            <p className="text-sm text-gray-500 mb-6">
              We sent a password reset link to <span className="font-medium text-gray-700">{email}</span>.
              Check your inbox and follow the instructions.
            </p>
            <Link to="/login" className="text-brand-600 text-sm font-semibold hover:underline">
              Back to Sign In
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Forgot your password?</h1>
            <p className="text-sm text-gray-500 mb-7">
              Enter your email and we’ll send you a reset link.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email address"
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                error={error}
              />
              <Button type="submit" loading={loading} className="w-full" size="lg">
                Send Reset Link
              </Button>
            </form>
            <div className="mt-6 text-center">
              <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-600 transition-colors">
                <RiArrowLeftLine size={15} /> Back to Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
