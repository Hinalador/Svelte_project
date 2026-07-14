<script>
  import HabitItem from './HabitItem.svelte'
  import { habitos } from '../stores/habitosStore.js'
  import { fade } from 'svelte/transition'
</script>

<ul class="lista-habitos">
  {#if $habitos.length === 0}
    <li class="vacío" transition:fade>
      Aún no tienes hábitos. Agrega uno para comenzar.
    </li>
  {:else}
    {#each $habitos as habito (habito.id)}
      <HabitItem {habito} />
    {/each}
  {/if}
</ul>
