<script>
  import HabitItem from './HabitItem.svelte'
  import { createEventDispatcher } from 'svelte'

  /**
   * @typedef {{ id: number; nombre: string; completado: boolean }} Habit
   * @typedef {{ detail: { id: number } }} HabitEvent
   */

  /** @type {Habit[]} */
  export let habitos = []

  const dispatch = createEventDispatcher()

  /**
   * @param {HabitEvent} event
   */
  function handleToggle(event) {
    dispatch('toggle', event.detail)
  }

  /**
   * @param {HabitEvent} event
   */
  function handleRemove(event) {
    dispatch('remove', event.detail)
  }
</script>

<ul class="lista-habitos">
  {#if habitos.length === 0}
    <li class="vacío">Aún no tienes hábitos. Agrega uno para comenzar.</li>
  {:else}
    {#each habitos as habito (habito.id)}
      <HabitItem
        {habito}
        on:toggle={handleToggle}
        on:remove={handleRemove}
      />
    {/each}
  {/if}
</ul>
