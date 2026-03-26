/**
 * @file ProjectDetailPage.jsx
 * @description Individual project detail — overview, team, budget, tasks mock.
 */
import { useParams, useNavigate } from 'react-router-dom';
import { RiArrowLeftLine, RiCalendarLine, RiTeamLine, RiMoneyDollarCircleLine } from 'react-icons/ri';
import { MOCK_PROJECTS } from '../../mock/projects.mock';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import { MOCK_TEAM } from '../../mock/team.mock';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = MOCK_PROJECTS.find(p => p.id === id);

  if (!project) return (
    <div className="text-center py-20">
      <p className="text-gray-500">Project not found.</p>
      <button onClick={() => navigate('/projects')} className="mt-4 text-brand-600 text-sm hover:underline">Back to Projects</button>
    </div>
  );

  const budgetPct = Math.round((project.spent / project.budget) * 100);
  const teamMembers = MOCK_TEAM.filter(m => project.team.includes(m.name));

  return (
    <div className="space-y-6">
      {/* Back + Header */}
      <button onClick={() => navigate('/projects')} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-600 transition-colors">
        <RiArrowLeftLine size={15} /> Back to Projects
      </button>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold text-gray-900">{project.name}</h2>
            <Badge status={project.status} />
          </div>
          <p className="text-sm text-gray-500">Client: <span className="font-medium text-gray-700">{project.client}</span></p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50">Edit Project</button>
          <button className="px-4 py-2 text-sm font-medium bg-brand-600 text-white rounded-lg hover:bg-brand-700">Add Task</button>
        </div>
      </div>

      {/* Tags */}
      <div className="flex gap-2">
        {project.tags.map(t => (
          <span key={t} className="text-xs bg-brand-50 text-brand-600 px-3 py-1 rounded-full font-medium">{t}</span>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — details */}
        <div className="lg:col-span-2 space-y-5">
          <Card className="p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{project.description}</p>
          </Card>

          {/* Progress */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-gray-900">Progress</h3>
              <span className="text-2xl font-bold text-brand-600">{project.progress}%</span>
            </div>
            <div className="h-3 rounded-full bg-gray-100">
              <div className="h-3 rounded-full bg-brand-500 transition-all" style={{ width: `${project.progress}%` }} />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {project.progress < 50 ? 'Just getting started' : project.progress < 80 ? 'Making good progress' : project.progress < 100 ? 'Almost there!' : 'Completed!'}
            </p>
          </Card>

          {/* Mock tasks */}
          <Card className="p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Tasks</h3>
            <div className="space-y-2">
              {[
                { task: 'Initial discovery call', done: true },
                { task: 'Creative brief signed off', done: true },
                { task: 'First draft delivered', done: project.progress >= 40 },
                { task: 'Client review round 1', done: project.progress >= 60 },
                { task: 'Final revisions', done: project.progress >= 80 },
                { task: 'Project handover', done: project.progress >= 100 },
              ].map(({ task, done }) => (
                <div key={task} className="flex items-center gap-3">
                  <div className={`h-4 w-4 rounded flex items-center justify-center flex-shrink-0 ${
                    done ? 'bg-emerald-500' : 'border-2 border-gray-300'
                  }`}>
                    {done && <span className="text-white text-[10px] font-bold">✓</span>}
                  </div>
                  <span className={`text-sm ${done ? 'line-through text-gray-400' : 'text-gray-700'}`}>{task}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right — sidebar info */}
        <div className="space-y-5">
          {/* Key info */}
          <Card className="p-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Project Details</h3>
            <div className="flex items-center gap-2 text-sm">
              <RiCalendarLine size={15} className="text-gray-400" />
              <span className="text-gray-500">Due:</span>
              <span className="font-medium text-gray-700">{project.dueDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <RiCalendarLine size={15} className="text-gray-400" />
              <span className="text-gray-500">Created:</span>
              <span className="font-medium text-gray-700">{project.createdAt}</span>
            </div>
          </Card>

          {/* Budget */}
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Budget</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Spent</span>
              <span className="text-xs font-semibold text-gray-700">${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}</span>
            </div>
            <div className="h-2 rounded-full bg-gray-100">
              <div
                className={`h-2 rounded-full transition-all ${
                  budgetPct > 90 ? 'bg-red-500' : budgetPct > 70 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(budgetPct, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1.5">{budgetPct}% of budget used</p>
          </Card>

          {/* Team */}
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              <span className="flex items-center gap-1.5"><RiTeamLine size={14} /> Team ({teamMembers.length})</span>
            </h3>
            <div className="space-y-3">
              {teamMembers.map(m => (
                <div key={m.id} className="flex items-center gap-2.5">
                  <Avatar initials={m.initials} color={m.color} size="sm" />
                  <div>
                    <p className="text-xs font-medium text-gray-900">{m.name}</p>
                    <p className="text-xs text-gray-400">{m.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
