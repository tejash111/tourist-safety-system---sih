import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import useLocation from "@/hooks/use-location";
import { TOURIST_ID } from "@/lib/constants";
import { AlertTriangle } from "lucide-react";

export default function PanicButton() {
  const [isActive, setIsActive] = useState(false);
  const { toast } = useToast();
  const { location } = useLocation();

  const emergencyAlertMutation = useMutation({
    mutationFn: async (alertData: any) => {
      return apiRequest("POST", "/api/emergency-alert", alertData);
    },
    onSuccess: () => {
      toast({
        title: "🚨 EMERGENCY ALERT ACTIVATED",
        description: "Help is on the way. Stay calm and stay safe.",
        variant: "destructive",
      });
      setIsActive(true);

      // Visual feedback
      setTimeout(() => setIsActive(false), 5000);
    },
    onError: () => {
      toast({
        title: "Alert Failed",
        description: "Unable to send emergency alert. Please try again.",
        variant: "destructive",
      });
    },
  });

  const triggerPanicAlert = async () => {
    const confirmed = window.confirm(
      "🚨 EMERGENCY ALERT 🚨\n\nThis will immediately:\n• Send your location to emergency contacts\n• Alert nearby police units\n• Start continuous location tracking\n\nProceed?"
    );

    if (!confirmed) return;

    const currentLocation = location || {
      lat: 25.2993,
      lng: 91.8807,
      address: "Shillong, Meghalaya, India",
      accuracy: 5,
    };

    emergencyAlertMutation.mutate({
      touristId: TOURIST_ID,
      alertType: "panic",
      location: currentLocation,
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
      {/* Ripple animation rings when active */}
      {isActive && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-16 h-16 border-2 border-red-500 rounded-full animate-ping opacity-75"></div>
          <div className="absolute w-20 h-20 border-2 border-red-400 rounded-full animate-ping opacity-50" style={{ animationDelay: '0.3s' }}></div>
          <div className="absolute w-24 h-24 border-2 border-red-300 rounded-full animate-ping opacity-25" style={{ animationDelay: '0.6s' }}></div>
        </div>
      )}

      <button
        className={`
          panic-button ${isActive ? "pulse" : ""} 
          relative w-12 h-12 rounded-full 
          bg-gradient-to-br from-red-500 to-red-600
          hover:from-red-600 hover:to-red-700
          shadow-2xl hover:shadow-red-500/50
          transform transition-all duration-200 ease-out
          hover:scale-110 active:scale-95
          focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-50
          disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
          border-2 border-red-700
          flex items-center justify-center
          backdrop-blur-sm
        `}
        onClick={triggerPanicAlert}
        disabled={emergencyAlertMutation.isPending}
        style={{
          background: isActive ? "hsl(0, 100%, 40%)" : undefined,
          animation: isActive ? "pulse 0.5s infinite" : undefined,
        }}
        data-testid="panic-button"
        aria-label="Emergency SOS Button"
      >
        {emergencyAlertMutation.isPending ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <AlertTriangle className="w-6 h-6 text-white font-bold drop-shadow-md" />
        )}

        {/* Inner glow effect */}
        <div className="absolute inset-1 rounded-full bg-white bg-opacity-10 pointer-events-none"></div>
      </button>

      {/* Status indicator when active */}
      {isActive && (
        <div className="mt-2 px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full border border-red-200 flex items-center gap-1 shadow-lg">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          Alert Active
        </div>
      )}
    </div>
  );
}