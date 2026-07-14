<script>
  import { createEventDispatcher } from 'svelte'

  export let habito

  const dispatch = createEventDispatcher()

  function toggle() {
    dispatch('toggle', { id: habito.id })
  }

  function eliminar() {
    dispatch('remove', { id: habito.id })
  }
</script>

<li class:completado={habito.completado}>
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
