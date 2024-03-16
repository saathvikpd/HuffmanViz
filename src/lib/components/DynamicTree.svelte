<script>
  import { onMount, afterUpdate } from 'svelte';
  import { select, hierarchy, tree, linkVertical } from 'd3';
  import { highlightLeftNode, highlightRightNode, highlightRoot } from '$lib/stores.js';

  export let rootNode;

  let svg;
  const width = 800;
  const height = 600;

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

    const treeData = generateTreeJson(rootNode, true); // Generate tree JSON including visibility status
    const root = hierarchy(treeData);
    const treeLayout = tree().size([width, height/2]);
    treeLayout(root);

    select(svg).selectAll("*").remove(); // Clear the SVG for redrawing

    const g = select(svg)
      .append("g")
      .attr("transform", "translate(0,100)"); // Margin for the tree

    // Draw links
    g.selectAll(".link")
      .data(root.links())
      .enter().append("path")
        .attr("class", "link")
        .attr("d", linkVertical().x(d => d.x).y(d => d.y))
        .attr("fill", "none")
        .attr("stroke", "#555");

    // Draw nodes with visibility and highlight controls
    const nodes = g.selectAll(".node")
      .data(root.descendants())
      .enter().append("g")
        .attr("class", d => `node ${d.data.visibility}`)
        .attr("transform", d => `translate(${d.x},${d.y})`)
        .style("display", d => d.data.visibility === 'hidden' ? 'none' : 'block');

    nodes.append("circle")
      .attr("r", 10)
      .style("fill", d => d.data.highlight === 'highlight' ? 'red' : '#999');

    nodes.append("text")
      .attr("dy", "0.35em")
      .attr("x", d => d.children ? -12 : 12)
      .style("text-anchor", "middle")
      .text(d => d.data.name);
  }

  // Function to generate tree JSON considering visibility and highlight
  function generateTreeJson(node, isRoot = false) {
    if (!node) return null;
    
    let visibility = 'visible';
    let highlight = 'normal';

    // Determine visibility based on the highlight status
    if ((node === rootNode && highlightStatus.root === 'hidden') ||
        (node.left && highlightStatus.left === 'hidden') ||
        (node.right && highlightStatus.right === 'hidden')) {
      visibility = 'hidden';
    }

    // Determine highlight based on the highlight status
    if ((node === rootNode.left && highlightStatus.left === 'highlight') ||
        (node === rootNode.right && highlightStatus.right === 'highlight') ||
        (isRoot && highlightStatus.root === 'highlight')) {
      highlight = 'highlight';
    } else if (highlightStatus.root === 'visible' && isRoot) {
      visibility = 'visible';
    }

    return {
      name: node.character + ":" + node.frequency,
      visibility,
      highlight,
      children: (node.left || node.right) ? [node.left, node.right].filter(n => n).map(child => generateTreeJson(child)) : [],
    };
  }
</script>

<svg bind:this={svg} width="800" height="600" style="border: 1px solid black;"></svg>
