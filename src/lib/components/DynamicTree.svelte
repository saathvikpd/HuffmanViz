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

//   function drawTree() {
//     if (!rootNode) return;

//     // Update the function call to use generateRootNodeJson
//     const treeData = generateJson(rootNode); // Now using the new root node JSON generator
//     console.log("Tree data generated for status: ", highlightStatus);
//     console.log(treeData);
//     const root = hierarchy(treeData);
//     const treeLayout = tree().size([width, height / 2]);
//     treeLayout(root);

//     select(svg).selectAll("*").remove(); // Clear the SVG for redrawing

//     const g = select(svg)
//       .append("g")
//       .attr("transform", "translate(0,100)"); // Margin for the tree

//     // Draw links with visibility controls
//     g.selectAll(".link")
//       .data(root.links())
//       .enter().append("path")
//         .attr("class", "link")
//         .attr("d", linkVertical().x(d => d.x).y(d => d.y))
//         .attr("fill", "none")
//         .attr("stroke", "#555")
//         .attr("stroke-opacity", d => (d.source.data.visibility === 'hidden' || d.target.data.visibility === 'hidden') ? 0 : 1);

//     // Draw nodes with visibility and highlight controls
//     const nodes = g.selectAll(".node")
//       .data(root.descendants())
//       .enter().append("g")
//         .attr("class", d => `node ${d.data.visibility}`)
//         .attr("transform", d => `translate(${d.x},${d.y})`)
//         .style("opacity", d => d.data.visibility === 'hidden' ? 0 : 1);

//     nodes.append("circle")
//       .attr("r", 10)
//       .style("fill", d => d.data.highlight === 'highlight' ? 'red' : '#999');

//     nodes.append("text")
//       .attr("dy", "0.35em")
//       .attr("x", d => d.children ? -12 : 12)
//       .style("text-anchor", "middle")
//       .text(d => d.data.name);
//   }

//   function generateJson(rootNode) {
//     if (!rootNode) return null;

//     // Set the visibility of the root node based on highlightStatus
//     let rootVisibility = (highlightStatus.root !== 'hidden') ? 'visible' : 'hidden';
//     let rootHighlight = highlightStatus.root === 'highlight' ? 'highlight' : 'normal';

//     // Prepare JSON structure for the root
//     let rootNodeJson = {
//         name: `${rootNode.character}:${rootNode.frequency}`,
//         visibility: rootVisibility,
//         highlight: rootHighlight,
//         children: []
//     };

//     // Directly reset visibility of left and right children
//     if (rootNode.left) {
//         rootNodeJson.children.push({
//             ...rootNode.left,
//             visibility: 'visible', // Assuming direct children are always visible unless root is hidden
//             highlight: 'normal', // Reset highlight for direct children
//             children: bfsUpdateVisibility(rootNode.left, rootVisibility)
//         });
//     }
//     if (rootNode.right) {
//         rootNodeJson.children.push({
//             ...rootNode.right,
//             visibility: 'visible', // Same assumption as above
//             highlight: 'normal',
//             children: bfsUpdateVisibility(rootNode.right, rootVisibility)
//         });
//     }

//     return rootNodeJson;
// }

// function bfsUpdateVisibility(node, parentVisibility) {
//     let queue = [node];
//     let result = [];

//     while (queue.length > 0) {
//         let currentNode = queue.shift();
//         let visibility = parentVisibility !== 'hidden' ? 'visible' : 'hidden';

//         let nodeJson = {
//             ...currentNode,
//             visibility: visibility,
//             highlight: 'normal', // Subchildren are not highlighted by default
//         };

//         if (currentNode.left) {
//             queue.push(currentNode.left);
//             nodeJson.children = nodeJson.children || [];
//             nodeJson.children.push(currentNode.left);
//         }
//         if (currentNode.right) {
//             queue.push(currentNode.right);
//             nodeJson.children = nodeJson.children || [];
//             nodeJson.children.push(currentNode.right);
//         }

//         result.push(nodeJson);
//     }

//     return result;
// }


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

    nodes.append("circle")
      .attr("r", 10)
      .style("fill", d => d.data.highlight === 'highlight' ? 'red' : '#999');

    nodes.append("text")
      .attr("dy", "0.35em")
      .attr("x", d => d.children ? -12 : 12)
      .style("text-anchor", "middle")
      .text(d => d.data.name);
  }

// Updated generateTreeJson function with added comments and logging
// function generateTreeJson(node, isRoot = false) {
//   if (!node) return null;

//   // Default visibility and highlight
//   let visibility = 'visible';
//   let highlight = 'normal';

//   // Adjust visibility for hidden nodes
//   // Logic might need refining for subtree handling
//   if ((node === rootNode && highlightStatus.root === 'hidden') ||
//       (node.left && highlightStatus.left === 'hidden') ||
//       (node.right && highlightStatus.right === 'hidden')) {
//     visibility = 'hidden';
//   }

//   // Generate children array considering visibility
//   // This part needs careful examination for subtree handling
//   let children = [];
//   if (node.left) {
//     let leftChild = generateTreeJson(node.left);
//     // Log left child for debugging
//     console.log("Left child JSON:", leftChild);
//     children.push(leftChild);
//   }
//   if (node.right) {
//     let rightChild = generateTreeJson(node.right);
//     // Log right child for debugging
//     console.log("Right child JSON:", rightChild);
//     children.push(rightChild);
//   }

//   // Determine highlight status
//   if ((node === rootNode.left && highlightStatus.left === 'highlight') ||
//       (node === rootNode.right && highlightStatus.right === 'highlight') ||
//       (isRoot && highlightStatus.root === 'highlight')) {
//     highlight = 'highlight';
//   }

//   // Construct and return node JSON
//   const nodeJson = {
//     name: node.character ? `${node.character}:${node.frequency}` : `Node:${node.frequency}`,
//     visibility,
//     highlight,
//     children: children.length ? children : null,
//   };

//   // Log generated JSON for debugging
//   console.log("Generated node JSON:", nodeJson);

//   return nodeJson;
// }

function generateJson(rootNode) {
  if (!rootNode) return null;

  let treeJSON = {
    name: rootNode.character ? `${rootNode.character}:${rootNode.frequency}` : `Node:${rootNode.frequency}`,
    visibility: highlightStatus.root === 'hidden' ? 'hidden' : 'visible',
    highlight: highlightStatus.root === 'highlight' ? 'highlight' : 'normal',
    children: [],
  }

  console.log(highlightStatus)
  console.log('root node right child',rootNode.right);
  console.log('json data',JSON.stringify(treeJSON));

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
    name: node.character ? `${node.character}:${node.frequency}` : `Node:${node.frequency}`,
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
    name: node.character ? `${node.character}:${node.frequency}` : `Node:${node.frequency}`,
    visibility,
    highlight,
    children: children.length ? children : null,
  };
}

</script>

<svg bind:this={svg} width="800" height="600" style="border: 1px solid black;"></svg>
