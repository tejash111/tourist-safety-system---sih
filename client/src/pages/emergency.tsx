import useLocation from "@/hooks/use-location";
import { EmergencyContact } from "@/types";

// Mock emergency contacts data
const mockEmergencyContacts: EmergencyContact[] = [
  {
    id: "1",
    name: "John Johnson",
    phoneNumber: "+1-555-0123",
    relationship: "Family",
    isPrimary: true
  },
  {
    id: "2",
    name: "Travel Insurance Co.",
    phoneNumber: "+1-800-555-0199",
    relationship: "Insurance",
    isPrimary: false
  },
  {
    id: "3",
    name: "Local Guide Raj",
    phoneNumber: "+91-98765-43210",
    relationship: "Guide",
    isPrimary: false
  }
];

export default function Emergency() {
  const { location } = useLocation();
  const emergencyContacts = mockEmergencyContacts;

  const callNumber = (phoneNumber: string) => {
    window.open(`tel:${phoneNumber}`, "_self");
  };

  const formatLocation = () => {
    if (!location) return "Detecting location...";
    return `Near ${location.address}\nCoordinates: ${location.lat.toFixed(4)}° N, ${location.lng.toFixed(4)}° E\nAccuracy: ±${location.accuracy} meters`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 pb-24" data-testid="emergency-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto shadow-xl animate-pulse">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full animate-ping opacity-30"></div>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Emergency Services</h1>
        <p className="text-slate-600">Immediate help is just one tap away</p>
      </div>

      {/* Emergency Actions */}
      <div className="space-y-4 mb-8" data-testid="emergency-actions">
        <button
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-2xl font-semibold flex items-center justify-center gap-4 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          onClick={() => callNumber("100")}
          data-testid="button-call-police"
        >
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span>Call Police (100)</span>
        </button>

        <button
          className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 px-6 rounded-2xl font-semibold flex items-center justify-center gap-4 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          onClick={() => callNumber("108")}
          data-testid="button-call-medical"
        >
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13H14a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <span>Medical Emergency (108)</span>
        </button>
      </div>

      {/* Current Location Status */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 mb-6" data-testid="location-status">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="font-semibold text-slate-800">Current Location</h3>
          <div className="ml-auto">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-4">
          <div className="text-sm text-slate-700 whitespace-pre-line font-mono" data-testid="location-details">
            {formatLocation()}
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 text-xs text-slate-500">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span>Location automatically shared with emergency services</span>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden" data-testid="emergency-contacts">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-800">Emergency Contacts</h3>
          </div>
        </div>

        {emergencyContacts.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
            <h4 className="font-medium text-slate-600 mb-2">No Emergency Contacts</h4>
            <p className="text-sm text-slate-500">Add emergency contacts in your profile for quick access</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {emergencyContacts.map((contact) => (
              <div key={contact.id} className="p-6 hover:bg-slate-50 transition-colors" data-testid={`contact-${contact.id}`}>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${contact.relationship === "Insurance"
                      ? "bg-purple-100"
                      : contact.isPrimary
                        ? "bg-emerald-100"
                        : "bg-blue-100"
                      }`}>
                      <svg className={`w-6 h-6 ${contact.relationship === "Insurance"
                        ? "text-purple-600"
                        : contact.isPrimary
                          ? "text-emerald-600"
                          : "text-blue-600"
                        }`} fill="currentColor" viewBox="0 0 20 20">
                        {contact.relationship === "Insurance" ? (
                          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2v8h12V6H4z" clipRule="evenodd" />
                        ) : (
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        )}
                      </svg>
                    </div>
                    {contact.isPrimary && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-slate-800 text-sm truncate">{contact.name}</h4>
                      {contact.isPrimary && (
                        <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">Primary</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mb-1">{contact.relationship}</p>
                    <p className="text-sm text-slate-600 font-mono">{contact.phoneNumber}</p>
                  </div>

                  <button
                    onClick={() => callNumber(contact.phoneNumber)}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md transition-all duration-200 hover:scale-105 active:scale-95 ${contact.isPrimary
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                      }`}
                    data-testid={`button-call-${contact.id}`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}