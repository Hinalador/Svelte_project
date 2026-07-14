# Habit Tracker (Svelte)

Una aplicación de seguimiento de hábitos construida con **Svelte 5** y **Vite**, pensada para tener una experiencia ligera, clara y accesible.

## Descripción del proyecto

Este repositorio contiene un mini proyecto llamado `habit-tracker`, donde puedes:

- Añadir hábitos diarios personalizados.
- Marcar hábitos como completados o pendientes.
- Ver el progreso en porcentaje y estadísticas rápidas.
- Consultar el resumen diario en una tarjeta visual.
- Reiniciar el día para empezar de nuevo.
- Guardar los hábitos automáticamente en el navegador con LocalStorage.

La interfaz se ha actualizado para tener mejor contraste, fondo claro y campos de entrada legibles. Recientemente se refinó el diseño para una apariencia más limpia y moderna, con un panel de resumen UI más claro y una experiencia responsive mejorada.

## Características principales

- ✅ Gestión de hábitos con opciones de completar y eliminar.
- 💾 Persistencia local para mantener los hábitos entre sesiones.
- 📈 Resumen diario visual con progreso y métricas.
- 🎨 UI mejorada con contraste, bordes suaves y enfoque accesible.
- 📱 Diseño responsive para uso en escritorio y móvil.
- ⚡ Construido con la versión moderna de Svelte y Vite.

## Estructura del repositorio

```
Svelte_project/
├── habit-tracker/
│   ├── src/
│   │   ├── App.svelte
│   │   ├── app.css
│   │   ├── main.js
│   │   ├── components/
│   │   │   ├── HabitForm.svelte
│   │   │   ├── HabitList.svelte
│   │   │   ├── HabitItem.svelte
│   │   │   └── Summary.svelte
│   │   └── ...
│   ├── public/
│   ├── package.json
│   ├── svelte.config.js
│   ├── vite.config.js
│   └── README.md
├── README.md
└── ...
```

## Instalación y ejecución

1. Clona este repositorio:
   ```bash
   git clone https://github.com/Hinalador/Svelte_project.git
   ```

2. Entra en la carpeta del subproyecto:
   ```bash
   cd Svelte_project/habit-tracker
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

5. Abre el navegador en:
   ```
   http://localhost:5173/
   ```

## Tecnologías utilizadas

- **Svelte 5**
- **Vite**
- **JavaScript**
- **CSS3**

## Uso

- Escribe un nuevo hábito en el campo de entrada.
- Presiona `Añadir hábito` para agregarlo a la lista.
- Haz clic sobre un hábito para marcarlo como completado o pendiente.
- Observa el resumen diario y el porcentaje de hábitos completados.
- Usa `Marcar todos como completados` para finalizar la lista.
- Usa `Reiniciar día` para limpiar el estado completado.

## Notas

- El proyecto está diseñado como un ejercicio de UI y experiencia de usuario con Svelte.
- El README del subproyecto en `habit-tracker/README.md` tiene información más detallada del componente.
