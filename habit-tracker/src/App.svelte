<script>
  import { onMount } from 'svelte'
  import HabitForm from './components/HabitForm.svelte'
  import HabitList from './components/HabitList.svelte'

/**
 * @typedef {{ id: number; nombre: string; completado: boolean }} Habit
 * @typedef {{ detail: { nombre: string } }} AddHabitEvent
 * @typedef {{ detail: { id: number } }} HabitActionEvent
 */

  const STORAGE_KEY = 'habit-tracker-svelte-v5'

  let habitos = [
    { id: 1, nombre: 'Correr 5k', completado: false },
    { id: 2, nombre: 'Leer 20 páginas', completado: false },
    { id: 3, nombre: 'Meditar', completado: false },
  ]

  let nextId = 4
  let nuevoHabito = ''
  let inicializado = false

  onMount(() => {
    const almacenado = window.localStorage.getItem(STORAGE_KEY)
    if (almacenado) {
      try {
        habitos = JSON.parse(almacenado)
        nextId = Math.max(...habitos.map((h) => h.id), 0) + 1
      } catch (error) {
        console.warn('No se pudo leer los hábitos guardados:', error)
      }
    }
    inicializado = true
  })

  $: if (inicializado) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(habitos))
  }

  $: total = habitos.length
  $: completados = habitos.filter((h) => h.completado).length
  $: porcentaje = total > 0 ? (completados / total) * 100 : 0

  /**
   * @param {AddHabitEvent} event
   */
  function handleAdd(event) {
    const nombre = event.detail.nombre.trim()
    if (!nombre) return

    habitos = [
      ...habitos,
      { id: nextId++, nombre, completado: false },
    ]
    nuevoHabito = ''
  }

  /**
   * @param {HabitActionEvent} event
   */
  function handleToggle(event) {
    const id = event.detail.id
    habitos = habitos.map((h) =>
      h.id === id ? { ...h, completado: !h.completado } : h
    )
  }

  /**
   * @param {HabitActionEvent} event
   */
  function handleDelete(event) {
    const id = event.detail.id
    habitos = habitos.filter((h) => h.id !== id)
  }

  function completarTodos() {
    habitos = habitos.map((h) => ({ ...h, completado: true }))
  }

  function reiniciarDia() {
    habitos = habitos.map((h) => ({ ...h, completado: false }))
  }
</script>

<main>
  <h2>Estado de mis hábitos</h2>

  <section class="dashboard">
    <div class="resumen" aria-live="polite">
      <strong>{completados}</strong> de <strong>{total}</strong> hábitos completados
      <span class="porcentaje">({porcentaje.toFixed(0)}%)</span>
    </div>

    <div class="barra-progreso-wrap" aria-label="Progreso diario de hábitos">
      <div class="barra-progreso" style="width: {porcentaje}%"></div>
    </div>
  </section>

  <HabitForm bind:nuevoHabito on:add={handleAdd} />

  <HabitList {habitos} on:toggle={handleToggle} on:remove={handleDelete} />

  {#if porcentaje === 0}
    <div class="alerta alerta-inicio">
      <p>Aún no comienzas tu día. ¡Vamos por el primer paso! 🚀</p>
    </div>
  {:else if porcentaje < 100}
    <div class="alerta alerta-progreso">
      <p>¡Buen ritmo! Sigue así para completar tu lista de hoy. 💪</p>
    </div>
  {:else}
    <div class="alerta alerta-exito">
      <p>¡Espectacular! Has completado el 100% de tus hábitos hoy. 🎉🏆</p>
    </div>
  {/if}

  <div class="acciones">
    <button type="button" on:click={completarTodos} disabled={porcentaje === 100}>
      Marcar todos como completados
    </button>
    <button type="button" on:click={reiniciarDia} class="btn-secundario" disabled={total === 0}>
      Reiniciar día
    </button>
  </div>
</main>

<style>
  main {
    max-width: 720px;
    margin: 0 auto;
    padding: 1.5rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.5;
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
    color: #111827;
  }

  h2 {
    margin-top: 0;
  }

  .dashboard {
    display: grid;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .resumen {
    font-size: 1rem;
    color: #1f2937;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
  }

  .porcentaje {
    color: #0f766e;
  }

  .barra-progreso-wrap {
    height: 1rem;
    width: 100%;
    border-radius: 999px;
    background: #e2e8f0;
    overflow: hidden;
  }

  .barra-progreso {
    height: 100%;
    background: linear-gradient(135deg, #0f766e, #14b8a6);
    transition: width 0.25s ease;
  }

  .acciones {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .acciones button {
    padding: 0.85rem 1.25rem;
    border-radius: 12px;
    border: none;
    background-color: #0f766e;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .acciones button:hover:not(:disabled) {
    background-color: #115e59;
  }

  .acciones button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .btn-secundario {
    background-color: #e5e7eb;
    color: #111827;
  }

  .btn-secundario:hover:not(:disabled) {
    background-color: #d1d5db;
  }

  @media (max-width: 640px) {
    .acciones {
      flex-direction: column;
    }
  }
</style>
