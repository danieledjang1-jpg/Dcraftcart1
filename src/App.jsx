import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Bell, ChevronRight, CircleHelp, Menu, Plus, Sparkles, WandSparkles } from "lucide-react";
import SplashScreen from "./components/SplashScreen.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";
import Customizer from "./components/Customizer.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import Orders from "./components/Orders.jsx";
import FlyingCar from "./components/FlyingCar.jsx";
import SectionHeading from "./components/SectionHeading.jsx";

const DEFAULT_CONFIG = { color: "Midnight Black", interior: "Black Alcantara", upgrades: {}, accessories: {} };
const BASE_PRICE = 120000;
const COLOR_PRICES = { "Midnight Black": 0, "Pearl White": 500, "Cyber Blue": 1200, "Solar Red": 950, "Forest Green": 750 };
const INTERIOR_PRICES = { "Black Alcantara": 0, "Cloud Leather": 1800, "Arctic Tech": 2600 };
const UPGRADE_PRICES = { longRange: 5500, autopilot: 3200, premiumSound: 1250, solarRoof: 2100 };
const ACCESSORY_PRICES = { flightKit: 850, ambient: 420, careKit: 180 };

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch (error) { console.warn(`Could not read ${key} from localStorage`, error); return initialValue; }
  });
  useEffect(() => {
    try { window.localStorage.setItem(key, JSON.stringify(value)); }
    catch (error) { console.warn(`Could not save ${key} to localStorage`, error); }
  }, [key, value]);
  return [value, setValue];
}

function getConfigPrice(config) {
  return BASE_PRICE + (COLOR_PRICES[config.color] || 0) + (INTERIOR_PRICES[config.interior] || 0)
    + Object.entries(config.upgrades || {}).reduce((sum, [key, selected]) => sum + (selected ? (UPGRADE_PRICES[key] || 0) : 0), 0)
    + Object.entries(config.accessories || {}).reduce((sum, [key, selected]) => sum + (selected ? (ACCESSORY_PRICES[key] || 0) : 0), 0);
}

const pageTitles = { home: "Overview", customizer: "Customizer", cart: "Your cart", checkout: "Checkout", orders: "Order history", profile: "Profile", settings: "Settings" };

