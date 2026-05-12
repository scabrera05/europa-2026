# PLAN.md — Roadmap Europa 2026

Archivo de planificación. Se actualiza al cerrar cada sesión de trabajo.
`index.html` es el único archivo de la app (HTML + CSS + JS, sin build system).

---

## Estado actual (12/5/2026)

### Tabs existentes
| Tab | ID | Descripción |
|---|---|---|
| 🗓 Hoy | `tab-hoy` | Dashboard dinámico (countdown / día actual / post-viaje) |
| 📍 Viaje | `tab-viaje` | Itinerario 22 días con cards colapsables |
| 🧳 Equipaje | `tab-equipaje` | Checklist con progreso, persiste en localStorage |
| ✅ Logística | `tab-logistica` | Checklist + reservas con badges |
| 🎮 Mateo | `tab-mateo` | Tips, apps, juegos online para nene de 4 años |
| 📖 Diario | `tab-notas` | Notas + fotos vía Firebase, geolocalización, backup JSON |

### Features implementados
- [x] Itinerario completo 22 días
- [x] Checklists equipaje y logística con persistencia
- [x] Diario con Firebase Realtime DB + Storage
- [x] Fotos con compresión antes de subir (canvas, max 1200px, JPEG 80%)
- [x] Geolocalización en el Diario (GPS + reverse geocoding Nominatim/OSM)
- [x] Backup JSON descargable con todas las entradas
- [x] Sección juegos online para Mateo (6 links, sin descarga)
- [x] Fallback a localStorage si Firebase no disponible

---

## Próximos features planificados

---

### 1 — 💱 Conversor de monedas
**Complejidad:** baja · **Impacto:** alto (útil en mercados y restaurantes en tiempo real)

#### Qué hace
Conversor multi-moneda de entrada libre: escribís un monto en cualquier moneda y las demás se calculan automáticamente.

#### Monedas
| Moneda | Símbolo | Uso en el viaje |
|---|---|---|
| Franco Suizo | CHF | Suiza (Bloque A) |
| Euro | EUR | Italia + Austria (Bloques B y C) |
| Dólar | USD | Referencia internacional |
| Peso Uruguayo | UYU | Moneda base de la familia |

#### Tasas fijas (12/5/2026)
> ⚠️ Tasas fijas al momento de desarrollo. No se actualizan en tiempo real.
> Fuentes: exchange-rates.org, tradingeconomics.com

| Par | Tasa |
|---|---|
| 1 CHF = | 1.0913 EUR |
| 1 CHF = | 1.2856 USD |
| 1 CHF = | 51.59 UYU |
| 1 EUR = | 0.9164 CHF |
| 1 EUR = | 1.178 USD |
| 1 EUR = | 47.26 UYU |
| 1 USD = | 0.7778 CHF |
| 1 USD = | 0.8488 EUR |
| 1 USD = | 40.12 UYU |

#### UX
- 4 inputs numéricos (uno por moneda), con ícono de bandera/símbolo
- Al editar cualquier campo → los otros 3 se recalculan instantáneamente
- Sin botón "convertir" — actualización en tiempo real (evento `input`)
- Nota visible: "Tasas al 12/5/2026 — orientativo"

#### Dónde va en la app
**Opción A (recomendada):** nuevo tab `💱` — séptimo botón en el bottom nav
  - Problema: 7 tabs en mobile queda muy apretado
  - Solución: reducir el label de texto (solo emoji en móvil ≤360px)

**Opción B:** card colapsable dentro del tab `🗓 Hoy` del dashboard
  - Pro: no toca el nav
  - Contra: menos accesible, hay que ir a Hoy primero

**Opción C:** nuevo tab `🛠 Útil` que agrupe conversor + frases (ver Feature 2)
  - Pro: agrupa los dos features de referencia rápida
  - Recomendada si se implementan juntos

#### Implementación (cuando arranquemos)
1. Agregar CSS: `.conv-wrap`, `.conv-row`, `.conv-flag`, `.conv-input`, `.conv-note`
2. Agregar HTML del tab (o sección según opción elegida)
3. Agregar JS: objeto `RATES` con las tasas, función `convertFrom(source)`
4. Si Opción A o C: agregar botón al bottom nav y sección al `<main>`

---

### 2 — 🗣 Frases útiles
**Complejidad:** baja · **Impacto:** alto (uso en campo sin internet)

#### Qué hace
Referencia estática de frases básicas en los 3 idiomas del recorrido.
Sin lógica, todo HTML. Funciona completamente offline.

#### Idiomas y contexto geográfico
| Idioma | Dónde se usa en el viaje |
|---|---|
| 🇮🇹 Italiano | Italia completa (Bloque B + Bloque C parcial) |
| 🇩🇪 Alemán | Suiza alemana (Bloque A), Austria (Bloque C) |
| 🇫🇷 Francés | Suiza francesa (Lausana, Montreux) |

#### Categorías de frases
| Categoría | Frases clave |
|---|---|
| 👋 Saludos | Hola, gracias, por favor, disculpe, no entiendo, ¿habla español/inglés? |
| 🍽 Restaurante | Mesa para 3, carta/menú, sin gluten, la cuenta, agua, está muy rico |
| 🆘 Emergencia | Ayuda, llamen al médico, me robaron, dónde está el hospital, soy alérgico |
| 👶 Niños | Dónde está el baño, ¿hay silla para bebé?, el nene tiene 4 años |
| 💊 Farmacia | Necesito un analgésico, fiebre, diarrea, crema solar, tiritas/banditas |

#### UX
- Selector de idioma (3 botones: 🇮🇹 🇩🇪 🇫🇷) — muestra solo el idioma activo
- Cada frase: español → traducción + pronunciación fonética entre paréntesis
- Cards por categoría, colapsables (mismo patrón que el Viaje)
- Sin internet requerido

#### Dónde va en la app
**Opción recomendada:** mismo tab `🛠 Útil` junto al conversor (Opción C del Feature 1)
Así el nav queda en 7 tabs con dos features útiles agrupados.

#### Implementación (cuando arranquemos)
1. Definir todas las frases (objeto JS `PHRASES` con estructura `{it:{saludos:[...], ...}, de:{...}, fr:{...}}`)
2. Agregar CSS del selector de idioma y cards de frases
3. Agregar HTML del tab con selector + contenedor
4. Agregar JS: `switchLang(lang)` que muestra/oculta las secciones

---

## Orden de implementación sugerido

```
Sesión próxima:
  1. Decidir: ¿tab separado o tab combinado "🛠 Útil"?
  2. Implementar conversor (más rápido, ~30 min)
  3. Implementar frases útiles (~45 min)
  4. Commit + push → deploy
```

---

## Ideas en el backlog (sin planificar aún)

- 🗺 Pasaporte de Mateo — sellos por ciudad visitada, animación
- 💶 Registro de gastos — por categoría y moneda
- 🚨 Contactos de emergencia — card estática con números locales + seguro + embajada
