/**
 * Menú estático de Kobe Sushi
 * Las imágenes son ejemplos públicos de Unsplash — reemplazar por fotos propias.
 *
 * ─── PARA CAMBIAR A FIREBASE ────────────────────────────────────────────────
 *   Cambiá USE_STATIC_MENU a false. El resto de la app se adapta automáticamente.
 * ────────────────────────────────────────────────────────────────────────────
 */

/** Cambiar a false para usar Firebase */
export const USE_STATIC_MENU = true;

/**
 * Agrupa las secciones del menú estático en "menús" equivalentes a los de Firebase.
 * Cada key es el menuType que recibe MenuDropdownOptimized.
 */
export const STATIC_MENU_GROUPS = {
  'sushis': {
    title: 'Los mejores Sushis',
    desc: 'Rolls, sashimis y nigiris.',
    sectionIds: ['rolls-veggies', 'kobe-rolls', 'sashimis', 'nigiris'],
  },
  'entradas': {
    title: 'Entradas & Bowls',
    desc: 'Para empezar o acompañar.',
    sectionIds: ['entradas', 'kobe-bowls'],
  },
  'bebidas': {
    title: 'Bebidas & Postres',
    desc: 'Bebidas, cervezas y postres.',
    sectionIds: ['bebidas', 'cervezas', 'postres'],
  },
};

const IMG = {
  roll_salmon:   'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=300&h=300&fit=crop&auto=format',
  roll_general:  'https://images.unsplash.com/photo-1562802378-063ec186a863?w=300&h=300&fit=crop&auto=format',
  roll_avocado:  'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=300&h=300&fit=crop&auto=format',
  roll_veggie:   'https://images.unsplash.com/photo-1476224203421-74177e38b3c7?w=300&h=300&fit=crop&auto=format',
  nigiri:        'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=300&h=300&fit=crop&auto=format',
  sashimi:       'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=300&h=300&fit=crop&auto=format',
  shrimp:        'https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=300&h=300&fit=crop&auto=format',
  spring_rolls:  'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=300&h=300&fit=crop&auto=format',
  bowl:          'https://images.unsplash.com/photo-1547592180-85f173990554?w=300&h=300&fit=crop&auto=format',
  drink:         'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=300&h=300&fit=crop&auto=format',
  beer:          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&auto=format',
  tiramisu:      'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=300&fit=crop&auto=format',
  mousse:        'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=300&fit=crop&auto=format',
};

