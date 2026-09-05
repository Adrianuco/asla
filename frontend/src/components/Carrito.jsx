import { useMemo } from 'react';
import {
  IconoRegresar,
  IconoWhatsApp,
  IconoCarrito,
  IconoPlantaMaceta,
  IconoUbicacion,
} from '../iconos';

const Carrito = ({
  cart = [],
  onBack = () => {},
  onUpdateQuantity = () => {},
  onRemoveItem = () => {},
  onClearCart = () => {},
  onOpenProduct = () => {},
}) => {
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Agrupar productos del carrito por Productora
  const producerGroups = useMemo(() => {
    const groups = {};
    cart.forEach((item) => {
      const producerName = item.producer || 'Productora Solidaria';
      if (!groups[producerName]) {
        groups[producerName] = {
          producer: producerName,
          location: item.location || 'Nicaragua',
          phone: item.phone || '50588991122',
          items: [],
          subtotal: 0,
          totalQty: 0,
        };
      }
      groups[producerName].items.push(item);
      groups[producerName].subtotal += item.price * item.quantity;
      groups[producerName].totalQty += item.quantity;
    });
    return Object.values(groups);
  }, [cart]);

  // Enviar pedido a la productora 
  const handleWhatsAppProducerOrder = (group) => {
    const phone = group.phone || '505........';
    const itemsList = group.items
      .map(
        (item) =>
          `• *${item.quantity}x ${item.title}* (C$ ${item.price} c/u) = C$ ${item.price * item.quantity}`
      )
      .join('\n');

    const text = encodeURIComponent(
      `¡Hola Doña ${group.producer}! 🌾\n` +
      `Te contacto desde la aplicación *Asla* para realizar el siguiente pedido de tus cosechas:\n\n` +
      `${itemsList}\n\n` +
      `*Total del pedido: C$ ${group.subtotal}*\n` +
      `📍 *Comunidad / Ubicación:* ${group.location}\n\n` +
      `¿Tenés disponibilidad para coordinar la entrega o trueque solidario?`
    );

    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  // Enviar pedido completo a la Red de Productoras
  const handleWhatsAppCheckoutAll = () => {
    if (cart.length === 0) return;

    let itemsText = cart
      .map(
        (item) =>
          `• ${item.quantity}x ${item.title} (C$ ${item.price * item.quantity}) - Productora: ${item.producer}`
      )
      .join('\n');
    const phone = '50588991122';
    const text = encodeURIComponent(
      `¡Hola Red de Productoras Asla! 🌾🛒\n` +
      `Deseo coordinar la compra de los siguientes productos de mi carrito:\n\n` +
      `${itemsText}\n\n` +
      `*Total a pagar: C$ ${totalAmount}*\n\n` +
      `¿Me podrían confirmar la disponibilidad y el punto de encuentro?`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <div className="cart-screen-container animate-fade-in">
      {/* Barra Superior del Carrito */}
      <div className="cart-top-bar">
        <button
          type="button"
          className="cart-back-btn"
          onClick={onBack}
          aria-label="Regresar"
        >
          <IconoRegresar size={22} color="#FFFFFF" strokeWidth={3} />
        </button>

        <h1 className="cart-top-title">Carrito de Compras</h1>

        <span className="cart-count-badge">
          {totalItemsCount} {totalItemsCount === 1 ? 'ítem' : 'ítems'}
        </span>
      </div>

      <div className="cart-content-body">
        {cart.length === 0 ? (
          /* Estado Vacío */
          <div className="cart-empty-view animate-fade-in">
            <span className="cart-empty-icon">
              <IconoCarrito size={52} color="#94A3B8" />
            </span>
            <h2 className="cart-empty-title">Tu carrito está vacío</h2>
            <p className="cart-empty-subtitle">
              Explorá las cosechas frescas de nuestras productoras nicaragüenses y agregá tus productos favoritos.
            </p>
            <button
              type="button"
              className="cart-explore-btn"
              onClick={onBack}
            >
              Explorar Cosechas
            </button>
          </div>
        ) : (
          <>
            {/* Si hay más de una productora, se muestre un avis */}
            {producerGroups.length > 1 && (
              <div className="cart-multi-producer-alert">
                <span>Tenés productos de <strong>{producerGroups.length} productoras</strong> diferentes. Podés enviar el pedido a cada una por separado para coordinar directamente.</span>
              </div>
            )}

            {/* Lista de Grupos por Productora */}
            <div className="cart-producer-groups-list">
              {producerGroups.map((group) => (
                <div key={group.producer} className="cart-producer-group-card">
                  <div className="cart-producer-group-header">
                    <div className="cart-producer-header-info">
                      <div className="cart-producer-badge-icon">
                        <IconoPlantaMaceta size={18} color="#27C064" />
                      </div>
                      <div>
                        <h2 className="cart-producer-name">
                          Productora: <strong>{group.producer}</strong>
                        </h2>
                        <div className="cart-producer-location">
                          <IconoUbicacion size={12} color="#64748B" />
                          <span>{group.location}</span>
                        </div>
                      </div>
                    </div>

                    <span className="cart-producer-items-count">
                      {group.items.length} {group.items.length === 1 ? 'producto' : 'productos'}
                    </span>
                  </div>

                  {/* Lista de Productos de esta Productora */}
                  <div className="cart-producer-items-list">
                    {group.items.map((item) => {
                      const itemSubtotal = item.price * item.quantity;
                      return (
                        <div key={item.id} className="cart-item-row">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="cart-item-thumb"
                            onClick={() => onOpenProduct(item)}
                          />

                          <div className="cart-item-info">
                            <h3
                              className="cart-item-title"
                              onClick={() => onOpenProduct(item)}
                            >
                              {item.title}
                            </h3>
                            <span className="cart-item-price-unit">
                              C${item.price} / {item.unit || 'Unidad'}
                            </span>

                            <div className="cart-item-controls-row">
ç                              <div className="cart-stepper">
                                <button
                                  type="button"
                                  className="cart-stepper-btn"
                                  onClick={() => onUpdateQuantity(item.id, -1)}
                                  aria-label="Disminuir"
                                >
                                  -
                                </button>
                                <span className="cart-stepper-qty">{item.quantity}</span>
                                <button
                                  type="button"
                                  className="cart-stepper-btn"
                                  onClick={() => onUpdateQuantity(item.id, 1)}
                                  aria-label="Aumentar"
                                >
                                  +
                                </button>
                              </div>

                              <span className="cart-item-subtotal-text">
                                C${itemSubtotal}
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            className="cart-item-remove-btn"
                            onClick={() => onRemoveItem(item.id)}
                            aria-label="Eliminar producto"
                          >
                            ✕
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="cart-producer-group-footer">
                    <div className="cart-producer-subtotal-row">
                      <span className="cart-producer-subtotal-label">
                        Subtotal con {group.producer.split(' ')[0]}:
                      </span>
                      <span className="cart-producer-subtotal-amount">
                        C$ {group.subtotal}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="cart-producer-whatsapp-btn"
                      onClick={() => handleWhatsAppProducerOrder(group)}
                    >
                      <IconoWhatsApp size={20} color="#FFFFFF" />
                      <span>Enviar Pedido a {group.producer.split(' ')[0]} por WhatsApp</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen Global del Carrito */}
            <div className="cart-summary-card">
              <h3 className="cart-summary-title">Resumen general del pedido</h3>

              <div className="cart-summary-row">
                <span>Total de productos</span>
                <span>{totalItemsCount} {totalItemsCount === 1 ? 'ítem' : 'ítems'}</span>
              </div>

              <div className="cart-summary-row">
                <span>Productoras seleccionadas</span>
                <span>{producerGroups.length}</span>
              </div>

              <div className="cart-summary-total-row">
                <span>Total general:</span>
                <span className="cart-total-amount">C$ {totalAmount}</span>
              </div>

              {producerGroups.length > 1 && (
                <button
                  type="button"
                  className="cart-checkout-all-whatsapp-btn"
                  onClick={handleWhatsAppCheckoutAll}
                >
                  <IconoWhatsApp className="whatsapp-main-icon" size={22} color="#FFFFFF" />
                  <span>Coordinar Todo el Pedido por WhatsApp</span>
                </button>
              )}

              <button
                type="button"
                className="cart-clear-btn"
                onClick={onClearCart}
              >
                Vaciar Carrito
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Carrito;
