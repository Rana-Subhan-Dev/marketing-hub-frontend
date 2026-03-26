/**
 * @file LoginPage.jsx
 * @description Public login page — mock auth, any email/password works.
 */
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { RiStackLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm]       = useState({ email: '', password: '' });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw]   = useState(false);

  // Redirect to the page they originally tried to visit, or dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  const validate = () => {
    const e = {};
    if (!form.email)    e.email    = 'Email is required';
    if (!form.password) e.password = 'Password is required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    // Simulate async login
    setTimeout(() => {
      login(form.email, form.password);
      navigate(from, { replace: true });
    }, 800);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-600 to-brand-800 items-center justify-center p-12">
        <div className="max-w-sm text-white">
          <div className="flex items-center gap-3 mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
              <RiStackLine className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold">Brandography Hub</span>
          </div>
          <h2 className="text-3xl font-bold mb-4 leading-tight">Welcome back to your marketing command centre</h2>
          <p className="text-brand-200 text-sm leading-relaxed">
            Manage projects, track campaigns, and grow your clients' brands — all in one place.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {['Projects', 'Campaigns', 'Analytics', 'Team'].map(f => (
              <div key={f} className="bg-white/10 rounded-xl px-4 py-3">
                <p className="text-sm font-medium">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
              <RiStackLine className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">Brandography Hub</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">Sign in to Hub</h1>
          <p className="text-sm text-gray-500 mb-8">Enter your credentials to access your workspace</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email address"
              id="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              error={errors.email}
              autoComplete="email"
            />

            <div className="relative">
              <Input
                label="Password"
                id="password"
                type={showPw ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                error={errors.password}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPw(s => !s)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              >
                {showPw ? <RiEyeOffLine size={17} /> : <RiEyeLine size={17} />}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-brand-600" />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-brand-600 font-medium hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" loading={loading} className="w-full" size="lg">
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don’t have an account?{' '}
            <Link to="/register" className="text-brand-600 font-semibold hover:underline">
              Create one
            </Link>
          </p>

          {/* Demo hint */}
          <div className="mt-6 rounded-lg bg-brand-50 border border-brand-100 p-3.5 text-xs text-brand-700">
            <p className="font-semibold mb-0.5">Demo credentials</p>
            <p>Email: <span className="font-mono">fipopurove@mailinator.com</span></p>
            <p>Password: <span className="font-mono">Pa$$w0rd!</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
