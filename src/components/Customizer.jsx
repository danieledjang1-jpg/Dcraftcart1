import React from "react";
import { Check, ChevronDown, Minus, Plus, RotateCcw, ShoppingBag, Zap } from "lucide-react";
import FlyingCar from "./FlyingCar.jsx";
import SectionHeading from "./SectionHeading.jsx";

const colors = [
  { name: "Midnight Black", hex: "#101a2c", price: 0 },
  { name: "Pearl White", hex: "#e9edf3", price: 500 },
  { name: "Cyber Blue", hex: "#078bff", price: 1200 },
  { name: "Solar Red", hex: "#e43b50", price: 950 },
  { name: "Forest Green", hex: "#2c9278", price: 750 },
];
const interiors = [
  { name: "Black Alcantara", detail: "Sport · recycled suede", price: 0, icon: "◈" },
  { name: "Cloud Leather", detail: "Premium · vegan leather", price: 1800, icon: "◇" },
  { name: "Arctic Tech", detail: "Performance · breathable", price: 2600, icon: "▦" },
];
const upgrades = [
  { id: "longRange", label: "Long-range battery", detail: "Up to 1,000 km range", price: 5500 },
  { id: "autopilot", label: "Autopilot suite", detail: "Advanced driver assistance", price: 3200 },
  { id: "premiumSound", label: "Immersive sound", detail: "24-speaker spatial audio", price: 1250 },
  { id: "solarRoof", label: "Solar glass roof", detail: "Integrated solar charging", price: 2100 },
];
const accessories = [
  { id: "flightKit", label: "Flight safety kit", price: 850 },
  { id: "ambient", label: "Ambient light package", price: 420 },
  { id: "careKit", label: "Premium care kit", price: 180 },
];

export default function Customizer({ config, setConfig, total, addToCart, notify }) {
  const color = colors.find(c => c.name === config.color) || colors[0];
  const update = (key, value) => setConfig(prev => ({ ...prev, [key]: value }));
  const toggle = (id, group) => setConfig(prev => ({ ...prev, [group]: { ...prev[group], [id]: !prev[group][id] } }));
  const reset = () => {
    setConfig({ color: colors[0].name, interior: interiors[0].name, upgrades: {}, accessories: {} });
    notify("Configuration reset to your starting design.");
  };
  return (
    <div className="page-content">
      <SectionHeading eyebrow="THE CONFIGURATOR" title="Make it unmistakably yours." description="Every detail, engineered around your imagination." action={<button className="button button-ghost" onClick={reset}><RotateCcw size={15} /> Reset design</button>} />
      <div className="customizer-layout">
        <section className="preview-column">
          <div className="vehicle-card">
            <div className="preview-topline"><span className="pill"><span className="live-dot" /> LIVE PREVIEW</span><span className="muted-label">MODEL DX · 2027</span></div>
            <FlyingCar color={color.hex} />
            <div className="preview-details">
              <div><span className="muted-label">YOUR BUILD</span><h3>Dcraft Aero X</h3><p>{config.color} · {config.interior}</p></div>
              <div className="preview-spec"><span>0–100 km/h</span><b>2.9 sec</b></div>
              <div className="preview-spec"><span>Flight range</span><b>800 km</b></div>
            </div>
            <div className="view-controls"><button className="view-dot selected" aria-label="Front view" /><button className="view-dot" aria-label="Side view" /><button className="view-dot" aria-label="Top view" /><span>360° interactive concept view</span></div>
          </div>
          <div className="build-note"><div className="note-icon"><Zap size={18} /></div><div><b>Built around your choices</b><p>Your price and specification update instantly as you customize.</p></div></div>
        </section>

        <section className="options-panel">
          <div className="options-header"><div><span className="muted-label">STEP 01 / 04</span><h3>Configure your Aero X</h3></div><span className="step-badge">1 of 4</span></div>
          <div className="option-section">
            <div className="option-title"><span>01</span><div><b>Exterior color</b><small>Pick your signature finish</small></div><ChevronDown size={16} /></div>
            <div className="color-options">
              {colors.map(c => <button key={c.name} className={`color-option ${config.color === c.name ? "chosen" : ""}`} onClick={() => update("color", c.name)} title={c.name} aria-label={`Choose ${c.name}`}><span style={{ background: c.hex }} />{config.color === c.name && <Check size={13} />}</button>)}
            </div>
            <div className="selected-color"><span>{color.name}</span><b>{color.price ? `+$${color.price.toLocaleString()}` : "Included"}</b></div>
          </div>
          <div className="option-section">
            <div className="option-title"><span>02</span><div><b>Interior finish</b><small>Crafted for comfort</small></div><ChevronDown size={16} /></div>
            <div className="interior-options">
              {interiors.map(item => <button key={item.name} onClick={() => update("interior", item.name)} className={`interior-option ${config.interior === item.name ? "chosen" : ""}`}><span className="interior-swatch">{item.icon}</span><span className="interior-copy"><b>{item.name}</b><small>{item.detail}</small></span><span className="interior-price">{item.price ? `+$${item.price.toLocaleString()}` : "Included"}</span></button>)}
            </div>
          </div>
          <div className="option-section">
            <div className="option-title"><span>03</span><div><b>Performance upgrades</b><small>Go beyond the standard</small></div><ChevronDown size={16} /></div>
            <div className="check-list">
              {upgrades.map(item => <label className="check-row" key={item.id}><input type="checkbox" checked={!!config.upgrades[item.id]} onChange={() => toggle(item.id, "upgrades")} /><span className="fake-check"><Check size={12} /></span><span className="check-copy"><b>{item.label}</b><small>{item.detail}</small></span><strong>+${item.price.toLocaleString()}</strong></label>)}
            </div>
          </div>
          <div className="option-section">
            <div className="option-title"><span>04</span><div><b>Accessories</b><small>Finishing touches</small></div><ChevronDown size={16} /></div>
            <div className="check-list">
              {accessories.map(item => <label className="check-row accessory-row" key={item.id}><input type="checkbox" checked={!!config.accessories[item.id]} onChange={() => toggle(item.id, "accessories")} /><span className="fake-check"><Check size={12} /></span><span className="check-copy"><b>{item.label}</b></span><strong>+${item.price.toLocaleString()}</strong></label>)}
            </div>
          </div>
          <div className="price-summary">
            <div><span className="muted-label">YOUR CONFIGURATION</span><small>Taxes and delivery calculated at checkout</small></div>
            <div className="total-price">${total.toLocaleString()}</div>
          </div>
          <button className="button button-primary button-wide" onClick={addToCart}><ShoppingBag size={17} /> Add custom build to cart <span>→</span></button>
          <p className="secure-note">⌁ Your design is saved automatically on this device.</p>
        </section>
      </div>
    </div>
  );
}
