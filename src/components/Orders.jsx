import React from "react";
import { ArrowUpRight, ClipboardList, PackageCheck } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";

export default function Orders({ orders, setPage }) {
  return <div className="page-content"><SectionHeading eyebrow="YOUR ACTIVITY" title="Order history." description="Keep track of the builds you've brought to life." />
    {orders.length === 0 ? <div className="empty-state"><div className="empty-icon"><ClipboardList size={30} /></div><h3>Your next big idea starts here.</h3><p>Completed demo orders will appear here, so you can revisit their details.</p><button className="button button-primary" onClick={() => setPage("customizer")}>Design your first build</button></div> :
      <div className="orders-list">{orders.map(order => <article className="order-card" key={order.id}><div className="order-card-icon"><PackageCheck size={22} /></div><div className="order-card-copy"><span className="pill success-pill">CONFIRMED</span><h3>{order.id}</h3><p>{order.items.length} custom item(s) · {order.shipping.fullName}</p><small>{new Date(order.createdAt).toLocaleString()}</small></div><div className="order-card-total"><span>Total</span><b>${order.total.toLocaleString()}</b><button className="text-button" onClick={() => setPage("customizer")}>Build again <ArrowUpRight size={13} /></button></div></article>)}</div>}
  </div>;
}
