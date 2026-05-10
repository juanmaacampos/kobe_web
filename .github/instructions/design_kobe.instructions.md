---
description: Instrucciones de diseño visual para la migración de Groove Cafe a Kobe Sushi
applyTo: '**/*.{css,jsx,tsx}' # Aplica a todos los archivos de estilos y componentes
---

# Kobe Sushi - Guía de Diseño Visual

## Contexto del Proyecto
Esta web está siendo migrada de Groove Cafe a Kobe Sushi. La migración es **SOLO DE DISEÑO VISUAL**, manteniendo la estructura y funcionalidad existente.

## Paleta de Colores

### Colores Principales
- **Fondo principal**: `#18181B` (Negro carbón oscuro)
- **Acentos y títulos**: `#FACC15` (Amarillo dorado)
- **Textos generales**: `#F9FAFB` (Blanco ligeramente grisáceo)
- **Acentos secundarios**: `#991B1B` (Rojo oscuro)

### Uso de Colores
- El fondo `#18181B` debe ser el color base predominante en toda la aplicación
- `#FACC15` para títulos principales, botones de acción, y elementos destacados
- `#F9FAFB` para el cuerpo de texto y descripciones
- `#991B1B` para hover states, elementos de énfasis especial, y llamados de atención secundarios

## Tipografía

### Fuentes
- **Títulos**: Mantener la fuente actual de Groove (EB Garamond/similar)
- **Textos**: Montserrat para todo el cuerpo de texto y párrafos

### Jerarquía Tipográfica
- Los títulos principales deben usar la fuente de Groove en color `#FACC15`
- Los textos descriptivos deben usar Montserrat en color `#F9FAFB`
- Mantener tamaños y pesos coherentes según la jerarquía visual

## Filosofía de Diseño

### Principios
1. **Modernidad**: Diseño contemporáneo, limpio y sofisticado
2. **Elegancia**: Mantener la sensación premium y refinada
3. **Diferenciación**: Crear una identidad visual distinta a Groove, pero manteniendo la calidad
4. **Contraste**: Aprovechar el fondo oscuro con los acentos dorados para crear impacto visual

### Elementos a Considerar
- Espaciados generosos para respiración visual
- Transiciones suaves en hover states
- Contraste alto para legibilidad óptima
- Elementos visuales que evoquen la gastronomía japonesa de forma sutil

## Importante: Modo Día/Noche
⚠️ **El modo día/noche NO aplica para Kobe Sushi**
- Eliminar o deshabilitar cualquier toggle de tema claro/oscuro
- El diseño debe ser exclusivamente en modo oscuro
- No implementar variables CSS para temas múltiples

## Implementación

### CSS Variables Sugeridas
```css
:root {
  --color-background: #18181B;
  --color-primary: #FACC15;
  --color-text: #F9FAFB;
  --color-accent: #991B1B;
  
  /* Fuentes */
  --font-heading: 'EB Garamond', serif; /* O la fuente actual de títulos */
  --font-body: 'Montserrat', sans-serif;
}
```

### Ejemplos de Aplicación
- **Botones primarios**: Background `#FACC15`, hover `#991B1B`
- **Cards**: Background con ligera opacidad sobre `#18181B`, borde sutil en `#FACC15`
- **Links**: Color `#FACC15`, hover `#991B1B`
- **Separadores**: Líneas sutiles en `#FACC15` con baja opacidad

## Checklist de Migración
- [ ] Actualizar todos los colores de fondo a `#18181B`
- [ ] Cambiar colores de títulos a `#FACC15`
- [ ] Actualizar textos a `#F9FAFB`
- [ ] Implementar acentos secundarios con `#991B1B`
- [ ] Importar y aplicar Montserrat para textos
- [ ] Verificar contraste y legibilidad
- [ ] Remover funcionalidad de modo día/noche
- [ ] Asegurar consistencia visual en todos los componentes