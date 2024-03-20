<script>
  import { onMount } from 'svelte';
  import { select, hierarchy, tree, linkVertical } from 'd3';
  import { highlightLeftNode, highlightRightNode, highlightRoot, finishedTree } from '$lib/stores.js';

  export let rootNode;
  export let animate;

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


  $: $highlightLeftNode, drawTree();
  $: $highlightRightNode, drawTree();
  $: $highlightRoot, drawTree();


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
  const links = g.selectAll(".link")
    .data(root.links())
    .enter().append("path")
      .attr("class", "link")
      .attr("d", linkVertical().x(d => d.x).y(d => d.y))
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", d => (d.source.data.visibility === 'hidden' || d.target.data.visibility === 'hidden') ? 0 : 1);
  
    //   g.selectAll(".link")
    // .data(root.links())
    // .enter().append("text")
    // .attr("fill", "red")
    // .attr("font-size", "12px")
    // .attr("dx", d => (d.source.x + d.target.x) / 2)
    // .attr("dy", d => (d.source.y + d.target.y) / 2)
    // .style("text-anchor", "middle")
    // .text(d => d.target.data.parent.children[0] === d ? '0' : '1');

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
      .style("fill", d => d.data.highlight === 'highlight' ? 'orange' : 'steelblue');

  // Append rectangles for internal nodes
  nodes.filter(d => d.children) // Filter for internal nodes
    .append("rect")
      .attr("x", -20) // Adjust as needed to contain the text
      .attr("y", -20) // Adjust as needed to contain the text
      .attr("width", 40) // Adjust based on your text size
      .attr("height", 40) // Adjust based on your text size
      .attr("rx", 10) // Rounded corners
      .attr("ry", 10) // Rounded corners
      .style("fill", d => d.data.highlight === 'highlight' ? 'orange' : 'lightgreen');
    

  nodes.append("text")
    .attr("dy", "0.35em")
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

  export function animateTreePaths() {
    const paths = select(svg).selectAll('path.link');

    paths.each(function() {
      const path = select(this);
      const totalLength = path.node().getTotalLength();
      path
        .attr('stroke-dasharray', totalLength + ' ' + totalLength)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(2000) // Duration of the animation in milliseconds
        .attr('stroke-dashoffset', 0);
    });
  }

  // New function to animate the paths in a depth-first search manner
  // function animateTreePathsDFS(node=rootNode, delay = 0) {
  //   if (!node) return;
  //   const duration = 500; // Duration of each path animation

  //   // Animate path to this node
  //   if (node.parent) {
  //     // Assuming each path has a unique identifier based on the node's id
  //     const pathSelector = `path[data-source-id="${node.parent.id}"][data-target-id="${node.id}"]`;
  //     const path = select(svg).select(pathSelector);

  //     const pathLength = path.node().getTotalLength();
  //     path.attr('stroke-dasharray', `${pathLength} ${pathLength}`)
  //       .attr('stroke-dashoffset', pathLength)
  //       .transition()
  //       .duration(duration)
  //       .delay(delay)
  //       .attr('stroke-dashoffset', 0);
      
  //     delay += duration; // Increment delay for the next path
  //   }

  //   // Recursively animate paths to children
  //   if (node.children) {
  //     node.children.forEach(child => {
  //       animateTreePathsDFS(child, delay);
  //     });
  //   }
  // }

  // $: if (animate) {
  //   console.log('root node heirarchy');
  //   console.log(hierarchy(generateJson(rootNode)));
  // }

  // function highlightPath(root, targetName) {
  //   // Find the target node
  //   const target = root.find(d => d.data.name === targetName);
  //   if (!target) return; // Exit if the target is not found

  //   // Get the path from root to the target node
  //   const path = root.path(target);

  //   // Highlight each node in the path
  //   path.forEach(node => {
  //     // Assuming you have a method to highlight a node, e.g., by changing its color
  //     select(`.node[data-name="${node.data.name}"]`)
  //       .style("fill", "orange"); // Adjust the selector and style as needed
  //   });

  //   // Highlight links in the path
  //   path.forEach((node, i) => {
  //     if (i < path.length - 1) { // No link from the last node
  //       const nextNode = path[i + 1];
  //       select(`path.link[data-source-id="${node.data.id}"][data-target-id="${nextNode.data.id}"]`)
  //         .style("stroke", "orange"); // Adjust the selector and style as needed
  //     }
  //   });
  // }


function generateJson(rootNode) {
  if (!rootNode) return null;

  let treeJSON = {
    name: `${rootNode.id}:${rootNode.frequency}`,
    visibility: $highlightRoot === 'hidden' ? 'hidden' : 'visible',
    highlight: $highlightRoot === 'highlight' ? 'highlight' : 'normal',
    children: [],
  }

  treeJSON.children.push(generateLeftChildJSON(rootNode.left));

  treeJSON.children.push(generateRightChildJSON(rootNode.right));

  // modify right child based on stores
  treeJSON.children[0].visibility = $highlightLeftNode === 'hidden'? 'hidden' : 'visible';
  treeJSON.children[0].highlight = $highlightLeftNode === 'highlight' ? 'highlight' : 'normal';
  treeJSON.children[1].visibility = $highlightRightNode === 'hidden'? 'hidden' : 'visible';
  treeJSON.children[1].highlight = $highlightRightNode === 'highlight' ? 'highlight' : 'normal';

  return treeJSON;
}

// Function to generate JSON for the left child and its subtree
function generateLeftChildJSON(node) {
  if (!node) return [];

  let children = [];
  if (node.left) children.push(generateLeftChildJSON(node.left));
  if (node.right) children.push(generateLeftChildJSON(node.right));

  let visibility = $highlightLeftNode === 'hidden'? 'hidden' : 'visible';
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

  let visibility = $highlightRightNode === 'hidden'? 'hidden' : 'visible';
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