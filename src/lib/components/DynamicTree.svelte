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

  // function drawTree() {
  //   if (!rootNode) return;

  //   const treeData = generateTreeJson(rootNode, true); // Generate tree JSON including visibility status
  //   const root = hierarchy(treeData);
  //   const treeLayout = tree().size([width, height/2]);
  //   treeLayout(root);

  //   select(svg).selectAll("*").remove(); // Clear the SVG for redrawing

  //   const g = select(svg)
  //     .append("g")
  //     .attr("transform", "translate(0,100)"); // Margin for the tree

  //   // Draw links with visibility controls
  //   g.selectAll(".link")
  //     .data(root.links())
  //     .enter().append("path")
  //       .attr("class", "link")
  //       .attr("d", linkVertical().x(d => d.x).y(d => d.y))
  //       .attr("fill", "none")
  //       .attr("stroke", "#555")
  //       .attr("stroke-opacity", d => (d.source.data.visibility === 'hidden' || d.target.data.visibility === 'hidden') ? 0 : 1);

  //   // Draw nodes with visibility and highlight controls
  //   const nodes = g.selectAll(".node")
  //     .data(root.descendants())
  //     .enter().append("g")
  //       .attr("class", d => `node ${d.data.visibility}`)
  //       .attr("transform", d => `translate(${d.x},${d.y})`)
  //       .style("opacity", d => d.data.visibility === 'hidden' ? 0 : 1);

  //   nodes.append("circle")
  //     .attr("r", 10)
  //     .style("fill", d => d.data.highlight === 'highlight' ? 'red' : '#999');

  //   nodes.append("text")
  //     .attr("dy", "0.35em")
  //     .attr("x", d => d.children ? -12 : 12)
  //     .style("text-anchor", "middle")
  //     .text(d => d.data.name);
  // }


  function drawTree() {
    if (!rootNode) return;

    // Update the function call to use generateRootNodeJson
    const treeData = generateJson(rootNode); // Now using the new root node JSON generator
    console.log("Tree data generated for status: ", highlightStatus);
    console.log(treeData);
    const root = hierarchy(treeData);
    const treeLayout = tree().size([width, height / 2]);
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

    nodes.append("circle")
      .attr("r", 10)
      .style("fill", d => d.data.highlight === 'highlight' ? 'red' : '#999');

    nodes.append("text")
      .attr("dy", "0.35em")
      .attr("x", d => d.children ? -12 : 12)
      .style("text-anchor", "middle")
      .text(d => d.data.name);
  }

  function generateJson(rootNode) {
    if (!rootNode) return null;

    // Set the visibility of the root node based on highlightStatus
    let rootVisibility = (highlightStatus.root !== 'hidden') ? 'visible' : 'hidden';
    let rootHighlight = highlightStatus.root === 'highlight' ? 'highlight' : 'normal';

    // Prepare JSON structure for the root
    let rootNodeJson = {
        name: `${rootNode.character}:${rootNode.frequency}`,
        visibility: rootVisibility,
        highlight: rootHighlight,
        children: []
    };

    // Directly reset visibility of left and right children
    if (rootNode.left) {
        rootNodeJson.children.push({
            ...rootNode.left,
            visibility: 'visible', // Assuming direct children are always visible unless root is hidden
            highlight: 'normal', // Reset highlight for direct children
            children: bfsUpdateVisibility(rootNode.left, rootVisibility)
        });
    }
    if (rootNode.right) {
        rootNodeJson.children.push({
            ...rootNode.right,
            visibility: 'visible', // Same assumption as above
            highlight: 'normal',
            children: bfsUpdateVisibility(rootNode.right, rootVisibility)
        });
    }

    return rootNodeJson;
}

function bfsUpdateVisibility(node, parentVisibility) {
    let queue = [node];
    let result = [];

    while (queue.length > 0) {
        let currentNode = queue.shift();
        let visibility = parentVisibility !== 'hidden' ? 'visible' : 'hidden';

        let nodeJson = {
            ...currentNode,
            visibility: visibility,
            highlight: 'normal', // Subchildren are not highlighted by default
        };

        if (currentNode.left) {
            queue.push(currentNode.left);
            nodeJson.children = nodeJson.children || [];
            nodeJson.children.push(currentNode.left);
        }
        if (currentNode.right) {
            queue.push(currentNode.right);
            nodeJson.children = nodeJson.children || [];
            nodeJson.children.push(currentNode.right);
        }

        result.push(nodeJson);
    }

    return result;
}




</script>

<svg bind:this={svg} width="800" height="600" style="border: 1px solid black;"></svg>
