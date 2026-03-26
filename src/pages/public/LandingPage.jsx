/**
 * @file LandingPage.jsx
 * @description Public landing page — hero section, features, stats, and CTA.
 */
import { useNavigate } from 'react-router-dom';
import {
  RiRocketLine, RiBarChartLine, RiTeamLine,
  RiCalendarLine, RiImageLine, RiMegaphoneLine,
  RiArrowRightLine, RiStackLine, RiCheckLine,
} from 'react-icons/ri';

const FEATURES = [
  { icon: RiFolderLine,    title: 'Project Management',   desc: 'Organise every client project in one place. Track progress, budgets, and deadlines.' },
  { icon: RiMegaphoneLine, title: 'Campaign Tracking',    desc: 'Monitor all your campaigns across channels with real-time performance data.' },
  { icon: RiBarChartLine,  title: 'Analytics & Reports',  desc: 'Deep-dive into reach, clicks, conversions, and ROI with beautiful charts.' },
  { icon: RiCalendarLine,  title: 'Content Calendar',     desc: 'Plan and schedule content across all your channels from a single calendar view.' },
  { icon: RiImageLine,     title: 'Asset Library',        desc: 'Store, organise, and share all your creative assets in a searchable library.' },
  { icon: RiTeamLine,      title: 'Team Collaboration',   desc: 'Invite your team, assign roles, and collaborate seamlessly on every project.' },
];

const STATS = [
  { value: '500+', label: 'Agencies' },
  { value: '12K+', label: 'Campaigns Managed' },
  { value: '98%',  label: 'Client Retention' },
  { value: '4.9',  label: 'Average Rating' },
];

import { RiFolderLine } from 'react-icons/ri';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
              <RiStackLine className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">Brandography</span>
            <span className="text-[10px] font-semibold bg-brand-100 text-brand-700 px-1.5 py-0.5 rounded">HUB</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-4 py-2 text-sm font-medium bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-purple-50 py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-600 mb-6">
            <RiRocketLine size={13} /> The All-in-One Marketing Hub
          </span>
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Run Every Campaign.<br />
            <span className="text-brand-600">Grow Every Brand.</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
            Brandography Hub brings your projects, campaigns, assets, and team into one
            powerful workspace — built for modern marketing agencies.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate('/register')}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-600 text-white text-base font-semibold rounded-xl hover:bg-brand-700 transition-colors shadow-lg shadow-brand-200"
            >
              Start Free Trial <RiArrowRightLine />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-7 py-3.5 bg-white text-gray-700 text-base font-semibold rounded-xl border border-gray-200 hover:border-brand-300 transition-colors"
            >
              Sign In to Hub
            </button>
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="mx-auto mt-16 max-w-5xl px-6">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/80 overflow-hidden">
            <div className="h-10 bg-gray-50 border-b border-gray-200 flex items-center px-4 gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              <div className="flex-1 mx-4 h-5 rounded bg-gray-200" />
            </div>
            <div className="h-64 bg-gradient-to-br from-gray-50 to-brand-50 flex items-center justify-center">
              <div className="grid grid-cols-4 gap-4 w-full max-w-2xl px-8">
                {['Projects', 'Campaigns', 'Assets', 'Analytics'].map((item) => (
                  <div key={item} className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
                    <div className="h-8 w-8 rounded-lg bg-brand-100 mx-auto mb-2" />
                    <div className="h-5 bg-gray-200 rounded mb-1" />
                    <div className="h-3 bg-gray-100 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 border-y border-gray-100">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-4xl font-extrabold text-brand-600 mb-1">{value}</p>
                <p className="text-sm text-gray-500 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything your agency needs</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              From first brief to final report — manage your entire marketing workflow in one place.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md hover:border-brand-200 transition-all">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 mb-4">
                  <Icon size={20} className="text-brand-600" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing teaser ── */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-gray-500">No hidden fees. Cancel anytime.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Starter', price: '$49', desc: 'Perfect for small agencies', features: ['5 Projects', '10 Campaigns', '5 Team Members', 'Asset Library', 'Basic Analytics'] },
              { name: 'Growth',  price: '$99', desc: 'For growing teams', features: ['Unlimited Projects', 'Unlimited Campaigns', '20 Team Members', 'Advanced Analytics', 'Priority Support'], highlight: true },
              { name: 'Agency', price: '$199', desc: 'For large agencies', features: ['Everything in Growth', 'Unlimited Members', 'White-label Reports', 'API Access', 'Dedicated Manager'] },
            ].map(({ name, price, desc, features, highlight }) => (
              <div
                key={name}
                className={`rounded-2xl border p-6 ${
                  highlight
                    ? 'border-brand-500 bg-brand-600 text-white shadow-xl shadow-brand-200'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <h3 className={`text-lg font-bold mb-1 ${highlight ? 'text-white' : 'text-gray-900'}`}>{name}</h3>
                <p className={`text-sm mb-4 ${highlight ? 'text-brand-200' : 'text-gray-400'}`}>{desc}</p>
                <p className={`text-4xl font-extrabold mb-1 ${highlight ? 'text-white' : 'text-gray-900'}`}>
                  {price}<span className={`text-base font-normal ${highlight ? 'text-brand-200' : 'text-gray-400'}`}>/mo</span>
                </p>
                <ul className="mt-5 space-y-2.5 mb-6">
                  {features.map(f => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${highlight ? 'text-brand-100' : 'text-gray-600'}`}>
                      <RiCheckLine className={highlight ? 'text-white' : 'text-brand-500'} size={15} /> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate('/register')}
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    highlight
                      ? 'bg-white text-brand-700 hover:bg-brand-50'
                      : 'bg-brand-600 text-white hover:bg-brand-700'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-brand-600">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to grow your agency?</h2>
          <p className="text-brand-200 mb-8">Join 500+ agencies already using Brandography Hub.</p>
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-3.5 bg-white text-brand-700 text-base font-bold rounded-xl hover:bg-brand-50 transition-colors"
          >
            Start Your Free Trial
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-200 bg-white py-10">
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600">
              <RiStackLine className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-sm">Brandography Hub</span>
          </div>
          <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Brandography. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-gray-400">
            <button className="hover:text-gray-600">Privacy</button>
            <button className="hover:text-gray-600">Terms</button>
            <button className="hover:text-gray-600">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
