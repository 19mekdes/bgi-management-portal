import React, { useState, useEffect } from 'react';
import { Settings, Moon, Sun, Bell, Layout, Save } from 'lucide-react';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  compactView: boolean;
}

export const SystemPreferences: React.FC = () => {
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>('user-preferences', {
    theme: 'light',
    notifications: true,
    compactView: false,
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  // Apply theme to document
  useEffect(() => {
    if (preferences.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [preferences.theme]);

  const handleThemeChange = (theme: 'light' | 'dark') => {
    setPreferences({ ...preferences, theme });
  };

  const handleToggle = (key: keyof UserPreferences) => {
    setPreferences({ ...preferences, [key]: !preferences[key] });
  };

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSaved(true);
      setLoading(false);
      setTimeout(() => setSaved(false), 3000);
    }, 500);
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">System Preferences</h2>
        </div>

        {saved && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md">
            Preferences saved successfully!
          </div>
        )}

        <div className="space-y-6">
          {/* Theme Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Theme
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => handleThemeChange('light')}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg border transition-all ${
                  preferences.theme === 'light'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Sun size={18} />
                <span>Light</span>
              </button>
              <button
                onClick={() => handleThemeChange('dark')}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg border transition-all ${
                  preferences.theme === 'dark'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Moon size={18} />
                <span>Dark</span>
              </button>
            </div>
          </div>

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between py-3 border-t">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">Notifications</p>
                <p className="text-sm text-gray-500">Receive email notifications</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('notifications')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                preferences.notifications ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  preferences.notifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Compact View Toggle */}
          <div className="flex items-center justify-between py-3 border-t">
            <div className="flex items-center gap-3">
              <Layout className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">Compact View</p>
                <p className="text-sm text-gray-500">Use compact layout for tables</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('compactView')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                preferences.compactView ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  preferences.compactView ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Save Button */}
          <div className="pt-4 border-t">
            <Button
              onClick={handleSave}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2"
            >
              <Save size={18} />
              {loading ? 'Saving...' : 'Save Preferences'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};