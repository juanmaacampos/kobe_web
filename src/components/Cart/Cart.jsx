import React, { useState } from 'react';
import { MdClose, MdShoppingBag, MdArrowBack } from 'react-icons/md';
import { useCart } from '../../context/CartContext.jsx';
import { useBusinessContact } from '../../hooks/useBusinessContact.js';
import { buildCartOrderMessage } from '../../utils/whatsapp.js';
import kobeLogo from '../../assets/img/kobe_logo_white.webp';
import './cart.css';

const PAYMENT_LABELS = { efectivo: 'Efectivo', tarjeta: 'Tarjeta', transferencia: 'Transferencia' };

const ItemImg = ({ src, alt }) => {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className="cart-item__img-placeholder">
        <img src={kobeLogo} alt="" style={{ width: 28, opacity: 0.35 }} />
      </div>
    );
  }
  return <img src={src} alt={alt} className="cart-item__img" onError={() => setFailed(true)} />;
};

const Cart = () => {
  const { items, isCartOpen, closeCart, updateQty, removeItem, clearCart } = useCart();
  const { whatsAppHref } = useBusinessContact();

  const [step, setStep] = useState('items'); // 'items' | 'form'
  const [name, setName] = useState('');
  const [delivery, setDelivery] = useState('local');
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('');

  const totalItems = items.reduce((s, i) => s + i.qty, 0);

  const parsePrice = (str) => {
    if (!str) return 0;
    const cleaned = String(str).replace(/[^0-9,.-]/g, '');
    const normalized = cleaned.replace(/\./g, '').replace(',', '.');
    const n = parseFloat(normalized);
    return isNaN(n) ? 0 : n;
  };

  const totalPrice = items.reduce((sum, i) => sum + parsePrice(i.price) * i.qty, 0);
  const formatPrice = (n) =>
    '$' + n.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const isFormValid = name.trim() && payment && (delivery === 'local' || address.trim());

  const handleClose = () => {
    closeCart();
    setStep('items');
  };

  const handleOrder = () => {
    if (!isFormValid) return;
    const details = [
      `👤 Nombre: ${name.trim()}`,
      delivery === 'local' ? '📍 Modalidad: Retiro en local' : `🚚 Modalidad: Envío a ${address.trim()}`,
      `💳 Pago: ${PAYMENT_LABELS[payment]}`,
      `💰 Total estimado: ${formatPrice(totalPrice)}`,
    ].join('\n');
    const message = buildCartOrderMessage(items, details);
    const base = whatsAppHref || 'https://api.whatsapp.com/send/?phone=';
    const url = base.includes('?')
      ? `${base.split('&text=')[0]}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`
      : `${base}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    clearCart();
    handleClose();
    setName('');
    setDelivery('local');
    setAddress('');
    setPayment('');
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay${isCartOpen ? ' cart-overlay--visible' : ''}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={`cart-panel${isCartOpen ? ' cart-panel--open' : ''}`}
        aria-label="Carrito de pedido"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="cart-header">
          <div className="cart-header__left">
            {step === 'form' && (
              <button className="cart-header__back" onClick={() => setStep('items')} aria-label="Volver" type="button">
                <MdArrowBack />
              </button>
            )}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
              <h2 className="cart-header__title">{step === 'form' ? 'Tu pedido' : 'Pedido'}</h2>
              {step === 'items' && totalItems > 0 && (
                <span className="cart-header__count">{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
              )}
            </div>
          </div>
          <button className="cart-header__close" onClick={handleClose} aria-label="Cerrar pedido" type="button">
            <MdClose />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="cart-empty">
            <MdShoppingBag className="cart-empty__icon" />
            <span className="cart-empty__text">Tu pedido está vacío</span>
          </div>
        ) : step === 'items' ? (
          /* ── Step 1: Item list ── */
          <div className="cart-body">
            <ul className="cart-items" role="list">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <ItemImg src={item.img} alt={item.name} />
                  <div className="cart-item__body">
                    <p className="cart-item__name">{item.name}</p>
                    <span className="cart-item__price">{item.price}</span>
                  </div>
                  <div className="cart-item__controls">
                    <button className="cart-item__qty-btn" onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Reducir cantidad" type="button">−</button>
                    <span className="cart-item__qty">{item.qty}</span>
                    <button className="cart-item__qty-btn" onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Aumentar cantidad" type="button">+</button>
                    <button className="cart-item__remove" onClick={() => removeItem(item.id)} aria-label={`Eliminar ${item.name}`} type="button"><MdClose /></button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-total-row">
              <span className="cart-total-label">Total estimado</span>
              <span className="cart-total-value">{formatPrice(totalPrice)}</span>
            </div>

            <div className="cart-actions">
              <button className="cart-footer__cta cart-footer__cta--primary" onClick={() => setStep('form')} type="button">
                <span>Proceder con el pedido</span>
              </button>
              <button className="cart-footer__clear" onClick={clearCart} type="button">
                Vaciar pedido
              </button>
            </div>
          </div>
        ) : (
          /* ── Step 2: Order form ── */
          <div className="cart-body">
            <div className="cart-form-scroll">
            {/* Order summary (compact) */}
            <div className="cart-summary">
              {items.map((item) => (
                <div key={item.id} className="cart-summary__row">
                  <span className="cart-summary__name">{item.name}</span>
                  <span className="cart-summary__meta">x{item.qty} · {item.price}</span>
                </div>
              ))}
              <div className="cart-summary__total">
                <span>Total estimado</span>
                <span className="cart-summary__total-val">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            {/* Form */}
            <div className="cart-form">
              <div className="cart-form__field">
                <label className="cart-form__label" htmlFor="cart-name">Nombre</label>
                <input
                  id="cart-name"
                  className="cart-form__input"
                  type="text"
                  placeholder="Tu nombre"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  autoComplete="given-name"
                />
              </div>

              <div className="cart-form__field">
                <span className="cart-form__label">Modalidad</span>
                <div className="cart-form__toggle">
                  <button type="button" className={`cart-form__toggle-btn${delivery === 'local' ? ' cart-form__toggle-btn--active' : ''}`} onClick={() => setDelivery('local')}>Retiro en local</button>
                  <button type="button" className={`cart-form__toggle-btn${delivery === 'envio' ? ' cart-form__toggle-btn--active' : ''}`} onClick={() => setDelivery('envio')}>Envío</button>
                </div>
              </div>

              {delivery === 'envio' && (
                <div className="cart-form__field cart-form__field--indent">
                  <label className="cart-form__label" htmlFor="cart-address">Dirección</label>
                  <input
                    id="cart-address"
                    className="cart-form__input"
                    type="text"
                    placeholder="Calle y número"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    autoComplete="street-address"
                  />
                </div>
              )}

              <div className="cart-form__field">
                <span className="cart-form__label">Forma de pago</span>
                <div className="cart-form__toggle cart-form__toggle--3">
                  {Object.entries(PAYMENT_LABELS).map(([key, label]) => (
                    <button key={key} type="button" className={`cart-form__toggle-btn${payment === key ? ' cart-form__toggle-btn--active' : ''}`} onClick={() => setPayment(key)}>{label}</button>
                  ))}
                </div>
              </div>
            </div>

            </div>{/* end cart-form-scroll */}

            <div className="cart-actions">
              <button
                className={`cart-footer__cta${!isFormValid ? ' cart-footer__cta--disabled' : ''}`}
                onClick={handleOrder}
                type="button"
                disabled={!isFormValid}
              >
                <span>Enviar pedido por WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Cart;
