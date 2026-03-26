/**
 * @file RegisterPage.jsx
 * @description Public registration page — UI only, mock submit.
 */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiStackLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate  = useNavigate();

  const [form, setForm]       = useState({ name: '', email: '', company: '', password: '', confirm: '' });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw]   = useState(false);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name)                           e.name     = 'Full name is required';
    if (!form.email)                          e.email    = 'Email is required';
    if (!form.password || form.password.length < 8) e.password = 'Password must be at least 8 characters';
    if (form.password !== form.confirm)       e.confirm  = 'Passwords do not match';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      login(form.email, form.password);
      navigate('/dashboard');
    }, 900);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-7">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
            <RiStackLine className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">Brandography Hub</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h1>
        <p className="text-sm text-gray-500 mb-7">Get started with a free 14-day trial. No credit card required.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Full name" id="name" type="text" placeholder="Alex Johnson" value={form.name} onChange={set('name')} error={errors.name} />
            <Input label="Company" id="company" type="text" placeholder="Brandography" value={form.company} onChange={set('company')} />
          </div>
          <Input label="Email address" id="email" type="email" placeholder="you@company.com" value={form.email} onChange={set('email')} error={errors.email} />
          <div className="relative">
            <Input
              label="Password"
              id="password"
              type={showPw ? 'text' : 'password'}
              placeholder="Min. 8 characters"
              value={form.password}
              onChange={set('password')}
              error={errors.password}
            />
            <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3 top-9 text-gray-400 hover:text-gray-600">
              {showPw ? <RiEyeOffLine size={17} /> : <RiEyeLine size={17} />}
            </button>
          </div>
          <Input label="Confirm password" id="confirm" type="password" placeholder="••••••••" value={form.confirm} onChange={set('confirm')} error={errors.confirm} />

          <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer pt-1">
            <input type="checkbox" className="mt-0.5 rounded border-gray-300 text-brand-600" />
            I agree to the{' '}
            <span className="text-brand-600 hover:underline">Terms of Service</span>{' '}and{' '}
            <span className="text-brand-600 hover:underline">Privacy Policy</span>
          </label>

          <Button type="submit" loading={loading} className="w-full" size="lg">
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-600 font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
