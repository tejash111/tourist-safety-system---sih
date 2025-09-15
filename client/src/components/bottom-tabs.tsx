import { useLocation, Link } from "react-router-dom";
import { Home, AlertTriangle, Map, User, Settings } from "lucide-react";

const tabs = [
  { id: "home", path: "/", icon: Home, label: "Home" },
  { id: "emergency", path: "/emergency", icon: AlertTriangle, label: "Emergency" },
  { id: "map", path: "/map", icon: Map, label: "Map" },
  { id: "profile", path: "/profile", icon: User, label: "Profile" },
  { id: "settings", path: "/settings", icon: Settings, label: "Settings" },
];

export default function BottomTabs() {
  const location = useLocation();

  return (
    <div className="bottom-tabs" data-testid="bottom-tabs">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        const IconComponent = tab.icon;
        return (
          <Link key={tab.id} to={tab.path}>
            <div
              className={`tab-item ${isActive ? "active" : "inactive"}`}
              data-testid={`tab-${tab.id}`}
            >
              <IconComponent className="tab-icon w-5 h-5" />
              <span className="tab-label">{tab.label}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
