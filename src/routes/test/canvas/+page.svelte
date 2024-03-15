<script>
    import Node from '../../../lib/components/Node.svelte';
  import { Subtree } from '$lib/Subtree.svelte';
  
    // Sample data for testing
    let nodes = [
      { id: 1, type: 'leaf', value: 'A', position: { x: 100, y: 100 } },
      { id: 2, type: 'leaf', value: 'B', position: { x: 200, y: 100 } }
    ];
  
    let edges = [
      { start: { x: 100, y: 100 }, end: { x: 150, y: 50 } },
      { start: { x: 200, y: 100 }, end: { x: 150, y: 50 } }
    ];
  
    // Function to simulate adding a new node and edge
    function addNode() {
      const newNodeId = nodes.length + 1;
      const newNode = {
        id: newNodeId,
        type: 'internal',
        value: 'AB',
        position: { x: 150, y: 50 }
      };
      nodes = [...nodes, newNode];
  
      // Simulate creating new edges if needed
      // For simplicity, this example doesn't add new edges
    }
  </script>
  
  <style>
    /* Additional styling as needed */
  </style>
  
  <div>
    <button on:click={addNode}>Add Node</button>
    <div class="canvas">
      <Subtree {nodes} {edges} />
    </div>
  </div>
  