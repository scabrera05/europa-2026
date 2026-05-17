# PLAN.md — Roadmap Europa 2026

Archivo de planificación. Se actualiza al cerrar cada sesión de trabajo.
`index.html` es el único archivo de la app (HTML + CSS + JS, sin build system).

---

## Estado al 17/5/2026 — **El viaje empieza mañana 🎉**

### Tabs
| Tab | ID |
|---|---|
| 🗓 Hoy | `tab-hoy` |
| 📍 Viaje | `tab-viaje` |
| 🧳 Equipaje | `tab-equipaje` |
| ✅ Logística | `tab-logistica` |
| 🎮 Mateo | `tab-mateo` |
| 📖 Diario | `tab-notas` |
| 🛠 Útil | `tab-util` |

### Todo completado hasta hoy
- [x] Itinerario 22 días con cards colapsables
- [x] Checklists equipaje + logística (localStorage)
- [x] Reservas con badges de cancelación (fix offset UTC aplicado)
- [x] Links de reservas corregidos (6 URLs reales Airbnb + Booking)
- [x] Tab Mateo — tips, apps, juegos online (6 links)
- [x] Diario — notas + fotos vía Firebase (Realtime DB + Storage)
- [x] Diario — compresión de fotos (canvas, max 1200px, JPEG 80%)
- [x] Diario — geolocalización GPS + reverse geocoding (Nominatim/OSM)
- [x] Diario — backup JSON (botón discreto, solo visible si lo buscás)
- [x] Diario — botón 📷 Foto sin `capture` (iOS muestra cámara + carrete)
- [x] Tab 🛠 Útil — conversor CHF/EUR/USD/UYU (tasas fijas 12/5/2026)
- [x] Tab 🛠 Útil — frases útiles italiano/alemán/francés (5 categorías)
- [x] Service Worker (sw.js v2) — network-first para index.html, cache-first para Firebase CDN
- [x] Fallback a localStorage si Firebase no disponible
- [x] mateo.html — 3 secciones nuevas: Montañas (4), Camper (4), Autos/Cars (4) → total 36 slides
- [x] mateo.html — orden: portada / países / montañas / animales / camper / actividades / autos / palabras / final
- [x] sw.js v3 — precachea `mateo.html` en install → disponible offline desde primera carga
- [x] juegos.html + 5 juegos offline para Mateo (tateti, memoria, contar, diferente, dibujar)
- [x] sw.js v4 — precachea mateo.html + los 6 juegos
- [x] dibujar.html — fix toolbar oculta en Moto G30 (window.innerHeight vía --app-h, dvh no confiable en Chrome Android antiguo)
- [x] dibujar.html — safe area en toolbar (env(safe-area-inset-bottom) para home indicator iPhone)
- [x] index.html — safe area en top-bar y body para iPhone en modo PWA standalone (env(safe-area-inset-top))
- [x] Ícono PWA actualizado — PNG 512×512 con fondo sólido #1e3a5f (reemplaza WebP transparente); generados icon-192.png y apple-touch-icon.png (180px)

---

## Backlog (sin planificar — post-viaje o si sobra tiempo)

- 🗺 **Pasaporte de Mateo** — sellos animados por ciudad visitada
- 💶 **Registro de gastos** — por categoría y moneda
- 🚨 **Contactos de emergencia** — card estática: números locales, seguro, embajada
