<script>
    import Node from './Node.svelte';
  
    export let nodes = [];
    export let edges = []; // Assuming edges are defined by pairs of positions for simplicity
  </script>
  
  <style>
    .subtree-container {
      position: relative; /* Allows absolute positioning of child nodes */
      width: 100%; /* Adjust based on your layout */
      height: 100%; /* Adjust based on your layout */
    }
    .edge {
      stroke: black;
      stroke-width: 2;
    }
  </style>
  
  <svg class="subtree-container">
    {#each edges as {start, end}}
      <line class="edge" x1={start.x} y1={start.y} x2={end.x} y2={end.y} />
    {/each}
    {#each nodes as {type, value, position}}
      <foreignObject x={position.x - 25} y={position.y - 25} width="50" height="50" overflow="visible">
        <Node {type} {value} position={{ x: 25, y: 25 }}/>
      </foreignObject>
    {/each}
  </svg>
  