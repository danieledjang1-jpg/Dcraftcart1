import React from "react";

export default function FlyingCar({ color = "#13a8ff", compact = false }) {
  return (
    <div className={`vehicle-stage ${compact ? "vehicle-compact" : ""}`}>
      <div className="vehicle-stars">
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="vehicle-horizon" />
      <div className="vehicle-platform" />
      <div className="vehicle-shadow" />
      <div className="vehicle-art" style={{ "--vehicle-color": color }}>
        <span className="vehicle-wing wing-a" />
        <span className="vehicle-wing wing-b" />
        <span className="vehicle-tail tail-a" />
        <span className="vehicle-tail tail-b" />
        <span className="vehicle-main" />
        <span className="vehicle-glass" />
        <span className="vehicle-nose" />
        <span className="vehicle-led" />
        <span className="vehicle-engine engine-a" />
        <span className="vehicle-engine engine-b" />
      </div>
      <div className="vehicle-caption">
        <span className="live-dot" /> AERO X <b>·</b> FLIGHT MODE ACTIVE
      </div>
    </div>
  );
}
