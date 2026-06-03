<script>
  let completados = 0;
  let metaTotal = 5;

  // Svelte recalcula esto automáticamente cada vez que 'completados' cambie
  $: porcentaje = (completados / metaTotal) * 100;
  $: felicitacion =
    completados >= metaTotal ? "¡Meta del día alcanzada! 🎉" : "";
</script>

<main>
  <p>Progreso: {completados} de {metaTotal} ({porcentaje}%)</p>
  <button on:click={() => completados++}>+</button>

  {#if felicitacion}
    <p>{felicitacion}</p>
  {/if}
</main>

<style>
  main {
    font-family: sans-serif;
    text-align: center;
    padding: 2rem;
  }
  button {
    background-color: #ff3e00;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
