---
description: Instrucciones de diseño visual para la migración de Groove Cafe a Kobe Sushi
applyTo: '**/*.{css,jsx,tsx}'
---

# Kobe Sushi - Guía de Diseño Visual (Estilo High-End / Omakase)

## Contexto del Proyecto
El diseño se ha reiniciado por completo para alejarse del layout de Groove Cafe. El nuevo enfoque busca un estilo de sushi premium, nocturno y minimalista, inspirado en menús omakase y alta gastronomía.

## Paleta de Colores

### Colores Principales
- **Fondo principal**: `#18181B` (Negro carbón oscuro)
- **Acentos y títulos**: `#f6e3a8` (Amarillo dorado pálido, elegante)
- **Textos generales**: `#F9FAFB` (Blanco ligeramente grisáceo)
- **Acentos secundarios**: `#991B1B` (Rojo oscuro, usar MUY sutilmente como detalle japonés)

### Uso de Colores
- El fondo base y las secciones DEBEN SER del color primario o completamente transparentes.
- Queda prohibido usar rectángulos, tarjetas (cards) opacas, verdes oscuros o fondos redondeados heredados de Groove.
- El texto debe tener alto contraste, con el color `#f6e3a8` usado mayormente en tipografía de títulos (PP Eiko) y animaciones de hover.

## Tipografía y Layout

### Fuentes
- **Títulos**: PP Eiko
- **Textos / Detalles**: Montserrat (en mayúsculas con tracking ancho para etiquetas / pequeñas llamadas de acción).

### Formato de Elementos
- En lugar de *cards*, usar líneas separadoras ultradelgadas (`border-bottom: 1px solid rgba(255,255,255,0.08);`).
- Textos tipográficos gigantes.
- Abundante padding (espacio negativo) para dar sensación de lujo y respiración.
- Los CTA (botones / calls to action) deben ser texto animado o líneas subrayadas, NO botones tipo pastilla rellenos.

## Animaciones
- Transiciones ultra suaves (`cubic-bezier(0.16, 1, 0.3, 1)` recomendado) y de mayor duración (ej. 0.6s).
- Efectos de *fade-up* y revelado progresivo letra a letra / línea a línea.
- Hover states expansivos (ej. textos que se desplazan ligeramente a la derecha, líneas separadoras que aumentan de ancho).
