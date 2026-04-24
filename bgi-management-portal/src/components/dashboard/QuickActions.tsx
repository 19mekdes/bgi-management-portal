import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Package, 
  Clock, 
  FileText, 
  PlusCircle,
  UserPlus,
  Box,
  CalendarCheck
} from 'lucide-react';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  roles?: string[];
  color: string;
}

interface QuickActionsProps {
  userRole?: 'ADMIN' | 'MANAGER' | 'STAFF';
}

export const QuickActions: React.FC<QuickActionsProps> = ({ userRole = 'STAFF' }) => {
  const navigate = useNavigate();

  const allActions: QuickAction[] = [
    {
      id: 'add-employee',
      title: 'Add Employee',
      description: 'Register new employee',
      icon: <UserPlus className="h-6 w-6" />,
      path: '/employees/new',
      roles: ['ADMIN'],
      color: 'bg-blue-500',
    },
    {
      id: 'add-product',
      title: 'Add Product',
      description: 'Create new product',
      icon: <PlusCircle className="h-6 w-6" />,
      path: '/products/new',
      roles: ['ADMIN', 'MANAGER'],
      color: 'bg-green-500',
    },
    {
      id: 'check-in',
      title: 'Check In',
      description: 'Record your attendance',
      icon: <Clock className="h-6 w-6" />,
      path: '/attendance',
      roles: ['ADMIN', 'MANAGER', 'STAFF'],
      color: 'bg-purple-500',
    },
    {
      id: 'view-employees',
      title: 'View Employees',
      description: 'Manage team members',
      icon: <Users className="h-6 w-6" />,
      path: '/employees',
      roles: ['ADMIN', 'MANAGER'],
      color: 'bg-indigo-500',
    },
    {
      id: 'manage-stock',
      title: 'Manage Stock',
      description: 'Update inventory',
      icon: <Box className="h-6 w-6" />,
      path: '/products',
      roles: ['ADMIN', 'MANAGER'],
      color: 'bg-orange-500',
    },
    {
      id: 'attendance-report',
      title: 'Attendance Report',
      description: 'View attendance summary',
      icon: <CalendarCheck className="h-6 w-6" />,
      path: '/reports',
      roles: ['ADMIN', 'MANAGER'],
      color: 'bg-pink-500',
    },
    {
      id: 'view-reports',
      title: 'Generate Reports',
      description: 'Export data reports',
      icon: <FileText className="h-6 w-6" />,
      path: '/reports',
      roles: ['ADMIN', 'MANAGER'],
      color: 'bg-teal-500',
    },
    {
      id: 'view-products',
      title: 'View Products',
      description: 'Browse product catalog',
      icon: <Package className="h-6 w-6" />,
      path: '/products',
      roles: ['STAFF'],
      color: 'bg-cyan-500',
    },
  ];

  const getAvailableActions = () => {
    return allActions.filter(action => {
      if (!action.roles) return true;
      return action.roles.includes(userRole);
    });
  };

  const availableActions = getAvailableActions();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        <span className="text-xs text-gray-500">
          {availableActions.length} actions available
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {availableActions.map((action) => (
          <button
            key={action.id}
            onClick={() => navigate(action.path)}
            className="flex items-start gap-3 p-4 border rounded-lg hover:shadow-md transition-all duration-200 text-left group"
          >
            <div className={`${action.color} p-2 rounded-lg text-white group-hover:scale-110 transition-transform`}>
              {action.icon}
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{action.title}</p>
              <p className="text-sm text-gray-500">{action.description}</p>
            </div>
          </button>
        ))}
      </div>
      
      {availableActions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No quick actions available for your role</p>
        </div>
      )}
    </div>
  );
};