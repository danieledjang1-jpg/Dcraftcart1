import React from "react";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, ArrowLeft, ShieldCheck } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";
import FlyingCar from "./FlyingCar.jsx";

export default function Cart({ cart, setCart, subtotal, setPage, notify }) {
  const changeQty = (id, amount) => setCart(items => items.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item));
  const remove = id => { setCart(items => items.filter(item => item.id !== id)); notify("Item removed from your cart."); };
  return (
    <div className="page-content">
      <SectionHeading eyebrow="YOUR SELECTIONS" title="Your cart." description="Your custom builds, all in one place." />
      {cart.length === 0 ? <div className="empty-state"><div className="empty-icon"><ShoppingBag size={30} /></div><h3>Your cart is waiting for a great idea.</h3><p>Start with a blank canvas, choose your finishes, and create a build that feels like you.</p><button className="button button-primary" onClick={() => setPage("customizer")}>Start customizing <ArrowRight size={16} /></button></div> :
        <div className="cart-layout"><div className="cart-items">{cart.map(item => <article className="cart-item" key={item.id}><div className="cart-thumb"><FlyingCar color={item.colorHex} compact /></div><div className="cart-item-main"><span className="pill">CUSTOM BUILD</span><h3>{item.name}</h3><p>{item.color} · {item.interior}</p><button className="text-button remove-button" onClick={() => remove(item.id)}><Trash2 size={14} /> Remove</button></div><div className="cart-item-end"><b>${(item.price * item.quantity).toLocaleString()}</b><div className="quantity-control"><button onClick={() => changeQty(item.id, -1)} aria-label="Decrease quantity"><Minus size={13} /></button><span>{item.quantity}</span><button onClick={() => changeQty(item.id, 1)} aria-label="Increase quantity"><Plus size={13} /></button></div></div></article>)}
          <button className="button button-ghost" onClick={() => setPage("customizer")}><ArrowLeft size={15} /> Continue customizing</button>
        </div><aside className="order-summary"><h3>Order summary</h3><div className="summary-line"><span>Subtotal</span><b>${subtotal.toLocaleString()}</b></div><div className="summary-line"><span>Delivery</span><b className="green-text">Calculated next</b></div><div className="summary-line"><span>Taxes</span><b>At checkout</b></div><div className="summary-divider" /><div className="summary-line summary-total"><span>Estimated total</span><b>${subtotal.toLocaleString()}</b></div><button className="button button-primary button-wide" onClick={() => setPage("checkout")}>Continue to checkout <ArrowRight size={16} /></button><div className="safe-note"><ShieldCheck size={16} /><span>Secure checkout · Your details stay protected</span></div></aside></div>}
    </div>
  );
}
