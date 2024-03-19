<!-- HuffmanController.svelte -->
<script>
    import { TreeNode } from '$lib/modules/TreeNode';
    import DynamicTree from './DynamicTree.svelte';
    // import {runHuffman} from '$lib/components/Encoding.svelte';
    import { 
        priorityQueueStore,
        highlightTopBar, 
        highlightLeftNode,
        highlightRightNode,
        highlightRoot,
        highlightBarIndex,
        finishedTree } from '$lib/stores.js';

    let count = 0;
    let nodeA = null;
    let nodeB = null;
    let rootNode = null;
    let rootIndexQueue = null;
    $: isTreeConstructionComplete = false;

    finishedTree.subscribe(value => {
        isTreeConstructionComplete = value;
    });

    const steps = 5;

    function executeNextStep() {

        let currentStep = count % steps + 1; // 5-step cycle through switches

        switch (currentStep) {
            case 1:
                console.log("Step 1: Highlighting the top bar and left node");
                // highlight the top bar in priorityQueueStore
                highlightTopBar.set(true);
                // Create root node for tree graph
                nodeA = priorityQueueStore.peek();
                nodeB = priorityQueueStore.peekSecond();
                let parentValue = nodeA.frequency + nodeB.frequency;
                rootNode = new TreeNode(null, parentValue, nodeA, nodeB);
                // only highlight the left child and display subchildren if they exist, all else invisible
                highlightLeftNode.set('highlight');
                // log newly created node in tree graph to the console
                console.log('selected node', nodeA);
                break;
            case 2:
                console.log("Step 2: Drawing and highlighting the second node");
                // remove left node from the priority queue
                priorityQueueStore.extractMin();
                // both children and subchildren visibfle but only right child highlighted
                highlightLeftNode.set('visible');
                highlightRightNode.set('highlight');
                // log newly created node in tree graph to the console
                console.log(nodeB);
                break;
            case 3:
                console.log("Step 3: Creating a new parent node from A and B and inserting it into priority queue");
                // remove highlight from priority queue
                highlightTopBar.set(false);
                // remove right node from the priority queue
                priorityQueueStore.extractMin();
                // full tree is visible with root node highlighted
                highlightRightNode.set('visible');
                highlightRoot.set('highlight');

                // check if tree is constructed
                if (priorityQueueStore.getSize() === 0) {
                    finishedTree.set(true);
                    highlightRoot.set('visible');
                    priorityQueueStore.clear();
                    console.log("Tree is finished!");
                    console.log('priority queue',priorityQueueStore.getSize());
                    break;
                }

                // insert new parent node into priority queue and highlight it
                priorityQueueStore.insert(rootNode, (index) => {
                    rootIndexQueue = index;
                });
                highlightBarIndex.set({ on: true, index: rootIndexQueue });
                
                break;
            case 4:
                console.log("Step 4: remove highlight from root node");
                // remove highlight from root node and in priority queue
                highlightRoot.set('visible');
                highlightBarIndex.set({ on: false, index: rootIndexQueue });
                // Resetting nodeA and nodeB to null
                nodeA = null;
                nodeB = null;
                break;
            case 5:
                console.log("Step 5: Moving subtree to the waiting room");
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

{#if !isTreeConstructionComplete}
    <button class="btn btn-outline-primary btn-sm" on:click={executeNextStep}>Next Step</button>
   
    <!-- {runHuffman()} -->
{/if}

{#if isTreeConstructionComplete}
    <button class="btn btn-outline-primary btn-sm" onclick= "window.location.href='/conclusion'">See conclusion</button>
{/if}


<DynamicTree {rootNode} {isTreeConstructionComplete} />