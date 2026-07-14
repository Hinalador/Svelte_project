<script>
  import { fade } from 'svelte/transition'
  import { removeHabit, toggleHabit } from '../stores/habitosStore.js'

  export let habito

  function toggle() {
    toggleHabit(habito.id)
  }

  function eliminar() {
    removeHabit(habito.id)
  }
</script>

<li class:completado={habito.completado} transition:fade>
  <button
    type="button"
    class="habito-boton"
    on:click={toggle}
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
    on:click={eliminar}
  >
    ✕
  </button>
</li>
