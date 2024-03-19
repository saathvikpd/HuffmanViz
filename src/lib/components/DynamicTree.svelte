<script>
  import { onMount, afterUpdate } from 'svelte';
  import { select, hierarchy, tree, linkVertical } from 'd3';
  import { highlightLeftNode, highlightRightNode, highlightRoot } from '$lib/stores.js';

  export let rootNode;
  export let isTreeConstructionComplete = false;

  let svg;
  let width = 800; // Default width
  let height = 600; // Default height

  // This function now safely assumes it's running in a browser environment
  function updateDimensions() {
    if (svg) {
      width = svg.clientWidth;
      height = svg.clientHeight;
      drawTree(); // Redraw the tree using the updated dimensions
    }
  }

  onMount(() => {
    updateDimensions(); // Set initial dimensions based on the SVG element size
    window.addEventListener('resize', updateDimensions); // Safely add the event listener after mounting

    // Ensure the initial tree is drawn
    drawTree();
  });


  let highlightStatus = {
    left: 'hidden',
    right: 'hidden',
    root: 'hidden'
  };

  // Subscribe to highlight status stores
  highlightLeftNode.subscribe(value => {
    highlightStatus.left = value;
    drawTree();
  });
  highlightRightNode.subscribe(value => {
    highlightStatus.right = value;
    drawTree();
  });
  highlightRoot.subscribe(value => {
    highlightStatus.root = value;
    drawTree();
  });

  onMount(drawTree);
  afterUpdate(drawTree);


function drawTree() {
  if (!rootNode) return;

  const treeData = generateJson(rootNode); // Generate tree JSON including visibility status
  const root = hierarchy(treeData);
  const treeLayout = tree().size([width, height/2]);
  treeLayout(root);

  select(svg).selectAll("*").remove(); // Clear the SVG for redrawing

  const g = select(svg)
    .append("g")
    .attr("transform", "translate(0,100)"); // Margin for the tree

  // Draw links with visibility controls
  g.selectAll(".link")
    .data(root.links())
    .enter().append("path")
      .attr("class", "link")
      .attr("d", linkVertical().x(d => d.x).y(d => d.y))
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", d => (d.source.data.visibility === 'hidden' || d.target.data.visibility === 'hidden') ? 0 : 1);

  // Draw nodes with visibility and highlight controls
  const nodes = g.selectAll(".node")
    .data(root.descendants())
    .enter().append("g")
      .attr("class", d => `node ${d.data.visibility}`)
      .attr("transform", d => `translate(${d.x},${d.y})`)
      .style("opacity", d => d.data.visibility === 'hidden' ? 0 : 1);

  // Append circles for leaf nodes
  nodes.filter(d => !d.children) // Filter for leaf nodes
    .append("circle")
      .attr("r", 20) // Increased radius to better contain text
      .style("fill", d => d.data.highlight === 'highlight' ? 'red' : 'steelblue');

  // Append rectangles for internal nodes
  nodes.filter(d => d.children) // Filter for internal nodes
    .append("rect")
      .attr("x", -15) // Adjust as needed to contain the text
      .attr("y", -15) // Adjust as needed to contain the text
      .attr("width", 30) // Adjust based on your text size
      .attr("height", 30) // Adjust based on your text size
      .attr("rx", 5) // Rounded corners
      .attr("ry", 5) // Rounded corners
      .style("fill", d => d.data.highlight === 'highlight' ? 'red' : 'lightgreen');
    

  nodes.append("text")
    .attr("dy", "0.35em")
    .attr("x", d => d.children ? -12 : 12)
    .style("text-anchor", "middle")
    .each(function(d) {
      const regex = /i(\d+):/;
      const match = d.data.name.match(regex);
      if (match) {
        const [, subscript] = match;
        const parts = d.data.name.split(':');
        const base = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
        base.textContent = 'i';

        const subscriptElement = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
        subscriptElement.setAttribute("baseline-shift", "sub");
        subscriptElement.setAttribute("font-size", "smaller");
        subscriptElement.textContent = subscript;

        const colonFrequency = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
        colonFrequency.textContent = `:${parts[1]}`;

        this.appendChild(base);
        this.appendChild(subscriptElement);
        this.appendChild(colonFrequency);
      } else { // For nodes that do not match the internal node pattern, display the name directly
          this.textContent = d.data.name;
        }
      });
  }

function generateJson(rootNode) {
  if (!rootNode) return null;

  let treeJSON = {
    name: `${rootNode.id}:${rootNode.frequency}`,
    visibility: highlightStatus.root === 'hidden' ? 'hidden' : 'visible',
    highlight: highlightStatus.root === 'highlight' ? 'highlight' : 'normal',
    children: [],
  }

  treeJSON.children.push(generateLeftChildJSON(rootNode.left));

  treeJSON.children.push(generateRightChildJSON(rootNode.right));

  // modify right child based on stores
  treeJSON.children[0].visibility = highlightStatus.left === 'hidden'? 'hidden' : 'visible';
  treeJSON.children[0].highlight = highlightStatus.left === 'highlight' ? 'highlight' : 'normal';
  treeJSON.children[1].visibility = highlightStatus.right === 'hidden'? 'hidden' : 'visible';
  treeJSON.children[1].highlight = highlightStatus.right === 'highlight' ? 'highlight' : 'normal';

  return treeJSON;
}

// Function to generate JSON for the left child and its subtree
function generateLeftChildJSON(node) {
  if (!node) return [];

  let children = [];
  if (node.left) children.push(generateLeftChildJSON(node.left));
  if (node.right) children.push(generateLeftChildJSON(node.right));

  let visibility = highlightStatus.left === 'hidden'? 'hidden' : 'visible';
  let highlight = 'normal';

  return {
    name: `${node.id}:${node.frequency}`,
    visibility,
    highlight,
    children: children.length ? children : null,
  };
}

// Function to generate JSON for the right child and its subtree
function generateRightChildJSON(node) {
  if (!node) return [];

  let children = [];
  if (node.left) children.push(generateRightChildJSON(node.left));
  if (node.right) children.push(generateRightChildJSON(node.right));

  let visibility = highlightStatus.right === 'hidden'? 'hidden' : 'visible';
  let highlight = 'normal';

  return {
    name: `${node.id}:${node.frequency}`,
    visibility,
    highlight,
    children: children.length ? children : null,
  };
}

</script>

<svg bind:this={svg} width="90%" height=600></svg>

<style>

</style>