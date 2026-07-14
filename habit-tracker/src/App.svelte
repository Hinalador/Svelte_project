<script>
  import HabitForm from './components/HabitForm.svelte'
  import HabitList from './components/HabitList.svelte'
  import Summary from './components/Summary.svelte'
</script>

<main>
  <h2>Estado de mis hábitos</h2>
  <Summary />
  <HabitForm />
  <HabitList />
</main>

<style>
  main {
    max-width: 720px;
    margin: 0 auto;
    padding: 1.5rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.5;
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
    color: #111827;
  }

  h2 {
    margin-top: 0;
  }
</style>
