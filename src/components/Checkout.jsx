import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Truck, CreditCard, LoaderCircle, PackageCheck } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";
import FlyingCar from "./FlyingCar.jsx";

const initialShipping = { fullName: "", email: "", phone: "", address: "", city: "Port Harcourt", state: "Rivers", postalCode: "", notes: "" };

export default function Checkout({ cart, subtotal, shipping, setShipping, onSuccess, setPage }) {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [orderId, setOrderId] = useState("");
  const data = { ...initialShipping, ...shipping };
  const update = e => setShipping(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const validate = () => {
    const next = {};
    if (!data.fullName.trim()) next.fullName = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = "Enter a valid email address.";
    if (!/^[+]?[\d\s()-]{7,18}$/.test(data.phone)) next.phone = "Enter a valid phone number.";
    if (!data.address.trim()) next.address = "Enter your delivery address.";
    if (!data.city.trim()) next.city = "Enter your city.";
    if (!data.state.trim()) next.state = "Select your state.";
    if (step === 1) { setErrors(next); return Object.keys(next).length === 0; }
    return true;
  };
  const placeOrder = async () => {
    if (!validate()) { setStep(1); return; }
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const id = `DC-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    setOrderId(id);
    setLoading(false);
    setDone(true);
    onSuccess({ id, items: cart, shipping: data, total: subtotal });
  };
  if (done) return <div className="page-content"><div className="success-screen"><div className="success-check"><Check size={36} /></div><div className="eyebrow">ORDER CONFIRMED</div><h2>Your vision is now in motion.</h2><p>Thanks for building with Dcraftcart. Your custom order has been recorded for this demo.</p><div className="order-number"><span>ORDER REFERENCE</span><b>{orderId}</b></div><div className="success-vehicle"><FlyingCar color="#078bff" /></div><div className="success-actions"><button className="button button-primary" onClick={() => setPage("orders")}>View order details <ArrowRight size={16} /></button><button className="button button-ghost" onClick={() => setPage("customizer")}>Create another build</button></div><small className="demo-disclaimer">Demo experience · No payment has been taken.</small></div></div>;
  return <div className="page-content">
    <SectionHeading eyebrow="CHECKOUT" title="Let's get your build to you." description="A few details, then one final review." />
    {cart.length === 0 ? <div className="empty-state"><div className="empty-icon"><PackageCheck size={30} /></div><h3>There's nothing to check out yet.</h3><p>Add a custom build to your cart before continuing.</p><button className="button button-primary" onClick={() => setPage("customizer")}>Customize a build</button></div> :
    <div className="checkout-layout">
      <div className="checkout-main">
        <div className="checkout-steps"><div className={`checkout-step ${step >= 1 ? "current" : ""}`}><span>{step > 1 ? <Check size={14} /> : "1"}</span><div><b>Shipping</b><small>Delivery details</small></div></div><i className={step > 1 ? "completed" : ""} /><div className={`checkout-step ${step === 2 ? "current" : ""}`}><span>2</span><div><b>Review</b><small>Confirm your order</small></div></div></div>
        {step === 1 ? <div className="form-card"><div className="form-card-heading"><div className="form-icon"><Truck size={18} /></div><div><h3>Shipping information</h3><p>Where should we deliver your custom build?</p></div></div><div className="form-grid">
          <label className="field full-field">Full name<input name="fullName" value={data.fullName} onChange={update} placeholder="e.g. Daniel Edjang" />{errors.fullName && <small className="field-error">{errors.fullName}</small>}</label>
          <label className="field">Email address<input name="email" type="email" value={data.email} onChange={update} placeholder="you@example.com" />{errors.email && <small className="field-error">{errors.email}</small>}</label>
          <label className="field">Phone number<input name="phone" type="tel" value={data.phone} onChange={update} placeholder="+234 801 234 5678" />{errors.phone && <small className="field-error">{errors.phone}</small>}</label>
          <label className="field full-field">Delivery address<input name="address" value={data.address} onChange={update} placeholder="House number, street, area" />{errors.address && <small className="field-error">{errors.address}</small>}</label>
          <label className="field">City<input name="city" value={data.city} onChange={update} placeholder="Your city" />{errors.city && <small className="field-error">{errors.city}</small>}</label>
          <label className="field">State<select name="state" value={data.state} onChange={update}><option>Rivers</option><option>Lagos</option><option>Abuja FCT</option><option>Oyo</option><option>Enugu</option><option>Kano</option><option>Delta</option><option>Other</option></select>{errors.state && <small className="field-error">{errors.state}</small>}</label>
          <label className="field">Postal code <span className="optional">(optional)</span><input name="postalCode" value={data.postalCode} onChange={update} placeholder="500001" /></label>
          <label className="field full-field">Delivery notes <span className="optional">(optional)</span><textarea name="notes" value={data.notes} onChange={update} placeholder="Anything we should know?" rows="3" /></label>
        </div><div className="form-actions"><button className="button button-ghost" onClick={() => setPage("cart")}><ArrowLeft size={15} /> Back to cart</button><button className="button button-primary" onClick={() => { if (validate()) setStep(2); }}>Review order <ArrowRight size={16} /></button></div></div> :
        <div className="form-card"><div className="form-card-heading"><div className="form-icon"><CreditCard size={18} /></div><div><h3>Review your order</h3><p>Check the details below before placing your order.</p></div></div><div className="review-items">{cart.map(item => <div className="review-item" key={item.id}><div className="review-thumb"><FlyingCar compact color={item.colorHex} /></div><div className="review-item-copy"><b>{item.name}</b><small>{item.color} · {item.interior} · Qty {item.quantity}</small></div><strong>${(item.price * item.quantity).toLocaleString()}</strong></div>)}</div><div className="review-shipping"><div className="review-title"><b>Delivering to</b><button className="text-button" onClick={() => setStep(1)}>Edit details</button></div><p><b>{data.fullName}</b><br />{data.address}, {data.city}, {data.state}<br />{data.phone} · {data.email}</p></div><div className="review-total"><span>Total</span><b>${subtotal.toLocaleString()}</b></div><div className="form-actions"><button className="button button-ghost" onClick={() => setStep(1)}><ArrowLeft size={15} /> Back</button><button className="button button-primary" disabled={loading} onClick={placeOrder}>{loading ? <><LoaderCircle className="spin" size={16} /> Processing order...</> : <>Place demo order <ArrowRight size={16} /></>}</button></div>{loading && <div className="processing-note"><span className="live-dot" /> Securing your configuration and preparing your order…</div>}</div>}
      </div>
      <aside className="checkout-summary"><div className="summary-art"><FlyingCar color="#078bff" compact /></div><div className="summary-title"><h3>Order summary</h3><span>{cart.reduce((n, item) => n + item.quantity, 0)} item(s)</span></div>{cart.map(item => <div className="summary-line" key={item.id}><span>{item.name} × {item.quantity}</span><b>${(item.price * item.quantity).toLocaleString()}</b></div>)}<div className="summary-divider" /><div className="summary-line summary-total"><span>Subtotal</span><b>${subtotal.toLocaleString()}</b></div><div className="summary-line"><span>Shipping</span><b className="green-text">Complimentary</b></div><div className="summary-line"><span>Taxes</span><b>Included</b></div><div className="summary-divider" /><div className="summary-line summary-total"><span>Total due</span><b>${subtotal.toLocaleString()}</b></div><div className="safe-note"><ShieldCheck size={16} /><span>Encrypted, private, and secure by design.</span></div></aside>
    </div>}
  </div>;
}
