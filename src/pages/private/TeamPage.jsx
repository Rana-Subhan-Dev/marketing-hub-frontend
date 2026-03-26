/**
 * @file TeamPage.jsx
 * @description Team members page — cards with roles, departments, and status.
 */
import { useState } from 'react';
import { RiAddLine, RiSearchLine, RiMailLine } from 'react-icons/ri';
import { MOCK_TEAM } from '../../mock/team.mock';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import { RiTeamLine } from 'react-icons/ri';

export default function TeamPage() {
  const [search, setSearch] = useState('');

  const filtered = MOCK_TEAM.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.role.toLowerCase().includes(search.toLowerCase()) ||
    m.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Team</h2>
          <p className="text-sm text-gray-500 mt-0.5">{MOCK_TEAM.length} members</p>
        </div>
        <button className="inline-flex items-center gap-1.5 bg-brand-600 text-white text-sm font-medium px-3.5 py-2 rounded-lg hover:bg-brand-700 transition-colors">
          <RiAddLine size={16} /> Invite Member
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
        <input
          type="text" placeholder="Search team..."
          value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      {/* Cards */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(member => (
            <Card key={member.id} className="p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <Avatar initials={member.initials} color={member.color} size="lg" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">{member.name}</h3>
                    <Badge status={member.status} />
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{member.role}</p>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full mt-1.5 inline-block">
                    {member.department}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-2 text-xs text-gray-400 hover:text-brand-600 transition-colors truncate"
                >
                  <RiMailLine size={13} /> {member.email}
                </a>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-400">Joined {member.joinedAt}</span>
                  <span className="text-xs font-medium text-brand-600">{member.projects} projects</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState icon={RiTeamLine} title="No members found" description="Try adjusting your search." />
      )}
    </div>
  );
}
