# PLAN.md — Roadmap Europa 2026

Archivo de planificación. Se actualiza al cerrar cada sesión de trabajo.
`index.html` es el único archivo de la app (HTML + CSS + JS, sin build system).

---

## Estado al 16/5/2026

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
- [x] mateo.html — orden: portada / países / **montañas** / animales / **camper** / actividades / **autos** / palabras / final
- [x] sw.js v3 — precachea `mateo.html` en install → disponible offline desde primera carga

---

## Backlog (sin planificar aún)

- 🗺 **Pasaporte de Mateo** — sellos animados por ciudad visitada
- 💶 **Registro de gastos** — por categoría y moneda
- 🚨 **Contactos de emergencia** — card estática: números locales, seguro, embajada
