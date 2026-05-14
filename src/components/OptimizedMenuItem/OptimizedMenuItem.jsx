import React, { memo } from 'react';
import { MdAddShoppingCart, MdCheck } from 'react-icons/md';
import { useLazyImage } from '../hooks/useMenuOptimization.js';
import { useCart } from '../../context/CartContext.jsx';
import kobeLogo from '../../assets/img/kobe_logo_white.webp';

/**
 * 🚀 COMPONENTE ITEM OPTIMIZADO
 * Versión optimizada del item del menú con lazy loading y memoización
 */

const OptimizedMenuItem = memo(({
  item,
  onImageClick,
  className = '',
  style = {},
  showStock = true,
  imageSize = 'normal' // 'small', 'normal', 'large'
}) => {
  const { imageSrc, isLoading, hasError, imgRef } = useLazyImage(
    item.img, 
    kobeLogo
  );
  const { addItem, items } = useCart();
  const inCart = items.some((i) => i.id === item.id);

  // Configuración de tamaños de imagen
  const imageSizes = {
    small: { width: 60, height: 60 },
    normal: { width: 80, height: 80 },
    large: { width: 120, height: 120 }
  };

  const currentImageSize = imageSizes[imageSize] || imageSizes.normal;

  return (
    <li className={`md-item optimized ${className}`} style={style}>
      <div className="md-item-media">
        <div 
          className="md-item-image-container"
          style={currentImageSize}
        >
          {isLoading ? (
            // Skeleton loader mientras carga la imagen
            <div className="image-skeleton">
              <div className="skeleton-shimmer"></div>
            </div>
          ) : (
            <img
              ref={imgRef}
              src={imageSrc}
              alt={item.name}
              className={`md-item-image ${!item.img || hasError ? 'placeholder' : ''}`}
              style={{ 
                cursor: item.img && !hasError ? 'pointer' : 'default',
                ...currentImageSize
              }}
              onClick={() => item.img && !hasError && onImageClick?.(item)}
              loading="lazy" // Lazy loading nativo del navegador
            />
          )}
        </div>
      </div>
      
      <div className="md-item-body">
        <div className="md-item-row">
          <h4 className="md-item-name">{item.name}</h4>
          <span className="md-item-price">{item.price}</span>
        </div>
        
        {item.desc && (
          <p className="md-item-desc">{item.desc}</p>
        )}
        
        {/* Stock information */}
        {showStock && item.trackStock && (
          <div className="md-item-stock">
            {item.stock > 0 ? (
              <span className={`stock-indicator ${item.stock <= 5 ? 'low' : 'normal'}`}>
                {item.stock <= 5 ? `Quedan ${item.stock}` : 'Disponible'}
              </span>
            ) : (
              <span className="stock-indicator out">Sin stock</span>
            )}
          </div>
        )}

        <div className="md-item-cart-row">
          <button
            className={`md-item-add-btn${inCart ? ' md-item-add-btn--added' : ''}`}
            onClick={() => addItem({ id: item.id, name: item.name, price: item.price, img: item.img || null })}
            type="button"
            aria-label={`Agregar ${item.name} al carrito`}
          >
            {inCart ? <MdCheck aria-hidden="true" /> : <MdAddShoppingCart aria-hidden="true" />}
            <span>{inCart ? 'Agregado' : 'Agregar'}</span>
          </button>
        </div>
      </div>
    </li>
  );
});

OptimizedMenuItem.displayName = 'OptimizedMenuItem';

export default OptimizedMenuItem;
