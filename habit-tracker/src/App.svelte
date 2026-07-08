<script>
  let habitos = [
    { id: 1, nombre: "Correr 5k", completado: false },
    { id: 2, nombre: "Leer 20 páginas", completado: false },
    { id: 3, nombre: "Meditar", completado: false },
  ];

  $: total = habitos.length;
  $: completados = habitos.filter((h) => h.completado).length;
  $: porcentaje = total > 0 ? (completados / total) * 100 : 0;

  function simularProgreso() {
    const siguiente = habitos.find((h) => !h.completado);
    if (!siguiente) return;

    habitos = habitos.map((h) =>
      h.id === siguiente.id ? { ...h, completado: true } : h
    );
  }

  function reiniciarDia() {
    habitos = habitos.map((h) => ({ ...h, completado: false }));
  }
</script>

<main>
  <h2>Estado de mis hábitos</h2>
  <p class="resumen">
    Progreso actual: {completados} de {total} ({porcentaje.toFixed(0)}%)
  </p>

  <ul class="lista-habitos">
    {#each habitos as habito}
      <li class:completado={habito.completado}>
        <span>{habito.nombre}</span>
        <span class="estado">
          {habito.completado ? '✅ Completado' : '⏳ Pendiente'}
        </span>
      </li>
    {/each}
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
    <button on:click={simularProgreso} disabled={porcentaje === 100}>
      Simular completar un hábito
    </button>
    <button on:click={reiniciarDia} class="btn-secundario">
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

  .resumen {
    margin: 0.5rem 0 1.25rem;
    color: #444;
  }

  .lista-habitos {
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  }

  .lista-habitos li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #fff;
    border-bottom: 1px solid #eceff1;
  }

  .lista-habitos li:last-child {
    border-bottom: none;
  }

  .lista-habitos li.completado {
    color: #2e7d32;
  }

  .estado {
    font-size: 0.95rem;
    opacity: 0.85;
  }

  .alerta {
    padding: 1rem;
    border-radius: 8px;
    margin: 1.5rem 0;
    font-weight: 500;
  }

  .alerta-inicio {
    background-color: #e3f2fd;
    color: #0d47a1;
    border: 1px solid #bbdefb;
  }

  .alerta-progreso {
    background-color: #fff3e0;
    color: #e65100;
    border: 1px solid #ffe0b2;
  }

  .alerta-exito {
    background-color: #e8f5e9;
    color: #1b5e20;
    border: 1px solid #c8e6c9;
  }

  .acciones {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .acciones button {
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border: none;
    background-color: #1976d2;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .acciones button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .acciones button:hover:not(:disabled) {
    background-color: #125ea9;
  }

  .btn-secundario {
    background-color: #e0e0e0;
    color: #333;
  }

  .btn-secundario:hover {
    background-color: #cfd8dc;
  }
</style>
