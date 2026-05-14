/**
 * 🎛️ CONFIGURACIÓN GLOBAL DE OPTIMIZACIÓN FIREBASE
 * Ajusta estos valores según tus necesidades de costo vs funcionalidad
 */

export const FIREBASE_OPTIMIZATION_CONFIG = {
  // 🎯 CONFIGURACIÓN PRINCIPAL
  mode: 'BALANCED', // 'MAX_SAVINGS', 'BALANCED', 'REALTIME'
  
  // 💾 CONFIGURACIÓN DE CACHE
  cache: {
    enabled: true,
    defaultTTL: 15 * 60 * 1000,  // 15 minutos por defecto
    businessInfoTTL: 30 * 60 * 1000,  // 30 min (cambia poco)
    menuTTL: 15 * 60 * 1000,          // 15 min (moderado)
    announcementsTTL: 5 * 60 * 1000,  // 5 min (cambia más)
    cleanupInterval: 5 * 60 * 1000,   // Limpiar cada 5 min
    maxItems: 100,                    // Máximo items en cache
    maxMemory: 10 * 1024 * 1024      // 10MB máximo
  },

  // 👂 CONFIGURACIÓN DE LISTENERS
  listeners: {
    autoCleanup: true,
    maxIdleTime: 5 * 60 * 1000,      // Desconectar después de 5 min
    cleanupInterval: 2 * 60 * 1000,   // Verificar cada 2 min
    priorities: {
      businessInfo: 'high',
      announcements: 'normal',
      menu: 'low'
    }
  },

  // 📊 CONFIGURACIÓN POR COMPONENTE
  components: {
    app: {
      announcements: {
        enableRealtime: true,
        cacheOnly: false,
        maxAge: 5 * 60 * 1000  // 5 min para modal principal
      }
    },
    
    bodyAds: {
      announcements: {
        enableRealtime: false,  // No necesita tiempo real
        cacheOnly: false,
        maxAge: 10 * 60 * 1000  // 10 min para sección
      }
    },

    menuDropdown: {
      menu: {
        enableRealtime: false,
        cacheOnly: true,        // Solo cache para menús
        maxAge: 20 * 60 * 1000  // 20 min
      }
    }
  },

  // 🔧 CONFIGURACIÓN AVANZADA
  advanced: {
    enableStats: process.env.NODE_ENV === 'development',
    enableLogs: process.env.NODE_ENV === 'development',
    enableConfigControl: process.env.NODE_ENV === 'development',
    batchSize: 10,              // Items por batch
    retryAttempts: 3,           // Reintentos en error
    retryDelay: 1000,           // Delay entre reintentos (ms)
    
    // Configuración de queries
    queries: {
      useOrderBy: false,        // Evitar orderBy costosos
      maxLimit: 50,             // Límite máximo de docs
      enableCompoundQueries: false  // Evitar queries complejos
    }
  },

  // 💰 PRESETS DE OPTIMIZACIÓN
  presets: {
    MAX_SAVINGS: {
      description: '85% menos lecturas - Máximo ahorro',
      realtimeMode: 'never',
      cacheTTL: 30,
      autoCleanup: true,
      components: {
        announcements: { enableRealtime: false, maxAge: 30 * 60 * 1000 },
        menu: { enableRealtime: false, maxAge: 60 * 60 * 1000 },
        businessInfo: { enableRealtime: false, maxAge: 60 * 60 * 1000 }
      }
    },
    
    BALANCED: {
      description: '75% menos lecturas - Balance ideal',
      realtimeMode: 'smart',
      cacheTTL: 15,
      autoCleanup: true,
      components: {
        announcements: { enableRealtime: true, maxAge: 10 * 60 * 1000 },
        menu: { enableRealtime: false, maxAge: 20 * 60 * 1000 },
        businessInfo: { enableRealtime: true, maxAge: 30 * 60 * 1000 }
      }
    },
    
    REALTIME: {
      description: '50% menos lecturas - Tiempo real',
      realtimeMode: 'always',
      cacheTTL: 5,
      autoCleanup: false,
      components: {
        announcements: { enableRealtime: true, maxAge: 2 * 60 * 1000 },
        menu: { enableRealtime: true, maxAge: 5 * 60 * 1000 },
        businessInfo: { enableRealtime: true, maxAge: 10 * 60 * 1000 }
      }
    }
  }
};

/**
 * 📊 Calcula el ahorro estimado de lecturas
 */
export const calculateSavingsEstimate = (mode = 'BALANCED') => {
  const baselines = {
    visitsPerDay: 200,
    readsPerVisitBefore: 15,
    daysPerMonth: 30
  };

  const reductionRates = {
    MAX_SAVINGS: 0.85,
    BALANCED: 0.75,
    REALTIME: 0.50
  };

  const reduction = reductionRates[mode] || reductionRates.BALANCED;
  const readsPerVisitAfter = baselines.readsPerVisitBefore * (1 - reduction);
  const dailySavings = (baselines.readsPerVisitBefore - readsPerVisitAfter) * baselines.visitsPerDay;
  const monthlySavings = dailySavings * baselines.daysPerMonth;
  
  // Costo aproximado Firebase: $0.36 por 100K lecturas
  const monthlyCostSavings = (monthlySavings / 100000) * 0.36;

  return {
    mode,
    reductionRate: Math.round(reduction * 100),
    readsPerVisitBefore: baselines.readsPerVisitBefore,
    readsPerVisitAfter: Math.round(readsPerVisitAfter),
    dailySavings: Math.round(dailySavings),
    monthlySavings: Math.round(monthlySavings),
    monthlyCostSavings: monthlyCostSavings.toFixed(2)
  };
};

/**
 * 🎛️ Obtiene la configuración activa
 */
export const getActiveConfig = () => {
  // Intentar obtener configuración personalizada
  if (typeof window !== 'undefined' && window.kobeFirebaseConfig) {
    return { ...FIREBASE_OPTIMIZATION_CONFIG, ...window.kobeFirebaseConfig };
  }
  
  // Usar configuración del preset
  const currentMode = FIREBASE_OPTIMIZATION_CONFIG.mode;
  const preset = FIREBASE_OPTIMIZATION_CONFIG.presets[currentMode];
  
  if (preset) {
    return {
      ...FIREBASE_OPTIMIZATION_CONFIG,
      ...preset,
      preset: currentMode
    };
  }
  
  return FIREBASE_OPTIMIZATION_CONFIG;
};

/**
 * 🔧 Helper para obtener configuración de componente
 */
export const getComponentConfig = (componentName, dataType) => {
  const activeConfig = getActiveConfig();
  const componentConfig = activeConfig.components?.[componentName]?.[dataType];
  
  if (componentConfig) {
    return componentConfig;
  }
  
  // Fallback a configuración por defecto
  const preset = activeConfig.presets?.[activeConfig.mode];
  return preset?.components?.[dataType] || {
    enableRealtime: false,
    cacheOnly: false,
    maxAge: activeConfig.cache.defaultTTL
  };
};

export default FIREBASE_OPTIMIZATION_CONFIG;
