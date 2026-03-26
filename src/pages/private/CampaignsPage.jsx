/**
 * @file CampaignsPage.jsx
 * @description Campaigns list page — card grid with status filters and search.
 */
import { useState } from 'react';
import { RiAddLine, RiSearchLine } from 'react-icons/ri';
import { MOCK_CAMPAIGNS } from '../../mock/campaigns.mock';
import CampaignCard from '../../components/campaigns/CampaignCard';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import { RiMegaphoneLine } from 'react-icons/ri';

const STATUSES = ['all', 'active', 'draft', 'paused', 'completed'];
const TYPES    = ['all', 'Email', 'Social', 'Paid Search', 'Display'];

export default function CampaignsPage() {
  const [search,     setSearch]    = useState('');
  const [statusFilter, setStatus]  = useState('all');
  const [typeFilter,   setType]    = useState('all');

  const filtered = MOCK_CAMPAIGNS.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchType   = typeFilter   === 'all' || c.type   === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Campaigns</h2>
          <p className="text-sm text-gray-500 mt-0.5">{MOCK_CAMPAIGNS.length} total campaigns</p>
        </div>
        <Button><RiAddLine size={16} /> New Campaign</Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48 max-w-xs">
          <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
          <input
            type="text" placeholder="Search campaigns..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {STATUSES.map(s => (
            <button key={s} onClick={() => setStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                statusFilter === s ? 'bg-brand-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-300'
              }`}>{s}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(c => <CampaignCard key={c.id} campaign={c} />)}
        </div>
      ) : (
        <EmptyState icon={RiMegaphoneLine} title="No campaigns found" description="Try adjusting your filters." />
      )}
    </div>
  );
}
