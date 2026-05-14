import { useState, useEffect } from 'react';

/**
 * 🎯 MAPPER DE MENÚS KOBE
 * Mapea los menús de Firebase a la estructura de menús de Kobe (desayuno, almuerzo, bebidas)
 */

/**
 * Mapea los menús de Firebase a la estructura de menús dinámicos de Kobe
 * @param {Array} firebaseMenus - Lista de menús obtenidos de Firebase
 * @returns {Object} - Menús mapeados con IDs como keys
 */
export function mapFirebaseMenusToKobe(firebaseMenus) {
  const kobeMenus = {};

  // Mapear cada menú de Firebase
  firebaseMenus.forEach(menu => {
    // Usar el ID del menú como key
    const menuKey = menu.id;
    
    kobeMenus[menuKey] = {
      id: menu.id,
      title: menu.name, // Usar el nombre del menú
      description: menu.description || `Descubre nuestro menú ${menu.name}`, // Usar la descripción del menú
      active: menu.active !== false,
      order: menu.order || 0,
      // Mantener toda la data del menú para referencia
      menuData: menu
    };
  });

  return kobeMenus;
}

/**
 * Detecta el tipo de menú basado en el nombre de la categoría
 * @param {string} categoryName - Nombre de la categoría
 * @returns {string} - Tipo de menú (desayuno, almuerzo, bebidas)
 */
function detectMenuType(categoryName) {
  // Palabras clave para desayuno/café
  const breakfastKeywords = ['café', 'cafes', 'desayuno', 'breakfast', 'dulces', 'medialunas', 'tostadas', 'granola', 'merienda'];
  
  // Palabras clave para bebidas/cócteles
  const drinksKeywords = ['bebidas', 'cocteles', 'cocktails', 'gin', 'branca', 'fernet', 'aperitivos', 'vermú', 'drink'];
  
  // Verificar si pertenece a desayuno
  if (breakfastKeywords.some(keyword => categoryName.includes(keyword))) {
    return 'desayuno';
  }
  
  // Verificar si pertenece a bebidas
  if (drinksKeywords.some(keyword => categoryName.includes(keyword))) {
    return 'bebidas';
  }
  
  // Por defecto, todo lo demás es almuerzo
  return 'almuerzo';
}

/**
 * Obtiene el título del menú basado en el tipo
 * @param {string} menuType - Tipo de menú
 * @returns {string} - Título del menú
 */
function getMenuTitle(menuType) {
  const titles = {
    desayuno: 'Nuestro Café',
    almuerzo: 'Almuerzo/Cena',
    bebidas: 'Cócteles'
  };
  
  return titles[menuType] || 'Menú';
}

/**
 * Formatea el precio para mostrar con el símbolo de pesos
 * @param {number} price - Precio numérico
 * @returns {string} - Precio formateado
 */
function formatPrice(price) {
  if (!price || isNaN(price)) return '$0';
  
  // Si el precio viene como número, formatearlo
  if (typeof price === 'number') {
    return `$${price.toLocaleString('es-AR')}`;
  }
  
  // Si ya viene como string con formato, devolverlo tal como está
  return price.toString();
}

/**
 * Obtiene una imagen por defecto basada en el nombre de la categoría
 * @param {string} categoryName - Nombre de la categoría
 * @returns {string} - URL de imagen por defecto
 */
function getDefaultImage(categoryName) {
  // Por ahora retornamos null, pero se pueden implementar imágenes por defecto
  // basadas en palabras clave del nombre de la categoría
  return null;
}

/**
 * Hook personalizado para obtener menús de Kobe desde Firebase
 * @param {Object} menuSDK - Instancia del MenuSDK
 * @returns {Object} - Estado de los menús mapeados
 */
export function useKobeMenus(menuSDK) {
  const [kobeMenus, setKobeMenus] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!menuSDK) {
      console.log('🔄 useKobeMenus: esperando SDK...');
      return;
    }

    async function loadKobeMenus() {
      try {
        console.log('🔄 useKobeMenus: iniciando carga...');
        setLoading(true);
        setError(null);
        
        // Obtener lista de menús disponibles (no categorías)
        console.log('📋 useKobeMenus: obteniendo lista de menús...');
        const firebaseMenus = await menuSDK.getFullMenu();
        console.log('✅ useKobeMenus: menús obtenidos:', firebaseMenus);
        
        // Mapear a la estructura de Kobe
        console.log('🎯 useKobeMenus: mapeando menús...');
        const mappedMenus = mapFirebaseMenusToKobe(firebaseMenus);
        console.log('✅ useKobeMenus: menús mapeados:', mappedMenus);
        
        setKobeMenus(mappedMenus);
      } catch (err) {
        console.error('❌ Error loading Kobe menus:', err);
        setError(err.message);
      } finally {
        setLoading(false);
        console.log('🏁 useKobeMenus: carga finalizada');
      }
    }

    loadKobeMenus();
  }, [menuSDK]);

  return {
    kobeMenus,
    loading,
    error
  };
}

/**
 * Hook para obtener las categorías e items de un menú específico
 * @param {Object} menuSDK - Instancia del MenuSDK
 * @param {string} menuId - ID del menú
 * @returns {Object} - Estado de las categorías del menú
 */
export function useMenuCategories(menuSDK, menuId) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!menuSDK || !menuId) {
      setCategories([]);
      return;
    }

    async function loadMenuCategories() {
      try {
        console.log('🔄 useMenuCategories: cargando categorías para menú:', menuId);
        setLoading(true);
        setError(null);
        
        const menuCategories = await menuSDK.getMenuById(menuId);
        console.log('✅ useMenuCategories: categorías obtenidas:', menuCategories);
        
        // Mapear items a la estructura de Kobe
        const mappedCategories = menuCategories.map(category => ({
          ...category,
          items: category.items.map(item => ({
            id: item.id,
            name: item.name,
            price: formatPrice(item.price),
            desc: item.description || '',
            img: item.image || item.images?.[0]?.url || getDefaultImage(category.name),
            featured: item.featured || false,
            stock: item.stock,
            trackStock: item.trackStock || false,
            isAvailable: item.isAvailable !== false
          }))
        }));
        
        setCategories(mappedCategories);
      } catch (err) {
        console.error('❌ Error loading menu categories:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadMenuCategories();
  }, [menuSDK, menuId]);

  return {
    categories,
    loading,
    error
  };
}

export default mapFirebaseMenusToKobe;
