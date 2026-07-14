<script>
  import { createEventDispatcher } from 'svelte'

  export let nuevoHabito = ''

  const dispatch = createEventDispatcher()

  function submitForm(event) {
    event.preventDefault()
    const nombre = nuevoHabito.trim()
    if (!nombre) return

    dispatch('add', { nombre })
  }
</script>

<form class="formulario-habito" on:submit={submitForm}>
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
