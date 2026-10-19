import React, { useEffect, useState } from "react";
import Brand from "./Brand.jsx";
import { Sparkles } from "lucide-react";

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const timer = setInterval(() => {
      const next = Math.min(100, Math.round(((Date.now() - start) / 1500) * 100));
      setProgress(next);
      if (next >= 100) {
        clearInterval(timer);
        setTimeout(onComplete, 250);
      }
    }, 35);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="splash-screen">
      <div className="splash-grid" />
      <div className="splash-content">
        <Brand />
        <div className="splash-car" aria-hidden="true">
          <div className="car-glow" />
          <div className="flying-car">
            <span className="car-wing wing-left" />
            <span className="car-wing wing-right" />
            <span className="car-body" />
            <span className="car-canopy" />
            <span className="car-light" />
            <span className="car-thruster thruster-left" />
            <span className="car-thruster thruster-right" />
          </div>
        </div>
        <p className="eyebrow"><Sparkles size={14} /> YOUR VISION. RE-ENGINEERED.</p>
        <h1>Build your dream.<br /><span>Make it yours.</span></h1>
        <p className="splash-subtitle">A new dimension of personal customization.</p>
        <div className="loading-row"><span>Preparing your experience</span><b>{progress}%</b></div>
        <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
      </div>
      <div className="splash-footer">DESIGN IT · CUSTOMIZE IT · OWN IT</div>
    </div>
  );
}