function Home({ setPage, config, total, cartCount, ordersCount }) {
  return <div className="page-content home-content">
    <div className="welcome-row"><div><div className="eyebrow"><Sparkles size={14} /> YOUR PERSONAL DESIGN STUDIO</div><h1>Good things are <span>custom-made.</span></h1><p>Welcome back, Daniel. Ready to build something extraordinary?</p></div><div className="welcome-date">YOUR STUDIO <b>● ONLINE</b></div></div>
    <div className="hero-banner"><div className="hero-copy"><span className="hero-chip"><WandSparkles size={13} /> INTRODUCING THE NEXT ERA</span><h2>Meet the future.<br /><span>Make it yours.</span></h2><p>Meet Aero X — a new-generation electric flight concept built for people who refuse to think ordinary.</p><div className="hero-actions"><button className="button button-primary" onClick={() => setPage("customizer")}>Customize Aero X <ChevronRight size={16} /></button><button className="button button-glass" onClick={() => setPage("orders")}>Explore your orders <ArrowUpRight size={15} /></button></div><div className="hero-stats"><div><b>2.9<span>s</span></b><small>0–100 km/h</small></div><div><b>800<span>km</span></b><small>Flight range</small></div><div><b>100<span>%</span></b><small>Your vision</small></div></div></div><div className="hero-visual"><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><FlyingCar color="#078bff" /><div className="hero-floating-card"><span className="live-dot" /><div><small>LIVE CONFIGURATION</small><b>Dcraft Aero X</b></div><span className="float-price">${total.toLocaleString()}</span></div></div><div className="hero-watermark">D</div></div>
    <div className="dashboard-heading"><div><h2>Your studio at a glance</h2><p>A quick look at your design journey.</p></div><button className="text-button" onClick={() => setPage("customizer")}>Open studio <ArrowUpRight size={14} /></button></div>
    <div className="metric-grid"><button className="metric-card" onClick={() => setPage("customizer")}><span className="metric-icon blue-icon"><WandSparkles size={19} /></span><span className="metric-label">Current build</span><b>Dcraft Aero X</b><small>{config.color} · {config.interior}</small><span className="metric-link">Continue designing <ChevronRight size={14} /></span></button><button className="metric-card" onClick={() => setPage("cart")}><span className="metric-icon violet-icon"><ShoppingBagIcon /></span><span className="metric-label">Items in cart</span><b>{cartCount.toString().padStart(2, "0")} <small>item(s)</small></b><small>Ready when you are</small><span className="metric-link">Review cart <ChevronRight size={14} /></span></button><button className="metric-card" onClick={() => setPage("orders")}><span className="metric-icon green-icon"><ClipboardIcon /></span><span className="metric-label">Orders completed</span><b>{ordersCount.toString().padStart(2, "0")}</b><small>Your build history</small><span className="metric-link">View history <ChevronRight size={14} /></span></button><div className="metric-card price-metric"><span className="metric-icon orange-icon"><Sparkles size={19} /></span><span className="metric-label">Current configuration</span><b>${total.toLocaleString()}</b><small>Updates with every choice</small><span className="metric-link" onClick={() => setPage("customizer")}>View price breakdown <ChevronRight size={14} /></span></div></div>
    <div className="bottom-grid"><div className="feature-card"><div className="feature-top"><span className="eyebrow">DESIGNED FOR YOU</span><span className="feature-arrow">↗</span></div><h3>From idea to<br /><span>iconic.</span></h3><p>Choose every finish, upgrade the performance, and make your configuration uniquely yours.</p><button className="button button-primary" onClick={() => setPage("customizer")}>Start a new design <ArrowUpRight size={15} /></button><div className="feature-d"><span>D</span></div></div><div className="activity-card"><div className="activity-heading"><div><h3>Recent activity</h3><p>Your latest studio updates</p></div><span className="activity-live">LIVE</span></div><div className="activity-row"><span className="activity-icon"><WandSparkles size={16} /></span><div><b>Design studio ready</b><small>Your Aero X configuration is saved on this device.</small></div><time>Now</time></div><div className="activity-row"><span className="activity-icon"><ShoppingBagIcon /></span><div><b>Cart is ready for your build</b><small>Custom designs stay here while you explore.</small></div><time>Today</time></div><div className="activity-row"><span className="activity-icon"><CircleHelp size={16} /></span><div><b>Need a little inspiration?</b><small>Try the Cyber Blue finish with the flight safety kit.</small></div><button className="text-button" onClick={() => setPage("customizer")}>Try it</button></div></div></div>
  </div>;
}
function ShoppingBagIcon(){return <span className="simple-icon">▢</span>}
function ClipboardIcon(){return <span className="simple-icon">✓</span>}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [page, setPage] = useLocalStorage("dcraftcart-page", "home");
  const [config, setConfig] = useLocalStorage("dcraftcart-config", DEFAULT_CONFIG);
  const [cart, setCart] = useLocalStorage("dcraftcart-cart", []);
  const [shipping, setShipping] = useLocalStorage("dcraftcart-shipping", {});
  const [orders, setOrders] = useLocalStorage("dcraftcart-orders", []);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState("");
  const total = useMemo(() => getConfigPrice(config), [config]);
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const notify = useCallback(message => { setToast(message); window.setTimeout(() => setToast(""), 3000); }, []);
  const addToCart = () => {
    const id = `build-${Date.now()}`;
    const colorHex = ({ "Midnight Black": "#101a2c", "Pearl White": "#e9edf3", "Cyber Blue": "#078bff", "Solar Red": "#e43b50", "Forest Green": "#2c9278" })[config.color] || "#078bff";
    setCart(items => [...items, { id, name: "Dcraft Aero X", color: config.color, colorHex, interior: config.interior, price: total, quantity: 1, config: JSON.parse(JSON.stringify(config)) }]);
    notify("Your custom Aero X has been added to the cart.");
    setPage("cart");
  };
  const handleSuccess = order => setOrders(prev => [{ ...order, createdAt: new Date().toISOString() }, ...prev]);
  const title = pageTitles[page] || "Overview";

  return <>{showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
    <div className={`app-shell ${showSplash ? "app-hidden" : ""}`}>
      <Sidebar page={page} setPage={setPage} cartCount={cartCount} open={menuOpen} close={() => setMenuOpen(false)} />
      <main className="main-shell">
        <Topbar onMenu={() => setMenuOpen(true)} pageTitle={title} />
        {page === "home" && <Home setPage={setPage} config={config} total={total} cartCount={cartCount} ordersCount={orders.length} />}
        {page === "customizer" && <Customizer config={config} setConfig={setConfig} total={total} addToCart={addToCart} notify={notify} />}
        {page === "cart" && <Cart cart={cart} setCart={setCart} subtotal={subtotal} setPage={setPage} notify={notify} />}
        {page === "checkout" && <Checkout cart={cart} subtotal={subtotal} shipping={shipping} setShipping={setShipping} onSuccess={handleSuccess} setPage={setPage} />}
        {page === "orders" && <Orders orders={orders} setPage={setPage} />}
        {page === "profile" && <div className="page-content"><SectionHeading eyebrow="YOUR ACCOUNT" title="Creator profile." description="Your design studio identity." /><div className="profile-card"><div className="profile-large avatar">DE</div><h3>Daniel Edjang</h3><p>Creator account · Dcraftcart</p><button className="button button-primary" onClick={() => setPage("customizer")}>Back to the studio</button></div></div>}
        {page === "settings" && <div className="page-content"><SectionHeading eyebrow="PREFERENCES" title="Studio settings." description="Manage your local demo experience." /><div className="settings-card"><div><b>Saved configurations</b><p>Your design, cart, and shipping form are saved in this browser using localStorage.</p></div><button className="button button-ghost" onClick={() => { ["dcraftcart-page","dcraftcart-config","dcraftcart-cart","dcraftcart-shipping","dcraftcart-orders"].forEach(k => localStorage.removeItem(k)); setConfig(DEFAULT_CONFIG); setCart([]); setShipping({}); setOrders([]); setPage("home"); notify("Local demo data has been reset."); }}>Reset demo data</button></div></div>}
        <footer className="app-footer"><span>© 2026 Dcraftcart Studio</span><span>Made for curious minds <b>✦</b></span><span><i className="live-dot" /> All systems operational</span></footer>
      </main>
      {toast && <div className="toast"><span className="toast-check">✓</span>{toast}</div>}
    </div>
  </>;
}
