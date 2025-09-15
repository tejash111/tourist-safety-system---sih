import { Tourist } from "@/types";

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
  itinerary: "Delhi Tour",
  hotelInfo: "Hotel Pinewood, Ghaziabad",
  guideContact: "+91 98765 43210",
  passportNumber: "US123456789"
};

export default function Profile() {
  const tourist = mockTourist;

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 pb-24" data-testid="profile-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Tourist Profile</h1>
        <p className="text-slate-600">Your digital identity and travel information</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 mb-6 overflow-hidden" data-testid="profile-card">
        {/* Profile Header with Gradient Background */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-center relative">
          <div className="absolute top-4 right-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-white text-xs font-medium">Verified</span>
            </div>
          </div>
          
          <div className="relative mb-4">
            <img
              src={tourist.profilePhoto || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"}
              alt="Tourist profile photo"
              className="w-24 h-24 rounded-full border-4 border-white shadow-xl mx-auto object-cover"
              data-testid="profile-avatar"
            />
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2" data-testid="profile-name">
            {tourist.fullName}
          </h2>
          <p className="text-blue-100 text-sm" data-testid="profile-nationality">
            {tourist.nationality} Tourist
          </p>
        </div>

        {/* Profile Details */}
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Digital ID Section */}
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2v8h12V6H4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm">Digital Tourist ID</h4>
                  <p className="text-xs text-slate-500">Blockchain secured identity</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-slate-200">
                <div className="font-mono text-slate-800 font-semibold text-center tracking-wide" data-testid="digital-id">
                  {tourist.digitalId}
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs text-slate-500 font-medium">Valid Until</span>
                </div>
                <div className="text-lg font-bold text-slate-800" data-testid="valid-until">
                  {formatDate(tourist.validUntil)}
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs text-emerald-600 font-medium">Safety Score</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-emerald-700" data-testid="safety-score">
                    {tourist.safetyScore}
                  </span>
                  <span className="text-sm text-emerald-600">/100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Location */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">Current Location</h3>
            <p className="text-xs text-slate-500">Live tracking enabled</p>
          </div>
          <div className="ml-auto">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <div className="bg-slate-50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium text-slate-700">{tourist.currentLocation?.address}</span>
          </div>
        </div>
      </div>

      {/* Trip Information */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 mb-6" data-testid="trip-info">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">Trip Information</h3>
            <p className="text-xs text-slate-500">Your travel itinerary details</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs text-slate-500 font-medium">Itinerary</span>
                  <div className="font-semibold text-slate-800 mt-1" data-testid="trip-itinerary">
                    {tourist.itinerary || "Not specified"}
                  </div>
                </div>
                <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs font-medium">
                  Active
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <span className="text-xs text-slate-500 font-medium">Duration</span>
                <div className="font-semibold text-slate-800 mt-1" data-testid="trip-duration">
                  7 days
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <span className="text-xs text-slate-500 font-medium">Hotel</span>
                <div className="font-semibold text-slate-800 mt-1 text-sm" data-testid="trip-hotel">
                  {tourist.hotelInfo || "Not specified"}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <span className="text-xs text-slate-500 font-medium">Guide Contact</span>
                <div className="font-mono text-slate-800 mt-1 text-sm" data-testid="guide-contact">
                  {tourist.guideContact || "Not assigned"}
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <span className="text-xs text-slate-500 font-medium">Passport</span>
                <div className="font-mono text-slate-800 mt-1 text-sm" data-testid="passport-number">
                  {tourist.passportNumber}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Status */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white" data-testid="verification-status">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-bold text-lg">Verified Tourist</h4>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-xs font-medium">Blockchain Secured</span>
              </div>
            </div>
            <p className="text-emerald-100 text-sm leading-relaxed">
              Your identity has been verified through advanced blockchain technology. 
              All travel records are secure, encrypted, and tamper-proof for your protection.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <button className="bg-white rounded-xl shadow-md border border-slate-200 p-4 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
            </svg>
          </div>
          <div className="font-semibold text-slate-800 text-sm">Edit Profile</div>
        </button>
        
        <button className="bg-white rounded-xl shadow-md border border-slate-200 p-4 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="font-semibold text-slate-800 text-sm">Export Data</div>
        </button>
      </div>
    </div>
  );
}