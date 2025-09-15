export interface Tourist {
  id: string;
  fullName: string;
  nationality: string;
  digitalId: string;
  validUntil: Date | string;
  safetyScore: number;
  profilePhoto?: string;
  currentLocation?: {
    address: string;
    lat: number;
    lng: number;
  };
  itinerary?: string;
  hotelInfo?: string;
  guideContact?: string;
  passportNumber: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phoneNumber: string;
  relationship: string;
  isPrimary: boolean;
}

export interface Activity {
  id: string;
  activityType: string;
  description: string;
  timestamp: string;
  riskLevel?: 'safe' | 'moderate' | 'high';
}
