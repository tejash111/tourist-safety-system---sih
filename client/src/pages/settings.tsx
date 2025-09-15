import { useState, useEffect } from "react";

interface SettingsData {
  id: string;
  touristId: string;
  realTimeTracking: boolean;
  geofenceAlerts: boolean;
  autoCheckins: boolean;
  voiceEmergencyAccess: boolean;
  darkMode: boolean;
  biometricLock: boolean;
  language: string;
}

// Mock settings data for demo purposes
const mockSettings: SettingsData = {
  id: "settings-001",
  touristId: "DTI-IN-2024-001847",
  realTimeTracking: true,
  geofenceAlerts: true,
  autoCheckins: false,
  voiceEmergencyAccess: true,
  darkMode: false,
  biometricLock: false,
  language: "en"
};

export default function Settings() {
  const [settings, setSettings] = useState<SettingsData>(mockSettings);
  const [isDarkMode, setIsDarkMode] = useState(settings.darkMode);

  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  const showToast = (title: string, description: string) => {
    // Simple toast simulation
    alert(`${title}: ${description}`);
  };

  const toggleSetting = (key: keyof SettingsData, currentValue: boolean) => {
    const newValue = !currentValue;

    if (key === 'darkMode') {
      setIsDarkMode(newValue);
      if (newValue) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }

    setSettings(prev => ({ ...prev, [key]: newValue }));

    showToast("Settings Updated", "Your preferences have been saved.");
  };

  const ToggleSwitch = ({ enabled, onClick }: { enabled: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${enabled ? 'bg-blue-600' : 'bg-slate-300'
        }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 pb-24" data-testid="settings-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Settings</h1>
        <p className="text-slate-600">Customize your safety and privacy preferences</p>
      </div>

      {/* Preferences Section */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 mb-6" data-testid="preferences-section">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Safety Preferences</h3>
              <p className="text-xs text-slate-500">Configure your tracking and alert settings</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between" data-testid="setting-real-time-tracking">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-slate-800 text-sm">Real-time Tracking</div>
                  <div className="text-xs text-slate-500 mt-1">
                    Share location with emergency contacts
                  </div>
                </div>
              </div>
              <ToggleSwitch
                enabled={settings.realTimeTracking}
                onClick={() => toggleSetting('realTimeTracking', settings.realTimeTracking)}
              />
            </div>

            <div className="flex items-center justify-between" data-testid="setting-geofence-alerts">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-slate-800 text-sm">Geo-fence Alerts</div>
                  <div className="text-xs text-slate-500 mt-1">
                    Notify when entering risk zones
                  </div>
                </div>
              </div>
              <ToggleSwitch
                enabled={settings.geofenceAlerts}
                onClick={() => toggleSetting('geofenceAlerts', settings.geofenceAlerts)}
              />
            </div>

            <div className="flex items-center justify-between" data-testid="setting-auto-checkins">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-slate-800 text-sm">Automatic Check-ins</div>
                  <div className="text-xs text-slate-500 mt-1">
                    Auto-verify safe locations
                  </div>
                </div>
              </div>
              <ToggleSwitch
                enabled={settings.autoCheckins}
                onClick={() => toggleSetting('autoCheckins', settings.autoCheckins)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Language & Accessibility Section */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 mb-6" data-testid="language-section">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 12.236 11.618 14z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Language & Accessibility</h3>
              <p className="text-xs text-slate-500">Communication and accessibility options</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            <div
              className="flex items-center justify-between cursor-pointer hover:bg-slate-50 -m-3 p-3 rounded-xl transition-colors"
              data-testid="setting-app-language"
              onClick={() => {
                showToast("Language Settings", "Feature coming soon - Multiple languages support");
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 12.236 11.618 14z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-slate-800 text-sm">App Language</div>
                  <div className="text-xs text-slate-500 mt-1">English (US)</div>
                </div>
              </div>
              <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>

            <div className="flex items-center justify-between" data-testid="setting-voice-emergency">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-slate-800 text-sm">Voice Emergency Access</div>
                  <div className="text-xs text-slate-500 mt-1">
                    Enabled for accessibility
                  </div>
                </div>
              </div>
              <ToggleSwitch
                enabled={settings.voiceEmergencyAccess}
                onClick={() => toggleSetting('voiceEmergencyAccess', settings.voiceEmergencyAccess)}
              />
            </div>

            <div className="flex items-center justify-between" data-testid="setting-dark-mode">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-slate-800 text-sm">Dark Mode</div>
                  <div className="text-xs text-slate-500 mt-1">
                    {isDarkMode ? 'Enabled' : 'Follow system setting'}
                  </div>
                </div>
              </div>
              <ToggleSwitch
                enabled={isDarkMode}
                onClick={() => toggleSetting('darkMode', isDarkMode)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Security & Privacy Section */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 mb-6" data-testid="security-section">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Security & Privacy</h3>
              <p className="text-xs text-slate-500">Protect your data and identity</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between" data-testid="setting-biometric-lock">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11zM8.05 9.6a1 1 0 01.9 1.4l-.478 1.06a1 1 0 11-1.83-.82L7.12 10.18a1 1 0 01.93-1.58z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-slate-800 text-sm">Biometric Lock</div>
                  <div className="text-xs text-slate-500 mt-1">
                    Use fingerprint/face unlock
                  </div>
                </div>
              </div>
              <ToggleSwitch
                enabled={settings.biometricLock}
                onClick={() => toggleSetting('biometricLock', settings.biometricLock)}
              />
            </div>

            <div className="flex items-center justify-between" data-testid="setting-data-encryption">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-slate-800 text-sm">Data Encryption</div>
                  <div className="text-xs text-slate-500 mt-1">
                    End-to-end encryption enabled
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-xs text-emerald-600 font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200" data-testid="support-section">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Support & Information</h3>
              <p className="text-xs text-slate-500">Get help and app information</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            <div
              className="flex items-center justify-between cursor-pointer hover:bg-slate-50 -m-3 p-3 rounded-xl transition-colors"
              data-testid="help-center"
              onClick={() => {
                showToast("Help Center", "Opening help documentation...");
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-slate-800 text-sm">Help Center</div>
                  <div className="text-xs text-slate-500 mt-1">
                    FAQs and documentation
                  </div>
                </div>
              </div>
              <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>

            <div
              className="flex items-center justify-between cursor-pointer hover:bg-slate-50 -m-3 p-3 rounded-xl transition-colors"
              data-testid="contact-support"
              onClick={() => {
                showToast("Contacting Support", "Tourist helpline: 1363 (24/7 assistance)");
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-slate-800 text-sm">Contact Support</div>
                  <div className="text-xs text-slate-500 mt-1">
                    24/7 tourist assistance
                  </div>
                </div>
              </div>
              <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>

            <div className="flex items-center justify-between" data-testid="app-version">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-slate-800 text-sm">App Version</div>
                  <div className="text-xs text-slate-500 mt-1">v2.4.1 (Build 847)</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-xs text-emerald-600 font-medium">Latest</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}