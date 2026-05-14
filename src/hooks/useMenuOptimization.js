/**
 * 🚀 OPTIMIZACIONES PARA DROPDOWN MENU - GROVE
 * Sistema de virtualización y lazy loading para mejorar el rendimiento con muchos items
 */

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

/**
 * 📦 Hook para Virtual Scrolling - Solo renderiza items visibles
 */
export function useVirtualScroll(items, itemHeight = 128, containerHeight = 600) {
  const [scrollTop, setScrollTop] = useState(0);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });

  const totalHeight = items.length * itemHeight;
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 5, // 5 items buffer
    items.length
  );

  const visibleItems = useMemo(() => {
    return items.slice(startIndex, endIndex).map((item, index) => ({
      ...item,
      index: startIndex + index,
      offsetTop: (startIndex + index) * itemHeight
    }));
  }, [items, startIndex, endIndex, itemHeight]);

  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);

  return {
    visibleItems,
    totalHeight,
    handleScroll,
    startIndex,
    endIndex
  };
}

/**
 * 🖼️ Hook para Lazy Loading de Imágenes
 */
export function useLazyImage(src, fallback) {
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!src) {
      setImageSrc(fallback);
      setIsLoading(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const img = new Image();
          img.onload = () => {
            setImageSrc(src);
            setIsLoading(false);
            setHasError(false);
          };
          img.onerror = () => {
            setImageSrc(fallback);
            setIsLoading(false);
            setHasError(true);
          };
          img.src = src;
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Precargar imágenes 50px antes de ser visibles
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src, fallback]);

  return { imageSrc, isLoading, hasError, imgRef };
}

/**
 * 🔍 Hook para Búsqueda en Tiempo Real
 */
export function useMenuSearch(items) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  // Debounce para evitar búsquedas muy frecuentes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchTerm.trim()) {
        setFilteredItems(items);
        return;
      }

      const filtered = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.desc && item.desc.toLowerCase().includes(searchTerm.toLowerCase()))
      );

      setFilteredItems(filtered);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [searchTerm, items]);

  return { searchTerm, setSearchTerm, filteredItems };
}

/**
 * 📱 Hook para Detectar Viewport y Ajustar Rendimiento
 */
export function useViewportOptimization() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Detectar dispositivo móvil
    setIsMobile(window.innerWidth <= 768);

    // Detectar dispositivo de baja potencia
    if ('deviceMemory' in navigator) {
      setIsLowEndDevice(navigator.deviceMemory <= 2); // ≤2GB RAM
    }

    // Detectar preferencia por movimiento reducido
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile,
    isLowEndDevice,
    prefersReducedMotion,
    // Configuración de rendimiento adaptiva
    shouldUseVirtualScroll: isLowEndDevice || isMobile,
    shouldUseLazyImages: true,
    shouldReduceAnimations: prefersReducedMotion || isLowEndDevice,
    maxVisibleItems: isLowEndDevice ? 10 : isMobile ? 15 : 20
  };
}

/**
 * 💾 Hook para Cache de Categorías Expandidas
 */
export function useCategoryExpansion(menuType) {
  const [expandedCategories, setExpandedCategories] = useState(() => {
    // Recuperar estado del localStorage
    const saved = localStorage.getItem(`kobe-expanded-${menuType}`);
    return saved ? JSON.parse(saved) : new Set();
  });

  // Guardar estado en localStorage
  useEffect(() => {
    localStorage.setItem(
      `kobe-expanded-${menuType}`, 
      JSON.stringify([...expandedCategories])
    );
  }, [expandedCategories, menuType]);

  const toggleCategory = useCallback((categoryId) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  }, []);

  const isCategoryExpanded = useCallback((categoryId) => {
    return expandedCategories.has(categoryId);
  }, [expandedCategories]);

  return { toggleCategory, isCategoryExpanded, expandedCategories };
}

/**
 * 🎯 Hook Principal para Optimización del Dropdown
 */
export function useOptimizedMenuDropdown(categories, menuType) {
  const viewport = useViewportOptimization();
  const { toggleCategory, isCategoryExpanded } = useCategoryExpansion(menuType);
  
  // Calcular items totales y stats
  const menuStats = useMemo(() => {
    const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);
    const totalCategories = categories.length;
    const avgItemsPerCategory = Math.round(totalItems / totalCategories);
    
    return {
      totalItems,
      totalCategories,
      avgItemsPerCategory,
      isLargeMenu: totalItems > 50 // Considerado "grande"
    };
  }, [categories]);

  // Configuración de optimización basada en el tamaño del menú
  const optimizationConfig = useMemo(() => {
    return {
      useVirtualScroll: viewport.shouldUseVirtualScroll && menuStats.isLargeMenu,
      useLazyImages: viewport.shouldUseLazyImages,
      maxInitialItems: viewport.maxVisibleItems,
      enableSearch: menuStats.totalItems > 20,
      enableBatchRendering: menuStats.totalItems > 100,
      batchSize: 20
    };
  }, [viewport, menuStats]);

  return {
    viewport,
    menuStats,
    optimizationConfig,
    toggleCategory,
    isCategoryExpanded
  };
}

export default {
  useVirtualScroll,
  useLazyImage,
  useMenuSearch,
  useViewportOptimization,
  useCategoryExpansion,
  useOptimizedMenuDropdown
};
