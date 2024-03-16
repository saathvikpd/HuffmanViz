<script>
    import { priorityQueueStore, highlightTopBar } from '$lib/stores.js';
  
    function executeNextStep() {
        // Logic to determine when to highlight the top bar...
        // This is a simplified example. Adjust according to your app's logic.
        highlightTopBar.set(true); // Set to true to trigger highlighting
        // Reset highlighting after a certain action is completed
        // shouldHighlightTopBar.set(false); might be called in subsequent steps or conditions
    }
</script>
  
  <button class="btn btn-primary" on:click={executeNextStep}>Next Step</button>
  