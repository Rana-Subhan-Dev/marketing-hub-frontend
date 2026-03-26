/**
 * @file CampaignCard.jsx
 * @description Card view for a single campaign.
 */
import { useNavigate } from 'react-router-dom';
import { RiEyeLine, RiCursorLine, RiPercentLine } from 'react-icons/ri';
import Badge from '../ui/Badge';
import Card from '../ui/Card';

export default function CampaignCard({ campaign }) {
  const navigate = useNavigate();
  const ctr = campaign.reach > 0 ? ((campaign.clicks / campaign.reach) * 100).toFixed(1) : '0.0';

  return (
    <Card
      className="p-5 cursor-pointer hover:shadow-md hover:border-brand-200 transition-all duration-200"
      onClick={() => navigate(`/campaigns/${campaign.id}`)}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{campaign.name}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{campaign.project}</p>
        </div>
        <Badge status={campaign.status} />
      </div>

      <span className="text-xs bg-brand-50 text-brand-600 px-2 py-0.5 rounded-full font-medium">{campaign.type}</span>

      <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
            <RiEyeLine size={13} />
            <span className="text-xs">Reach</span>
          </div>
          <p className="text-sm font-semibold text-gray-900">{campaign.reach.toLocaleString()}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
            <RiCursorLine size={13} />
            <span className="text-xs">Clicks</span>
          </div>
          <p className="text-sm font-semibold text-gray-900">{campaign.clicks.toLocaleString()}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
            <RiPercentLine size={13} />
            <span className="text-xs">CTR</span>
          </div>
          <p className="text-sm font-semibold text-gray-900">{ctr}%</p>
        </div>
      </div>
    </Card>
  );
}
