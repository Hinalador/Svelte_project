# 📋 Habit Tracker

Un rastreador de hábitos moderno y responsivo construido con **Svelte 5** y **Vite**. Ayuda a construir mejores rutinas diarias con una interfaz clara, agradable y accesible.

## ✨ Características

- 📊 **Seguimiento de hábitos** - Gestiona múltiples hábitos con facilidad
- 💾 **Persistencia local** - Tus hábitos se guardan automáticamente en el navegador
- 🧠 **Estado editable** - Marca hábitos como completados o pendientes con un clic
- ✍️ **Agregar nuevos hábitos** - Añade hábitos personalizados al instante
- ✅ **Botones de acción rápida** - Completar todos o reiniciar el día con un solo toque
- 🎨 **Diseño mejorado** - Contraste y legibilidad optimizados para el formulario y la tarjeta principal
- ⚡ **Rápido y responsivo** - Interfaz fluida con HMR en tiempo real

## 🚀 Tecnologías

- **Svelte 5** - Framework reactivo y ligero
- **Vite** - Empaquetador ultrarrápido
- **JavaScript** - Lógica interactiva
- **CSS3** - Estilos modernos y responsive

## 📦 Instalación

### Requisitos
- Node.js (v16 o superior)
- npm o yarn

### Pasos

1. **Clona o descarga el proyecto**
```bash
git clone <tu-repositorio>
cd habit-tracker
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Inicia el servidor de desarrollo**
```bash
npm run dev
```

4. **Abre el navegador**
```
http://localhost:5173/
```

## 📁 Estructura del Proyecto

```
habit-tracker/
├── src/
│   ├── App.svelte              # Componente principal
│   ├── app.css                 # Estilos globales
│   ├── main.js                 # Punto de entrada
│   ├── assets/                 # Imágenes y recursos
│   └── components/             # Componentes de la interfaz
│       ├── HabitForm.svelte
│       ├── HabitList.svelte
│       └── HabitItem.svelte
├── public/                     # Archivos estáticos
├── index.html                  # HTML base
├── package.json                # Dependencias del proyecto
├── vite.config.js              # Configuración de Vite
└── jsconfig.json               # Configuración de JavaScript
```

## 🎮 Uso

1. **Ver tus hábitos** - La pantalla muestra tu lista de hábitos con estado actual
2. **Marcar completado** - Haz clic en el hábito para alternar su estado entre completado y pendiente
3. **Ver progreso** - Observa el porcentaje de hábitos completados y el resumen diario
4. **Reiniciar** - Usa "Reiniciar día" para comenzar de nuevo

## 🛠️ Scripts disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Construye para producción
npm run preview  # Previsualiza la build de producción
```

## 🎯 Mejoras futuras

- 💾 Persistencia de datos con LocalStorage
- 📅 Historial de días anteriores
- 🎨 Modo oscuro
- 🏆 Estadísticas detalladas
- 📤 Exportar datos

## 👨‍💻 Autor

**Hinalador** - [Jacevedosalazar@gmail.com](mailto:Jacevedosalazar@gmail.com)

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

⭐ Si te gusta este proyecto, ¡no olvides darle una estrella en GitHub!
