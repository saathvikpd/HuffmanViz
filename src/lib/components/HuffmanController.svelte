<script>
    import TreeGraph from './TreeGraph.svelte';
    import { 
        priorityQueueStore,
        highlightTopBar, 
        highlightLeftNode,
        highlightRightNode,
        highlightRoot } from '$lib/stores.js';

    let count = 0;
    let nodeA = null;
    let nodeB = null;

    function executeNextStep() {
        let currentStep = count % 4 + 1; // Adjusted for the 4-step cycle

        switch (currentStep) {
            case 1:
                console.log("Highlighting the top bar and left node");
                highlightTopBar.set(true);
                highlightLeftNode.set(true);
                nodeA = priorityQueueStore.peek();
                // Intention to draw nodeA on tree and highlight it will be reflected in the TreeGraph component
                break;
            case 2:
                console.log("Drawing and highlighting the second node");
                priorityQueueStore.extractMin();
                highlightLeftNode.set(false);
                highlightRightNode.set(true);
                nodeB = priorityQueueStore.peek();
                // Draw nodeB on tree and highlight it. NodeA highlight removal is handled by TreeGraph.
                break;
            case 3:
                console.log("Creating a new parent node from A and B, removing highlights");
                highlightTopBar.set(false);
                highlightRightNode.set(false);
                highlightRoot.set(true);
                priorityQueueStore.extractMin();
                // call exported function from TreeGraph to create a new parent node from A and B
                break;
            case 4:
                console.log("Moving the new parent node to the waiting room");
                highlightRoot.set(false);
                // Resetting nodeA and nodeB to null to simulate the movement to the waiting room.
                nodeA = null;
                nodeB = null;
                break;
            default:
                console.log('Resetting or handling completion.');
                currentStep = 0; // Reset or handle completion
                break;
        }
        // Prepare for the next step on the next button press
        count++;
    }
    
</script>

<button class="btn btn-outline-primary btn-sm" on:click={executeNextStep}>Next Step</button>

<TreeGraph {nodeA} {nodeB} />
