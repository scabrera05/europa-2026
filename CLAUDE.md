# CLAUDE.md — Europa 2026

## Proyecto
App web de viaje familiar a Europa (18 mayo → 8 junio 2026).
Familia: Seba (papá), Mery (mamá), Mateo (hijo, 4 años). Ruta: Suiza → Italia → Austria (camper Bloque C).

**Repo:** https://github.com/scabrera05/europa-2026
**Deploy:** https://scabrera05.github.io/europa-2026/ (GitHub Pages, rama `main`)

---

## Archivos del proyecto
| Archivo | Descripción |
|---|---|
| `index.html` | App principal — todo en un solo archivo (HTML + CSS + JS) |
| `itinerario.html` | Reporte estático del itinerario (generado, no se edita) |

`index.html` tiene todo en un solo archivo. No hay build system, no hay dependencias npm.
Para editar: modificar directamente, commitear a `main`, GitHub Pages lo publica solo.

---

## Arquitectura de index.html

### Tabs (bottom nav)
- 🗓 **Hoy** (`tab-hoy`) — Dashboard dinámico: cuenta regresiva / día actual / viaje completado
- 📍 **Viaje** (`tab-viaje`) — Itinerario completo con cards colapsables por día
- 🧳 **Equipaje** (`tab-equipaje`) — Checklist con progreso, persiste en localStorage
- ✅ **Logística** (`tab-logistica`) — Checklist + reservas con badges de cancelación
- 🎮 **Mateo** (`tab-mateo`) — Tips, apps, actividades para el nene de 4 años
- 📖 **Diario** (`tab-notas`) — Notas + fotos en tiempo real via Firebase

### Firebase (proyecto: `pandafamilycare-dev`)
```js
// ya configurado en el código
storageBucket: "pandafamilycare-dev.firebasestorage.app"
databaseURL:   "https://pandafamilycare-dev.firebaseio.com"
```
- **Realtime Database** — notas sincronizadas entre dispositivos en tiempo real
- **Storage** — fotos del diario en `fotos/<timestamp>.jpg`
- **Reglas** — modo test, vencen el 11/6/2026 (después del viaje)
- **Fallback** — si Firebase no está disponible, todo cae a `localStorage`

### SDKs usados (compat v9, desde CDN)
```html
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-storage-compat.js"></script>
```

### Estructura de datos Firebase
```
/notas/<pushKey>/
  date:     "19/5/2026, 14:32"   ← toLocaleString('es-AR')
  text:     "..."                 ← puede estar vacío si es solo foto
  imageUrl: "https://..."         ← ausente si no hay foto
  ts:       1747657930000
```

---

## Decisiones técnicas importantes

### iOS Safari — zoom en inputs
**Problema:** iOS hace zoom automático en inputs con `font-size < 16px`.
**Fix aplicado:** `font-size: 16px` en el textarea de notas.
**Regla general:** cualquier `<input>`, `<textarea>`, `<select>` debe tener `font-size: 16px` o más para evitar el zoom.

### Compresión de fotos antes de subir
`_compressImage(file)` — canvas resize a max 1200px, JPEG 80%.
Importante para no saturar el plan gratuito de Firebase Storage.

### Variables CSS
El sistema de colores usa CSS variables en `:root`:
- `--a1/--a2/--al/--at` — azul (Bloque A / UI principal)
- `--b1/--b2/--bl/--bt` — rojo (Bloque B)
- `--c1/--c2/--cl/--ct` — verde (Bloque C)
- `--tx/--txl/--bg/--cd/--bdr/--sh/--r` — texto, fondo, borde, sombra, radio

---

## Patrones de código frecuentes

### Agregar un item al dashboard (modo pre-viaje/viaje/post-viaje)
`initDashboard()` en el JS. Tres ramas: `today < tripStart` / durante / después.

### Agregar un ítem de equipaje
Buscar el array `packGroups` y agregar `{id:'xxx', l:'Label', n:'nota opcional'}` al grupo correcto.

### Agregar un ítem de logística
Buscar `logGroups`, mismo formato. Si tiene `w:true` muestra badge ⚠️ mientras no está tildado.

### Push + deploy
```bash
git add index.html
git commit -m "mensaje"
git push origin main
# GitHub Pages publica en ~1-2 min
```

---

## Lo que NO tiene (por diseño)
- Sin build system / bundler
- Sin framework JS
- Sin autenticación (Firebase en modo público)
- Sin service worker / PWA (funciona offline parcialmente por localStorage)
