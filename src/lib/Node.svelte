<script>
    export let type; // 'leaf' or 'internal'
    export let value;
    export let position = { x: 0, y: 0 }; // Default position
  </script>
  
  <style>
    .node {
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 14px;
      position: absolute;
      transform: translate(-50%, -50%); /* Center the node based on its position */
    }
    .leaf {
      width: 40px;
      height: 40px;
      background-color: green;
      border-radius: 50%; /* Makes the div circular */
    }
    .internal {
      width: 50px;
      height: 50px;
      background-color: blue;
      border-radius: 10px; /* Rounded edges for the square */
    }
  </style>
  
  <div class="node {type}" style="left: {position.x}px; top: {position.y}px;">
    {value}
  </div>
  