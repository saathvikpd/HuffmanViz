<script>
  import { priorityQueueStore } from '$lib/stores.js';

  let newItemCharacter = '';
  let newItemFrequency = 0;

  // Add item to priority queue
  function addItem() {
    priorityQueueStore.insert({ character: newItemCharacter, frequency: parseInt(newItemFrequency, 10) },
    (index) => {
      console.log(`Item inserted at index ${index}`);
    });
    newItemCharacter = '';
    newItemFrequency = 0;
  }

  // Example usage of extractMin (note: async behavior needs handling for extracted item)
  function removeMin() {
    const item = priorityQueueStore.extractMin();
    console.log('Extracted:', item);
  }
</script>

<div>
  <input type="text" bind:value={newItemCharacter} placeholder="Character" />
  <input type="number" bind:value={newItemFrequency} placeholder="Frequency" />
  <button on:click={addItem}>Add to Queue</button>
  <button on:click={removeMin}>Extract Min</button>
</div>

<h2>Current Queue:</h2>
<ul>
  {#each $priorityQueueStore as item}
    <li>{item.character} - {item.frequency}</li>
  {/each}
</ul>
