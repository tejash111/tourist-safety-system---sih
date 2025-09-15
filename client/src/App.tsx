import { Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import MobileContainer from "./components/mobile-container";
import Home from "./pages/home";
import Emergency from "./pages/emergency";
import Profile from "./pages/profile";
import Settings from "./pages/settings";
import NotFound from "./pages/not-found";
import Maps from "./pages/map";


export function App() {
  return (
    <TooltipProvider>
      <MobileContainer>
        <Routes>
          {/* Public Route */}

          {/* Protected Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/map" element={<Maps />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MobileContainer>
      <Toaster />
    </TooltipProvider>
  );
}
