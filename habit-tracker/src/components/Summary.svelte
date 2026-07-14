<script>
  import {
    totalHabitos,
    completados,
    porcentaje,
    completeAll,
    resetAll,
  } from '../stores/habitosStore.js'

  $: alertClass =
    $porcentaje === 0
      ? 'alerta-inicio'
      : $porcentaje === 100
      ? 'alerta-exito'
      : 'alerta-progreso'
</script>

<section class="summary-card">
  <div class="dashboard">
    <div class="resumen" aria-live="polite">
      <div>
        <p class="stat-label">Hábito total</p>
        <strong>{$totalHabitos}</strong>
      </div>
      <div>
        <p class="stat-label">Completados</p>
        <strong>{$completados}</strong>
      </div>
      <div>
        <p class="stat-label">Progreso</p>
        <strong>{$porcentaje.toFixed(0)}%</strong>
      </div>
    </div>

    <div class="barra-progreso-wrap" aria-label="Progreso diario de hábitos">
      <div class="barra-progreso" style="width: {$porcentaje}%"></div>
    </div>
  </div>

  <div class="alerta {alertClass}" aria-live="polite">
    {#if $porcentaje === 0}
      <p>Aún no comienzas tu día. ¡Vamos por el primer paso! 🚀</p>
    {:else if $porcentaje < 100}
      <p>¡Buen ritmo! Sigue así para completar tu lista de hoy. 💪</p>
    {:else}
      <p>¡Espectacular! Has completado el 100% de tus hábitos hoy. 🎉🏆</p>
    {/if}
  </div>

  <div class="acciones">
    <button
      type="button"
      on:click={completeAll}
      disabled={$totalHabitos === 0 || $porcentaje === 100}
    >
      Marcar todos como completados
    </button>

    <button
      type="button"
      class="btn-secundario"
      on:click={resetAll}
      disabled={$totalHabitos === 0}
    >
      Reiniciar día
    </button>
  </div>
</section>
