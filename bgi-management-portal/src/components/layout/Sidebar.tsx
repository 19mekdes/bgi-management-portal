import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  Users,
  Package,
  Calendar,
  FileText,
  Settings,
  LogOut,
  Beer
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'manager', 'staff'] },
  { path: '/employees', label: 'Employees', icon: Users, roles: ['admin', 'manager'] },
  { path: '/products', label: 'Products', icon: Package, roles: ['admin', 'manager', 'staff'] },
  { path: '/attendance', label: 'Attendance', icon: Calendar, roles: ['admin', 'manager', 'staff'] },
  { path: '/reports', label: 'Reports', icon: FileText, roles: ['admin', 'manager'] },
  { path: '/settings', label: 'Settings', icon: Settings, roles: ['admin', 'manager', 'staff'] },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const userRole = user?.role || 'staff';

  const filteredItems = navItems.filter(item => item.roles.includes(userRole));

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="flex items-center justify-center p-4 border-b border-gray-800">
        <Beer className="h-8 w-8 mr-2" />
        <span className="text-xl font-bold">Beer Portal</span>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {filteredItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={logout}
          className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}