export const STATIC_MENU = [
  // ─────────────────────────────────────────────────────────────
  // ENTRADAS
  // ─────────────────────────────────────────────────────────────
  {
    id: 'entradas',
    name: 'Entradas',
    items: [
      {
        id: 'langostinos-crunch',
        name: 'Langostinos Crunch',
        desc: 'Langostinos rebozados en panko crujiente',
        price: '$11.000',
        img: IMG.shrimp,
      },
      {
        id: 'spring-rolls',
        name: 'Spring Rolls',
        desc: 'Empanadas chinas de vegetales o carne',
        price: '$9.000',
        img: IMG.spring_rolls,
      },
      {
        id: 'hot-rolls-entrada',
        name: 'Hot Rolls',
        desc: 'Piezas de panko roll — Langostinos rebozados en panko',
        price: '$11.000',
        img: IMG.shrimp,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // KOBE BOWLS
  // ─────────────────────────────────────────────────────────────
  {
    id: 'kobe-bowls',
    name: 'Kobe Bowls',
    items: [
      {
        id: 'bowl-kanikama-x4',
        name: 'Bowl Kanikama x4',
        desc: 'Base de arroz, 1/3 de palta, 1/3 de phila, 1/3 kanikama. También disponible x8 $22.500',
        price: '$12.000',
        img: IMG.bowl,
      },
      {
        id: 'bowl-kanikama-x8',
        name: 'Bowl Kanikama x8',
        desc: 'Base de arroz, 1/3 de palta, 1/3 de phila, 1/3 kanikama',
        price: '$22.500',
        img: IMG.bowl,
      },
      {
        id: 'bowl-langostinos-x4',
        name: 'Bowl Langostinos x4',
        desc: 'Base de arroz, 1/3 de palta, 1/3 de phila, 1/3 langostinos. También disponible x8 $22.500',
        price: '$12.000',
        img: IMG.bowl,
      },
      {
        id: 'bowl-langostinos-x8',
        name: 'Bowl Langostinos x8',
        desc: 'Base de arroz, 1/3 de palta, 1/3 de phila, 1/3 langostinos',
        price: '$22.500',
        img: IMG.bowl,
      },
      {
        id: 'bowl-veggie-x4',
        name: 'Bowl Veggie x4',
        desc: 'Base de arroz, 1/3 de palta, 1/3 de phila, 1/3 a elección veggie. Opción vegana +$1.000',
        price: '$12.000',
        img: IMG.bowl,
      },
      {
        id: 'bowl-veggie-x8',
        name: 'Bowl Veggie x8',
        desc: 'Base de arroz, 1/3 de palta, 1/3 de phila, 1/3 a elección veggie. Opción vegana +$1.000',
        price: '$22.500',
        img: IMG.bowl,
      },
      {
        id: 'bowl-salmon-fresco-x4',
        name: 'Bowl Salmón Fresco x4',
        desc: 'Base de arroz, 1/3 de palta, 1/3 de phila, 1/3 salmón fresco',
        price: '$12.000',
        img: IMG.bowl,
      },
      {
        id: 'bowl-salmon-fresco-x8',
        name: 'Bowl Salmón Fresco x8',
        desc: 'Base de arroz, 1/3 de palta, 1/3 de phila, 1/3 salmón fresco',
        price: '$22.500',
        img: IMG.bowl,
      },
      {
        id: 'bowl-salmon-cocido-x4',
        name: 'Bowl Salmón Cocido x4',
        desc: 'Base de arroz, 1/3 de palta, 1/3 de phila, 1/3 salmón cocido',
        price: '$12.000',
        img: IMG.bowl,
      },
      {
        id: 'bowl-salmon-cocido-x8',
        name: 'Bowl Salmón Cocido x8',
        desc: 'Base de arroz, 1/3 de palta, 1/3 de phila, 1/3 salmón cocido',
        price: '$22.500',
        img: IMG.bowl,
      },
      {
        id: 'bowl-langostinos-apanados-x4',
        name: 'Bowl Langostinos Apanados x4',
        desc: 'Base de arroz, 1/3 de palta, 1/3 de phila, 1/3 langostinos apanados',
        price: '$12.000',
        img: IMG.bowl,
      },
      {
        id: 'bowl-langostinos-apanados-x8',
        name: 'Bowl Langostinos Apanados x8',
        desc: 'Base de arroz, 1/3 de palta, 1/3 de phila, 1/3 langostinos apanados',
        price: '$22.500',
        img: IMG.bowl,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // ROLLS VEGGIES (9 piezas)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'rolls-veggies',
    name: 'Rolls Veggies',
    items: [
      {
        id: 'veg-philadelphia',
        name: 'Philadelphia Veg',
        desc: 'Palta y phila',
        price: '$11.000',
        img: IMG.roll_veggie,
      },
      {
        id: 'veg-tomato',
        name: 'Tomato',
        desc: 'Tomates hidratados, palta y phila',
        price: '$9.000',
        img: IMG.roll_veggie,
      },
      {
        id: 'veg-mamba',
        name: 'Mamba Veg',
        desc: 'Palta y philadelphia envuelto en mango con salsa maracuyá',
        price: '$13.000',
        img: IMG.roll_avocado,
      },
      {
        id: 'veg-carrot',
        name: 'Carrot',
        desc: 'Zanahoria, palta y phila',
        price: '$11.000',
        img: IMG.roll_veggie,
      },
      {
        id: 'veg-green',
        name: 'Green',
        desc: 'Palta, philadelphia y ciboulette',
        price: '$12.000',
        img: IMG.roll_avocado,
      },
      {
        id: 'veg-not-chicken',
        name: 'Not Chicken',
        desc: 'Not pollo rebozado y phila',
        price: '$16.500',
        img: IMG.roll_veggie,
      },
      {
        id: 'veg-fungi',
        name: 'Fungi',
        desc: 'Hongos y queso phila',
        price: '$12.000',
        img: IMG.roll_veggie,
      },
      {
        id: 'veg-sweet-veggie',
        name: 'Sweet Veggie',
        desc: 'Palta y phila coronado con batata frita y salsa honey',
        price: '$12.500',
        img: IMG.roll_avocado,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // KOBE ROLLS (9 piezas)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'kobe-rolls',
    name: 'Kobe Rolls',
    items: [
      {
        id: 'roll-philadelphia',
        name: 'Philadelphia',
        desc: 'Salmón fresco, palta y phila',
        price: '$15.500',
        img: IMG.roll_salmon,
      },
      {
        id: 'roll-new-york',
        name: 'New York',
        desc: 'Salmón fresco y palta',
        price: '$15.500',
        img: IMG.roll_salmon,
      },
      {
        id: 'roll-mamba',
        name: 'Mamba',
        desc: 'Palta y philadelphia envuelto en salmón fresco',
        price: '$15.000',
        img: IMG.roll_salmon,
      },
      {
        id: 'roll-california',
        name: 'California',
        desc: 'Kanikama, palta y phila',
        price: '$14.500',
        img: IMG.roll_general,
      },
      {
        id: 'roll-guacamole',
        name: 'Guacamole',
        desc: 'Salmón coronado con guacamole',
        price: '$14.500',
        img: IMG.roll_salmon,
      },
      {
        id: 'roll-salmon-grill',
        name: 'Salmón Grill',
        desc: 'Salmón grillado y phila',
        price: '$15.000',
        img: IMG.roll_salmon,
      },
      {
        id: 'roll-ebi',
        name: 'Ebi',
        desc: 'Langostinos, palta y phila',
        price: '$15.500',
        img: IMG.roll_general,
      },
      {
        id: 'roll-ebi-furai',
        name: 'Ebi Furai',
        desc: 'Langostinos apanados y phila',
        price: '$15.500',
        img: IMG.roll_general,
      },
      {
        id: 'roll-ebi-cobra',
        name: 'Ebi Cobra',
        desc: 'Langostinos apanados y philadelphia envuelto en salmón fresco',
        price: '$14.500',
        img: IMG.roll_salmon,
      },
      {
        id: 'roll-tuna',
        name: 'Tuna',
        desc: 'Atún y phila',
        price: '$14.500',
        img: IMG.roll_general,
      },
      {
        id: 'roll-kobe',
        name: 'Kobe Roll',
        desc: 'Salmón fresco, langostinos y phila',
        price: '$15.000',
        img: IMG.roll_salmon,
      },
      {
        id: 'roll-kobe-hot',
        name: 'Kobe Hot',
        desc: 'Palta y philadelphia envuelto en salmón flambeado',
        price: '$13.000',
        img: IMG.roll_salmon,
      },
      {
        id: 'roll-avocado',
        name: 'Avocado',
        desc: 'Salmón fresco y philadelphia envuelto en palta',
        price: '$14.000',
        img: IMG.roll_avocado,
      },
      {
        id: 'roll-mexican',
        name: 'Mexican',
        desc: 'Langostinos, palta y philadelphia con salsa jalapeños',
        price: '$14.000',
        img: IMG.roll_general,
      },
      {
        id: 'roll-tropical',
        name: 'Tropical',
        desc: 'Salmón y philadelphia con salsa maracuyá',
        price: '$14.000',
        img: IMG.roll_salmon,
      },
      {
        id: 'roll-sweet',
        name: 'Sweet',
        desc: 'Salmón, palta y phila coronado con batata frita y salsa honey',
        price: '$14.500',
        img: IMG.roll_salmon,
      },
      {
        id: 'roll-gold',
        name: 'Gold',
        desc: 'Salmón fresco y palta coronado con queso crema, praline y miel',
        price: '$15.500',
        img: IMG.roll_salmon,
      },
      {
        id: 'roll-ebi-cobra-hot',
        name: 'Ebi Cobra Hot',
        desc: 'Langostinos apanados y phila envuelto en salmón flambeado',
        price: '$14.000',
        img: IMG.roll_salmon,
      },
      {
        id: 'roll-avocado-furai',
        name: 'Avocado Furai',
        desc: 'Langostinos apanados y phila envuelto en palta',
        price: '$15.500',
        img: IMG.roll_avocado,
      },
      {
        id: 'roll-caramel',
        name: 'Caramel',
        desc: 'Palta y philadelphia envuelto en salmón flambeado con azúcar',
        price: '$16.000',
        img: IMG.roll_salmon,
      },
      {
        id: 'roll-samurai',
        name: 'Samurai',
        desc: 'Salmón cocido y philadelphia coronado con papa y alioli',
        price: '$15.500',
        img: IMG.roll_salmon,
      },
      {
        id: 'roll-spicy-tuna',
        name: 'Spicy Tuna',
        desc: 'Atún y Philadelphia coronado con mayonesa picante',
        price: '$15.000',
        img: IMG.roll_general,
      },
      {
        id: 'roll-mango',
        name: 'Mango',
        desc: 'Salmón, philadelphia y mango',
        price: '$15.000',
        img: IMG.roll_salmon,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // SASHIMIS
  // ─────────────────────────────────────────────────────────────
  {
    id: 'sashimis',
    name: 'Sashimis',
    items: [
      {
        id: 'sashimi-salmon-x12',
        name: 'Sashimi de Salmón Rosado x12',
        desc: 'Láminas de salmón rosado fresco. Opción vegana +$1.000',
        price: '$13.000',
        img: IMG.sashimi,
      },
      {
        id: 'sashimi-salmon-langostinos-x12',
        name: 'Sashimi de Salmón o Langostinos x12',
        desc: 'Láminas de salmón rosado o langostinos frescos. Opción vegana +$1.000',
        price: '$13.500',
        img: IMG.sashimi,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // NIGIRIS
  // ─────────────────────────────────────────────────────────────
  {
    id: 'nigiris',
    name: 'Nigiris',
    items: [
      {
        id: 'nigiri-salmon-x9',
        name: 'Nigiri de Salmón x9',
        desc: 'Arroz prensado con salmón fresco',
        price: '$13.000',
        img: IMG.nigiri,
      },
      {
        id: 'nigiri-salmon-x18',
        name: 'Nigiri de Salmón x18',
        desc: 'Arroz prensado con salmón fresco',
        price: '$24.000',
        img: IMG.nigiri,
      },
      {
        id: 'nigiri-salmon-x27',
        name: 'Nigiri de Salmón x27',
        desc: 'Arroz prensado con salmón fresco',
        price: '$34.000',
        img: IMG.nigiri,
      },
      {
        id: 'nigiri-langostinos-x9',
        name: 'Nigiri de Langostinos x9',
        desc: 'Arroz prensado con langostinos frescos',
        price: '$13.000',
        img: IMG.nigiri,
      },
      {
        id: 'nigiri-langostinos-x18',
        name: 'Nigiri de Langostinos x18',
        desc: 'Arroz prensado con langostinos frescos',
        price: '$24.000',
        img: IMG.nigiri,
      },
      {
        id: 'nigiri-langostinos-x27',
        name: 'Nigiri de Langostinos x27',
        desc: 'Arroz prensado con langostinos frescos',
        price: '$34.000',
        img: IMG.nigiri,
      },
      {
        id: 'nigiri-vegano-x9',
        name: 'Nigiri Vegano x9',
        desc: 'Arroz prensado con opción vegana a elección',
        price: '$13.500',
        img: IMG.nigiri,
      },
      {
        id: 'nigiri-vegano-x18',
        name: 'Nigiri Vegano x18',
        desc: 'Arroz prensado con opción vegana a elección',
        price: '$25.000',
        img: IMG.nigiri,
      },
      {
        id: 'nigiri-vegano-x27',
        name: 'Nigiri Vegano x27',
        desc: 'Arroz prensado con opción vegana a elección',
        price: '$35.000',
        img: IMG.nigiri,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // BEBIDAS
  // ─────────────────────────────────────────────────────────────
  {
    id: 'bebidas',
    name: 'Bebidas',
    items: [
      {
        id: 'bebida-pepsi',
        name: 'Pepsi',
        desc: null,
        price: '$3.500',
        img: IMG.drink,
      },
      {
        id: 'bebida-pepsi-black',
        name: 'Pepsi Black',
        desc: null,
        price: '$3.500',
        img: IMG.drink,
      },
      {
        id: 'bebida-7up',
        name: '7UP',
        desc: null,
        price: '$3.500',
        img: IMG.drink,
      },
      {
        id: 'bebida-7up-free',
        name: '7UP Free',
        desc: null,
        price: '$3.500',
        img: IMG.drink,
      },
      {
        id: 'bebida-agua-sin-gas',
        name: 'Agua sin gas',
        desc: null,
        price: '$3.000',
        img: IMG.drink,
      },
      {
        id: 'bebida-agua-con-gas',
        name: 'Agua con gas',
        desc: null,
        price: '$3.000',
        img: IMG.drink,
      },
      {
        id: 'bebida-mirinda',
        name: 'Mirinda',
        desc: null,
        price: '$3.500',
        img: IMG.drink,
      },
      {
        id: 'bebida-paso-pomelo',
        name: 'Paso de los Toros Pomelo',
        desc: null,
        price: '$3.500',
        img: IMG.drink,
      },
      {
        id: 'bebida-agua-tonica',
        name: 'Agua Tónica',
        desc: null,
        price: '$3.500',
        img: IMG.drink,
      },
      {
        id: 'bebida-agua-saborizada',
        name: 'Agua Saborizada',
        desc: 'Pomelo, manzana, naranja o limonada',
        price: '$3.200',
        img: IMG.drink,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CERVEZAS
  // ─────────────────────────────────────────────────────────────
  {
    id: 'cervezas',
    name: 'Cervezas',
    items: [
      {
        id: 'cerveza-rubia',
        name: 'Cerveza Rubia',
        desc: null,
        price: '$5.000',
        img: IMG.beer,
      },
      {
        id: 'cerveza-roja',
        name: 'Cerveza Roja',
        desc: null,
        price: '$5.500',
        img: IMG.beer,
      },
      {
        id: 'cerveza-negra',
        name: 'Cerveza Negra',
        desc: null,
        price: '$5.500',
        img: IMG.beer,
      },
      {
        id: 'cerveza-ipa',
        name: 'Cerveza IPA',
        desc: null,
        price: '$6.000',
        img: IMG.beer,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // POSTRES
  // ─────────────────────────────────────────────────────────────
  {
    id: 'postres',
    name: 'Postres',
    items: [
      {
        id: 'postre-tiramisu',
        name: 'Tiramisú',
        desc: null,
        price: '$8.000',
        img: IMG.tiramisu,
      },
      {
        id: 'postre-mousse-chocolate',
        name: 'Mousse de Chocolate y Nueces Caramelizadas',
        desc: null,
        price: '$8.000',
        img: IMG.mousse,
      },
    ],
  },
];
