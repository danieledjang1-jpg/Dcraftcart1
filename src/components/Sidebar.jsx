import React from "react";
import { Home, SlidersHorizontal, ShoppingCart, ClipboardList, UserRound, Settings, X } from "lucide-react";
import Brand from "./Brand.jsx";

const items = [
  { id: "home", label: "Home", Icon: Home },
  { id: "customizer", label: "Customizer", Icon: SlidersHorizontal },
  { id: "cart", label: "Cart", Icon: ShoppingCart },
  { id: "orders", label: "Orders", Icon: ClipboardList },
  { id: "profile", label: "Profile", Icon: UserRound },
];

export default function Sidebar({ page, setPage, cartCount, open, close }) {
  return (
    <>
      {open && <button className="mobile-overlay" aria-label="Close menu" onClick={close} />}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand"><Brand /><button className="icon-button sidebar-close" onClick={close} aria-label="Close menu"><X size={18} /></button></div>
        <div className="sidebar-label">WORKSPACE</div>
        <nav className="side-nav">
          {items.map(({ id, label, Icon }) => (
            <button key={id} className={`nav-item ${page === id ? "active" : ""}`} onClick={() => { setPage(id); close(); }}>
              <Icon size={19} strokeWidth={1.8} /><span>{label}</span>
              {id === "cart" && cartCount > 0 && <b className="nav-count">{cartCount}</b>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-help"><span className="help-orb">✦</span><div><b>Need a hand?</b><small>Our design team can help.</small></div></div>
          <button className={`nav-item ${page === "settings" ? "active" : ""}`} onClick={() => { setPage("settings"); close(); }}><Settings size={19} /><span>Settings</span></button>
          <div className="profile-mini"><div className="avatar">DE</div><div><b>Daniel Edjang</b><small>Creator account</small></div><span className="online-dot" /></div>
        </div>
      </aside>
    </>
  );
}
