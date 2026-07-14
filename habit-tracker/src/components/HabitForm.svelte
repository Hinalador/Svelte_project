<script>
  import { addHabit } from '../stores/habitosStore.js'

  let nuevoHabito = ''

  function submitForm(event) {
    event.preventDefault()
    const nombre = nuevoHabito.trim()
    if (!nombre) return

    addHabit(nombre)
    nuevoHabito = ''
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
