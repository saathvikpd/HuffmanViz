<script>
    import { priorityQueueStore, highlightTopBar, highlightSecondBar } from '$lib/stores.js';
  
    let count = 0;
    let nodeA = null;
    let nodeB = null;

    function executeNextStep() {
        let currentStep = count % 5 + 1;

        // if priorityQueueStore is empty, then we are done


        switch (currentStep) {
        case 1:
            console.log("Highlighting the top bar");
            // need to check if this is a leaf or internal (could be handled by a different function)
            highlightTopBar.set(true);
            nodeA = priorityQueueStore.peek();
            // draw nodeA on tree
            break;
        case 2:
            console.log("Highlighting the second bar");
            // remove nodeA from the priority queue
            priorityQueueStore.extractMin();
            highlightTopBar.set(false);
            highlightSecondBar.set(true);
            nodeB = priorityQueueStore.peek2();
            // draw nodeB on tree
            break;

        // in case 3 we create a new parent node from A and B and draw it on tree
        case 3:
            // remove node B from the priority queue
            priorityQueueStore.extractMin();
            highlightSecondBar.set(false);
            // create a new parent node from A and B and draw it on tree
            break;
        case 4:
            // move the new parent node to the waiting room
            break;

        default:
            console.log('Step not implemented or resetting.');
            currentStep = 0; // Reset or handle completion
            break;
        }
    
        // Prepare for the next step on the next button press
        count++;
    }
</script>
  
  <button class="btn btn-primary" on:click={executeNextStep}>Next Step</button>
  