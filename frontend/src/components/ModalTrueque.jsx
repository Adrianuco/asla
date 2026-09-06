import { useState } from 'react';
import { IconoWhatsApp, IconoTrueque, IconoUbicacion } from '../iconos';

const ModalTrueque = ({ product, onClose, onSent }) => {
  const [offer, setOffer] = useState('');
  const [location, setLocation] = useState(product?.location || '');
  const [message, setMessage] = useState('');

  if (!product) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!offer.trim()) return;

    const rawPhone = product.producerPhone || product.phone || '';
    const digits = String(rawPhone).replace(/\D/g, '');
    const phone = digits.length === 8 ? '505' + digits : (digits.length === 11 && digits.startsWith('505') ? digits : (digits || '50588991122'));

    const whatsappText = encodeURIComponent(
      `¡Hola Doña ${product.producer}! 🌾🤝\n` +
      `Te contacto desde la aplicación *Asla* con una propuesta de *Trueque Solidario*:\n\n` +
      `• *Producto de interés:* ${product.title}\n` +
      `• *¿Qué ofrezco en trueque?:* ${offer.trim()}\n` +
      `• *Lugar o comunidad de encuentro:* ${location.trim() || product.location || 'Nicaragua'}\n` +
      (message.trim() ? `• *Mensaje adicional:* "${message.trim()}"\n\n` : '\n') +
      `¿Tenés disponibilidad para coordinar este intercambio?`
    );

    // Abrir WhatsApp con la información compilada
    window.open(`https://wa.me/${phone}?text=${whatsappText}`, '_blank');

    if (onSent) {
      onSent(product);
    }
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet modal-trueque-sheet" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        <div className="modal-body trueque-modal-content">
          <div className="trueque-modal-header">
            <div className="trueque-icon-circle">
              <IconoTrueque size={22} color="#E81E73" />
            </div>
            <div>
              <h3 className="trueque-modal-title">Propuesta de Trueque</h3>
              <p className="trueque-modal-subtitle">Comercio solidario directo entre productoras</p>
            </div>
          </div>

          {/*Resumen del Producto a Intercambiar */}
          <div className="trueque-target-card">
            <img src={product.image} alt={product.title} className="trueque-target-thumb" />
            <div className="trueque-target-info">
              <span className="trueque-target-label">Intercambias por:</span>
              <h4 className="trueque-target-name">{product.title}</h4>
              <div className="trueque-target-meta">
                <span>{product.producer}</span>
                <span>•</span>
                <span className="trueque-loc">
                  <IconoUbicacion size={12} color="#64748B" />
                  {product.location}
                </span>
              </div>
            </div>
          </div>

          {/* Formulario de Llenado de Información */}
          <form onSubmit={handleSubmit} className="trueque-form">
            <div className="form-group">
              <label htmlFor="trueque-offer-input">
                ¿Qué producto o insumo ofreces? <span className="required-star">*</span>
              </label>
              <input
                id="trueque-offer-input"
                type="text"
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                placeholder="Ej. 5 lbs de frijol rojo, abono orgánico, semillas..."
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="trueque-location-input">
                Lugar o comunidad de encuentro: <span className="required-star">*</span>
              </label>
              <input
                id="trueque-location-input"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ej. Plaza de San Marcos / Finca familiar..."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="trueque-message-input">
                Mensaje adicional (opcional):
              </label>
              <textarea
                id="trueque-message-input"
                rows="2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe un mensaje o nota sobre el intercambio..."
              />
            </div>

            <button type="submit" className="modal-btn btn-trueque-whatsapp-submit">
              <IconoWhatsApp size={22} color="#FFFFFF" />
              <span>Enviar Propuesta por WhatsApp</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalTrueque;
