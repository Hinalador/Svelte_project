<script>
  let habitos = [
    { id: 1, nombre: "Correr 5k", completado: false },
    { id: 2, nombre: "Leer 20 páginas", completado: false },
    { id: 3, nombre: "Meditar", completado: false },
  ];

  // 1. Declaraciones reactivas automáticas
  $: total = habitos.length;
  $: completados = habitos.filter((h) => h.completado).length;
  $: porcentaje = total > 0 ? (completados / total) * 100 : 0;

  function simularProgreso() {
    const siguiente = habitos.find((h) => !h.completado);
    if (siguiente) {
      siguiente.completado = true;
      // 2. Reasignación con Spread para que Svelte detecte el cambio de datos profundos
      habitos = [...habitos];
    }
  }

  function reiniciarDia() {
    // 3. Reseteo usando .map() retornando un nuevo objeto estructurado
    habitos = habitos.map((h) => ({ ...h, completado: false }));
  }
</script>

<main>
  <h2>Estado de mis Hábitos</h2>
  <p>Progreso actual: {completados} de {total} ({porcentaje.toFixed(0)}%)</p>

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
  /* Aquí puedes mantener los estilos de las alertas provistos en tu guía */
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
  .acciones button {
    padding: 0.5rem 1rem;
    margin-right: 0.5rem;
    cursor: pointer;
  }
  .btn-secundario {
    background-color: #e0e0e0;
    border: none;
    color: #333;
  }
</style>
