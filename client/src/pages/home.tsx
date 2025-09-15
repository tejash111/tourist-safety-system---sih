import { useLocation } from "wouter";
import { Tourist, Activity } from "@/types";

// Mock data for demo purposes
const mockTourist: Tourist = {
  id: "DTI-IN-2024-001847",
  fullName: "John doe",
  nationality: "American",
  digitalId: "DTI-IN-2024-001847",
  validUntil: new Date("2024-12-31"),
  safetyScore: 92,
  profilePhoto: "/pic.jpg",
  currentLocation: {
    address: "Muradnagar, Uttar Pradesh, India",
    lat: 25.5788,
    lng: 91.8933
  },
  itinerary: "Delhi tour",
  hotelInfo: "Hotel Pinewood, Ghzaibad",
  guideContact: "+91 98765 43210",
  passportNumber: "US123456789"
};

const mockActivities: Activity[] = [
  {
    id: "1",
    activityType: "check-in",
    description: "Checked in at Hotel Pinewood",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    riskLevel: "safe"
  },
  {
    id: "2",
    activityType: "zone-entry",
    description: "Entered Cherrapunji region",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    riskLevel: "moderate"
  },
  {
    id: "3",
    activityType: "verification",
    description: "Identity verified at tourist center",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    riskLevel: "safe"
  }
];

export default function Home() {
  const [, setLocation] = useLocation();
  const tourist = mockTourist;
  const activities = mockActivities;

  const formatTimeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return `${hours} hours ago`;
  };

  const getRiskColor = (riskLevel?: string) => {
    switch (riskLevel) {
      case 'safe': return 'bg-emerald-500';
      case 'moderate': return 'bg-amber-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  const getRiskLabel = (activityType: string, riskLevel?: string) => {
    switch (activityType) {
      case 'check-in': return 'Verified safe';
      case 'zone-entry': return `${riskLevel} risk zone`;
      case 'verification': return 'Identity verified';
      default: return 'Activity logged';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 pb-24" data-testid="home-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Tourist Safety Hub</h1>
        <p className="text-slate-600">Stay safe, explore confidently</p>
      </div>

      {/* Safety Score Card */}
      <div
        className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6 cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
        data-testid="safety-score-card"
        onClick={() => setLocation("/profile")}
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-800 mb-2" data-testid="welcome-message">
              Welcome back, {tourist?.fullName || "Tourist"}
            </h2>
            <div className="flex items-center gap-2 text-slate-600" data-testid="current-location">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">{tourist?.currentLocation?.address || "Loading location..."}</span>
            </div>
          </div>
          <div className="text-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg">
                <div className="text-2xl font-bold text-white" data-testid="safety-score-value">
                  {tourist?.safetyScore || 85}
                </div>
              </div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">
                Safe
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-emerald-50 rounded-lg p-3">
          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-emerald-800 text-sm">You're in a secure area</p>
            <p className="text-emerald-600 text-xs">All safety protocols are active</p>
          </div>
        </div>
      </div>

      {/* Zone Alert */}
      <div
        className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 cursor-pointer transition-all duration-200 hover:bg-amber-100"
        data-testid="zone-alert"
        onClick={() => setLocation("/map")}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-amber-800 text-sm">Moderate Risk Zone Detected</h3>
            <p className="text-amber-700 text-xs mt-1">
              Cherrapunji region ahead - Enhanced safety measures recommended
            </p>
          </div>
          <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4" data-testid="quick-actions">
          <div
            className="bg-white rounded-xl shadow-md border border-slate-200 p-5 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => setLocation("/emergency")}
            data-testid="action-emergency"
          >
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-semibold text-slate-800 text-sm mb-1">Emergency SOS</h4>
            <p className="text-slate-500 text-xs">Instant help & alerts</p>
          </div>

          <div
            className="bg-white rounded-xl shadow-md border border-slate-200 p-5 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => setLocation("/map")}
            data-testid="action-map"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-semibold text-slate-800 text-sm mb-1">Safe Routes</h4>
            <p className="text-slate-500 text-xs">Navigate securely</p>
          </div>

          <div
            className="bg-white rounded-xl shadow-md border border-slate-200 p-5 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            data-testid="action-health"
            onClick={() => setLocation("/profile")}
          >
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-semibold text-slate-800 text-sm mb-1">Health Monitor</h4>
            <p className="text-slate-500 text-xs">Vitals & wellness</p>
          </div>

          <div
            className="bg-white rounded-xl shadow-md border border-slate-200 p-5 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            data-testid="action-translate"
            onClick={() => setLocation("/settings")}
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 12.236 11.618 14z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-semibold text-slate-800 text-sm mb-1">Translator</h4>
            <p className="text-slate-500 text-xs">Local languages</p>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div
        className="bg-white rounded-xl shadow-md border border-slate-200 p-5 cursor-pointer transition-all duration-200 hover:shadow-lg"
        data-testid="recent-activities"
        onClick={() => setLocation("/profile")}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="font-semibold text-slate-800">Recent Activities</h3>
        </div>

        <div className="space-y-4">
          {activities.length === 0 ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2v8h12V6H4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-slate-500 text-sm">No recent activities</p>
              <p className="text-slate-400 text-xs mt-1">Your activity log will appear here</p>
            </div>
          ) : (
            activities.slice(0, 3).map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 py-2" data-testid={`activity-${activity.id}`}>
                <div className={`w-3 h-3 ${getRiskColor(activity.riskLevel)} rounded-full shadow-sm`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{activity.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-500">{formatTimeAgo(activity.timestamp)}</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-600 font-medium">
                      {getRiskLabel(activity.activityType, activity.riskLevel)}
                    </span>
                  </div>
                </div>
                <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}