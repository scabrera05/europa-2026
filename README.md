# 🌍 Europa 2026

App web de viaje familiar — Suiza · Italia · Austria · 18 mayo → 8 junio 2026.

**[Ver la app →](https://scabrera05.github.io/europa-2026/)**

---

## Features

- **🗓 Dashboard dinámico** — cuenta regresiva antes del viaje / día actual durante / resumen post-viaje
- **📍 Itinerario completo** — 22 días con cards colapsables, highlights, costos y notas por día
- **🧳 Checklist de equipaje** — con progreso y persistencia en localStorage
- **✅ Logística** — checklist + reservas con badges de cancelación/modificación
- **🎮 Tab Mateo** — tips, apps, juegos online y actividades para el nene de 4 años
- **📖 Diario** — notas + fotos sincronizadas en tiempo real via Firebase
  - 📍 Geolocalización automática con reverse geocoding (OpenStreetMap/Nominatim)
  - 📥 Exportación de backup completo en JSON
  - 📸 Compresión de fotos antes de subir (max 1200px, JPEG 80%)
  - 🔄 Fallback a localStorage si no hay Firebase disponible

---

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | HTML · CSS · JavaScript vanilla |
| Base de datos | Firebase Realtime Database |
| Almacenamiento | Firebase Storage |
| Deploy | GitHub Pages (`main` branch) |
| Reverse geocoding | Nominatim / OpenStreetMap |

Sin build system, sin bundler, sin framework JS. Todo en `index.html`.

---

## Firebase setup

El proyecto usa Firebase `pandafamilycare-dev`. Los pasos para configurar desde cero:

1. Crear proyecto en [Firebase Console](https://console.firebase.google.com)
2. Habilitar **Realtime Database** y **Storage**
3. Publicar reglas en modo test (o restringidas a tus usuarios)
4. Copiar la config en `index.html`:

```js
const FIREBASE_CONFIG = {
  apiKey: "...",
  authDomain: "tu-proyecto.firebaseapp.com",
  databaseURL: "https://tu-proyecto.firebaseio.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.firebasestorage.app",
  messagingSenderId: "...",
  appId: "..."
};
```

---

## Deploy

Cualquier push a `main` publica automáticamente en GitHub Pages (~1-2 min):

```bash
git add index.html
git commit -m "descripción del cambio"
git push origin main
```

---

## Estructura del proyecto

```
europa-2026/
├── index.html      # App principal — HTML + CSS + JS en un solo archivo
└── itinerario.html # Reporte estático del itinerario (solo lectura)
```

---

## Estructura de datos (Firebase)

```
/notas/<pushKey>/
  date:     "19/5/2026, 14:32"   ← toLocaleString('es-AR')
  text:     "..."                 ← puede estar vacío si es solo foto
  imageUrl: "https://..."         ← ausente si no hay foto
  location: "Zermatt, Suiza"     ← nombre del lugar (opcional)
  lat:      46.0207               ← GPS latitud (opcional)
  lng:      7.7491                ← GPS longitud (opcional)
  ts:       1747657930000
```
