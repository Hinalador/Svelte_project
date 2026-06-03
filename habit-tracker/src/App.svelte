<script>
  let habitosCompletados = 0;

  function incrementar() {
    habitosCompletados += 1; // La reasignación (=) le avisa a Svelte que debe actualizar el HTML
  }
</script>

<main>
  <h2>Progreso de hoy</h2>
  <p>Has completado {habitosCompletados} hábitos.</p>
  <button on:click={incrementar}>Marcar hábito como hecho</button>
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