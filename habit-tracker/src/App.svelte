<script>
  import { onMount } from 'svelte'

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

  function agregarHabito() {
    const nombre = nuevoHabito.trim()
    if (!nombre) return

    habitos = [
      ...habitos,
      { id: nextId++, nombre, completado: false },
    ]
    nuevoHabito = ''
  }

  function toggleHabito(id) {
    habitos = habitos.map((h) =>
      h.id === id ? { ...h, completado: !h.completado } : h
    )
  }

  function eliminarHabito(id) {
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

  <form class="formulario-habito" on:submit|preventDefault={agregarHabito}>
    <label>
      Agregar hábito nuevo
      <input
        type="text"
        bind:value={nuevoHabito}
        placeholder="Ej. Practicar gratitud"
        aria-label="Nombre del nuevo hábito"
      />
    </label>
    <button type="submit" disabled={nuevoHabito.trim() === ''}>
      Añadir hábito
    </button>
  </form>

  <ul class="lista-habitos">
    {#if habitos.length === 0}
      <li class="vacío">Aún no tienes hábitos. Agrega uno para comenzar.</li>
    {:else}
      {#each habitos as habito}
        <li class:completado={habito.completado}>
          <button
            type="button"
            class="habito-boton"
            on:click={() => toggleHabito(habito.id)}
          >
            <span class="nombre-habito">{habito.nombre}</span>
            <span class="estado">
              {habito.completado ? '✅ Completado' : '⏳ Pendiente'}
            </span>
          </button>
          <button
            type="button"
            class="btn-eliminar"
            aria-label="Eliminar hábito {habito.nombre}"
            on:click={() => eliminarHabito(habito.id)}
          >
            ✕
          </button>
        </li>
      {/each}
    {/if}
  </ul>

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

  .formulario-habito {
    display: grid;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .formulario-habito label {
    display: grid;
    gap: 0.5rem;
    font-weight: 600;
    color: #111827;
  }

  .formulario-habito input {
    width: 100%;
    padding: 0.9rem 1rem;
    border-radius: 12px;
    border: 1px solid #d1d5db;
    background: #fff;
    font-size: 1rem;
  }

  .formulario-habito button {
    width: max-content;
    padding: 0.9rem 1.25rem;
    border-radius: 12px;
    border: none;
    background-color: #0f766e;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .formulario-habito button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .formulario-habito button:hover:not(:disabled) {
    background-color: #115e59;
  }

  .lista-habitos {
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  }

  .lista-habitos li {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.75rem;
    align-items: center;
    padding: 1rem;
    background: #ffffff;
    border-bottom: 1px solid #e5e7eb;
  }

  .lista-habitos li:last-child {
    border-bottom: none;
  }

  .lista-habitos li.completado {
    color: #166534;
    background: #f0fdf4;
  }

  .habito-boton {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 0;
    border: none;
    background: transparent;
    text-align: left;
    cursor: pointer;
    font: inherit;
    color: inherit;
  }

  .nombre-habito {
    font-weight: 600;
  }

  .estado {
    font-size: 0.95rem;
    opacity: 0.85;
  }

  .btn-eliminar {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 999px;
    border: none;
    background: #f8fafc;
    color: #9ca3af;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  .btn-eliminar:hover {
    background: #fee2e2;
    color: #b91c1c;
  }

  .vacío {
    padding: 1rem;
    text-align: center;
    color: #6b7280;
  }

  .alerta {
    padding: 1rem;
    border-radius: 12px;
    margin: 1.5rem 0;
    font-weight: 500;
  }

  .alerta-inicio {
    background-color: #dbeafe;
    color: #1e3a8a;
    border: 1px solid #bfdbfe;
  }

  .alerta-progreso {
    background-color: #fff7ed;
    color: #c2410c;
    border: 1px solid #ffedd5;
  }

  .alerta-exito {
    background-color: #ecfdf5;
    color: #166534;
    border: 1px solid #d1fae5;
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
    .lista-habitos li {
      grid-template-columns: 1fr;
    }

    .acciones {
      flex-direction: column;
    }
  }
</style>
