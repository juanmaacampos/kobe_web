/**
 * CONFIGURACIÓN PARA MÚLTIPLES MENÚS GROOVE
 * Un solo negocio puede tener múltiples menús (ej: Almuerzo, Cena, Bebidas)
 */

export const MENU_CONFIG = {
  //Configuración de Firebase
  firebaseConfig: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  },

  //ID del Negocio Principal - Groove
  businessId: import.meta.env.VITE_FIREBASE_BUSINESS_ID,
  
  // Configuración para Múltiples Menús
  multipleMenus: {
    enabled: true,
    showMenuSelector: true,
    defaultMenuId: null, // Si es null, muestra el selector automáticamente
    
    //Configuración de UI
    ui: {
      showMenuDescriptions: true,
      menuCardStyle: "modern", // "modern" | "classic" | "minimal"
      categoryAccordion: true, // Categorías en acordeón vs lista
      showProductImages: true,
      compactMode: false // Modo compacto para pantallas pequeñas
    }
  },

  //Configuración del Carrito
  cart: {
    persistBetweenMenus: true, // Mantener carrito al cambiar de menú
    showMenuOrigin: true, // Mostrar de qué menú viene cada producto
    allowMixedMenus: true // Permitir productos de diferentes menús en el carrito
  },

  //Terminología Adaptativa - Para Groove (restaurante/café)
  terminology: {
    business: {
      restaurant: {
        menuSingular: "menú",
        menuPlural: "menús",
        itemSingular: "plato",
        itemPlural: "platos",
        categorySingular: "categoría", 
        categoryPlural: "categorías",
        cartName: "pedido",
        addToCartText: "Agregar al pedido"
      },
      store: {
        menuSingular: "catálogo",
        menuPlural: "catálogos", 
        itemSingular: "producto",
        itemPlural: "productos",
        categorySingular: "categoría",
        categoryPlural: "categorías", 
        cartName: "carrito",
        addToCartText: "Agregar al carrito"
      }
    }
  }
};

//Helper function para obtener terminología
export function getTerminology(businessType = 'restaurant') {
  return MENU_CONFIG.terminology.business[businessType] || MENU_CONFIG.terminology.business.restaurant;
}

//Compatibilidad con versión anterior
export const restaurantId = MENU_CONFIG.businessId;
