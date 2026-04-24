import { Clock, UserPlus, Package, Calendar, Edit } from 'lucide-react';

interface Activity {
  id: string;
  action: string;
  user: string;
  time: string;
  type?: 'employee' | 'product' | 'attendance' | 'other';
}

interface RecentActivitiesProps {
  activities: Activity[];
}

const getIcon = (type?: string) => {
  switch (type) {
    case 'employee':
      return <UserPlus size={16} />;
    case 'product':
      return <Package size={16} />;
    case 'attendance':
      return <Calendar size={16} />;
    default:
      return <Edit size={16} />;
  }
};

export const RecentActivities = ({ activities }: RecentActivitiesProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
      <div className="space-y-3">
        {activities.length === 0 ? (
          <p className="text-gray-500 text-sm">No recent activities</p>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 pb-3 border-b last:border-0">
              <div className="shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                {getIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">{activity.action}</p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <span>{activity.user}</span>
                  <span className="mx-1">•</span>
                  <Clock size={12} className="mr-1" />
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};