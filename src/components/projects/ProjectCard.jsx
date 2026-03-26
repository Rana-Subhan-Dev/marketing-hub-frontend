/**
 * @file ProjectCard.jsx
 * @description Grid card for a single project — shows name, client, status, progress.
 */
import { useNavigate } from 'react-router-dom';
import { RiTeamLine, RiCalendarLine } from 'react-icons/ri';
import Badge from '../ui/Badge';
import Card from '../ui/Card';

export default function ProjectCard({ project }) {
  const navigate = useNavigate();

  return (
    <Card
      className="p-5 cursor-pointer hover:shadow-md hover:border-brand-200 transition-all duration-200"
      onClick={() => navigate(`/projects/${project.id}`)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 leading-tight">{project.name}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{project.client}</p>
        </div>
        <Badge status={project.status} />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags.map(tag => (
          <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{tag}</span>
        ))}
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-500">Progress</span>
          <span className="text-xs font-semibold text-gray-700">{project.progress}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-gray-100">
          <div
            className="h-1.5 rounded-full bg-brand-500 transition-all duration-500"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <RiTeamLine size={13} /> {project.team.length} members
        </span>
        <span className="flex items-center gap-1">
          <RiCalendarLine size={13} /> {project.dueDate}
        </span>
      </div>
    </Card>
  );
}
