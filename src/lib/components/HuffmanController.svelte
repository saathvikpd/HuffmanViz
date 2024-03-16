<!-- HuffmanController.svelte -->
<script>
    import { TreeNode } from '$lib/modules/TreeNode';
    import TreeGraph from './TreeGraph.svelte';
    import DynamicTree from './DynamicTree.svelte';
    import { 
        priorityQueueStore,
        highlightTopBar, 
        highlightLeftNode,
        highlightRightNode,
        highlightRoot } from '$lib/stores.js';
	import Frequencies from './Frequencies.svelte';

    let count = 0;
    let nodeA = null;
    let nodeB = null;
    let rootNode = null;

    function executeNextStep() {
        let currentStep = count % 5 + 1; // Adjusted for the 4-step cycle

        switch (currentStep) {
            case 1:
                console.log("Highlighting the top bar and left node");
                // highlight the top bar in priorityQueueStore
                highlightTopBar.set(true);
                // only highlight the left child, all else invisible
                highlightLeftNode.set('highlight');
                // Create root node for tree graph
                nodeA = priorityQueueStore.peek();
                nodeB = priorityQueueStore.peekSecond();
                let parentValue = nodeA.frequency+nodeB.frequency;
                rootNode = new TreeNode("Internal: "+parentValue, parentValue, nodeA, nodeB);
                // log newly created node in tree graph to the console
                console.log(nodeA);
                break;
            case 2:
                console.log("Drawing and highlighting the second node");
                // remove left node from the priority queue
                priorityQueueStore.extractMin();
                // both children visible but only right child highlighted
                highlightLeftNode.set('visible');
                highlightRightNode.set('highlight');
                // log newly created node in tree graph to the console
                console.log(nodeB);
                break;
            case 3:
                console.log("Creating a new parent node from A and B, removing highlights");
                // remove highlight from priority queue
                highlightTopBar.set(false);
                // full tree is visible with no nodes highlighted
                highlightRightNode.set('visible');
                highlightRoot.set('visible');
                // remove right node from the priority queue
                priorityQueueStore.extractMin();
                break;
            case 4:
                console.log("Moving the new parent node into priority queue");
                // highlight root node and newly inserted node in priority queue
                highlightRoot.set('highlight');
                // highlightNewBar.set(true) - highlights newly inserted bar in histogram (doesnt exist yet)
                priorityQueueStore.insert(rootNode);
                // Resetting nodeA and nodeB to null
                nodeA = null;
                nodeB = null;
                break;
            case 5:
                console.log("Moving subtree to the waiting room");
                // hide the entire tree
                highlightRoot.set('hidden');
                highlightRightNode.set('hidden');
                highlightLeftNode.set('hidden');
                highlightTopBar.set(false);
                // reset root node
                rootNode = null;
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


<DynamicTree {rootNode} />