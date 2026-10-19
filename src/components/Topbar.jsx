import React from "react";
import { Menu, Search, Bell, ChevronDown } from "lucide-react";
import Brand from "./Brand.jsx";

export default function Topbar({ onMenu, pageTitle }) {
  return (
    <header className="topbar">
      <button className="icon-button mobile-menu" onClick={onMenu} aria-label="Open navigation"><Menu size={21} /></button>
      <div className="mobile-brand"><Brand /></div>
      <div className="breadcrumb"><span>Workspace</span><b>/</b><strong>{pageTitle}</strong></div>
      <div className="topbar-actions">
        <label className="search-box"><Search size={16} /><input placeholder="Search anything..." aria-label="Search" /></label>
        <button className="icon-button notification-button" aria-label="Notifications"><Bell size={18} /><i /></button>
        <div className="top-user"><div className="avatar">DE</div><span>Daniel Edjang</span><ChevronDown size={14} /></div>
      </div>
    </header>
  );
}
