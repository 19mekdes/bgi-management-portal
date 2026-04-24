import React, { useState } from 'react';
import { User, Shield, Settings, Lock } from 'lucide-react';
import { ProfileSettings } from './components/ProfileSettings';
import { ChangePassword } from './components/ChangePassword';
import { RoleManagement } from './components/RoleManagement';
import { SystemPreferences } from './components/SystemPreferences';
import { Card } from '../../components/common/Card';
import { useAuth } from '../../contexts/AuthContext';

type SettingsTab = 'profile' | 'password' | 'roles' | 'preferences';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  const userRole = user?.role;
  const isAdmin = userRole === 'ADMIN';

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: User, adminOnly: false },
    { id: 'password' as const, label: 'Password', icon: Lock, adminOnly: false },
    { id: 'roles' as const, label: 'Role Management', icon: Shield, adminOnly: true },
    { id: 'preferences' as const, label: 'Preferences', icon: Settings, adminOnly: false },
  ];

  const visibleTabs = tabs.filter(tab => !tab.adminOnly || isAdmin);

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'password':
        return <ChangePassword />;
      case 'roles':
        return <RoleManagement />;
      case 'preferences':
        return <SystemPreferences />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account and system preferences</p>
      </div>

      {/* Settings Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-1">
          {visibleTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1">
          <Card>
            <div className="p-6">
              {renderContent()}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};