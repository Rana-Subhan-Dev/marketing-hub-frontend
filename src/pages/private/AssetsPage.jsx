/**
 * @file AssetsPage.jsx
 * @description Asset library — grid view of all media/documents with type filters.
 */
import { useState } from 'react';
import {
  RiAddLine, RiSearchLine, RiImageLine, RiFileTextLine,
  RiVideoLine, RiArchiveLine, RiDownloadLine, RiMore2Line,
} from 'react-icons/ri';
import { MOCK_ASSETS } from '../../mock/assets.mock';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';

const TYPES = ['all', 'image', 'document', 'video', 'archive'];

const TYPE_ICONS = {
  image:    RiImageLine,
  document: RiFileTextLine,
  video:    RiVideoLine,
  archive:  RiArchiveLine,
};

const TYPE_COLORS = {
  image:    'bg-brand-50 text-brand-600',
  document: 'bg-amber-50 text-amber-600',
  video:    'bg-rose-50 text-rose-600',
  archive:  'bg-emerald-50 text-emerald-600',
};

export default function AssetsPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setType] = useState('all');

  const filtered = MOCK_ASSETS.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
                        a.project.toLowerCase().includes(search.toLowerCase());
    const matchType   = typeFilter === 'all' || a.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Asset Library</h2>
          <p className="text-sm text-gray-500 mt-0.5">{MOCK_ASSETS.length} assets</p>
        </div>
        <button className="inline-flex items-center gap-1.5 bg-brand-600 text-white text-sm font-medium px-3.5 py-2 rounded-lg hover:bg-brand-700 transition-colors">
          <RiAddLine size={16} /> Upload Asset
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48 max-w-xs">
          <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
          <input
            type="text" placeholder="Search assets..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {TYPES.map(t => (
            <button key={t} onClick={() => setType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                typeFilter === t ? 'bg-brand-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-300'
              }`}>{t}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(asset => {
            const Icon = TYPE_ICONS[asset.type] || RiFileTextLine;
            const colorClass = TYPE_COLORS[asset.type] || 'bg-gray-50 text-gray-600';
            return (
              <Card key={asset.id} className="overflow-hidden hover:shadow-md transition-shadow">
                {/* Preview */}
                <div className="h-36 flex items-center justify-center bg-gray-50 border-b border-gray-100">
                  {asset.type === 'image' && asset.url !== '#' ? (
                    <img src={asset.url} alt={asset.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${colorClass}`}>
                      <Icon size={28} />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{asset.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">{asset.project}</p>
                    </div>
                    <button className="p-1 rounded hover:bg-gray-100 flex-shrink-0">
                      <RiMore2Line size={14} className="text-gray-400" />
                    </button>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {asset.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{tag}</span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase">{asset.format} &bull; {asset.size}</span>
                    <button className="p-1 rounded hover:bg-gray-100">
                      <RiDownloadLine size={13} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <EmptyState icon={RiImageLine} title="No assets found" description="Try adjusting your search or upload a new asset." />
      )}
    </div>
  );
}
