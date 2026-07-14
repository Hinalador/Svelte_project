import { derived, writable } from 'svelte/store'

const STORAGE_KEY = 'habit-tracker-svelte-v5'

const initialHabitos = [
  { id: 1, nombre: 'Correr 5k', completado: false },
  { id: 2, nombre: 'Leer 20 páginas', completado: false },
  { id: 3, nombre: 'Meditar', completado: false },
]

function createHabitosStore() {
  const { subscribe, set, update } = writable(initialHabitos, (set) => {
    if (typeof window === 'undefined') return

    const almacenado = window.localStorage.getItem(STORAGE_KEY)

    if (almacenado) {
      try {
        set(JSON.parse(almacenado))
      } catch (error) {
        console.warn('No se pudo leer los hábitos guardados:', error)
      }
    }

    const unsubscribe = subscribe((current) => {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current))
    })

    return unsubscribe
  })

  return {
    subscribe,
    addHabit(nombre) {
      update((habitos) => {
        const nextId = Math.max(...habitos.map((h) => h.id), 0) + 1
        return [...habitos, { id: nextId, nombre, completado: false }]
      })
    },
    toggleHabit(id) {
      update((habitos) =>
        habitos.map((h) =>
          h.id === id ? { ...h, completado: !h.completado } : h
        )
      )
    },
    removeHabit(id) {
      update((habitos) => habitos.filter((h) => h.id !== id))
    },
    completeAll() {
      update((habitos) => habitos.map((h) => ({ ...h, completado: true })))
    },
    resetAll() {
      update((habitos) => habitos.map((h) => ({ ...h, completado: false })))
    },
  }
}

export const habitos = createHabitosStore()
export const totalHabitos = derived(habitos, ($habitos) => $habitos.length)
export const completados = derived(habitos, ($habitos) =>
  $habitos.filter((h) => h.completado).length
)
export const porcentaje = derived(
  [totalHabitos, completados],
  ([$total, $completados]) => ($total > 0 ? ($completados / $total) * 100 : 0)
)

export const { addHabit, toggleHabit, removeHabit, completeAll, resetAll } =
  habitos
