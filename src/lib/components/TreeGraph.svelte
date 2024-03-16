<script>
    import { onMount, afterUpdate } from 'svelte';
    import { select, hierarchy, tree, linkVertical } from 'd3';
  
    export let rootNode;
  
    let svg;
    const width = 800;
    const height = 600;
  
    onMount(() => {
      drawTree();
    });
  
    afterUpdate(() => {
      drawTree();
    });
  
    // Function to generate JSON from a TreeNode
    function generateTreeJson(node) {
      if (!node) return null;
      return {
        name: node.character + ":" + node.frequency,
        children: [node.left, node.right].filter(n => n).map(generateTreeJson),
      };
    }
  
    function drawTree() {
      select(svg).selectAll("*").remove(); // Clear the SVG
  
      if (!rootNode && !nodeA && !nodeB) return; // If no nodes, don't draw
  
      // Choose what to draw based on the props
      let treeData;
      if (rootNode) {
        treeData = generateTreeJson(rootNode);
      } else if (nodeA && !nodeB) {
        treeData = generateTreeJson(nodeA); // Draw the entire tree using nodeA
      } else if (nodeA && nodeB) {
        // Merge nodeA and nodeB trees for visual
        treeData = {
          name: "Root",
          children: [generateTreeJson(nodeA), generateTreeJson(nodeB)]
        };
      }
  
      const root = hierarchy(treeData);
      const treeLayout = tree().size([width, height/2]);
      treeLayout(root);
  
      const links = root.links();
      const linkPathGenerator = linkVertical().x(d => d.x).y(d => d.y);
  
      const g = select(svg)
        .append("g")
        .attr("transform", "translate(0,100)"); // Margin for the tree
  
      // Draw links
      g.selectAll(".link")
        .data(links)
        .enter().append("path")
          .attr("class", "link")
          .attr("d", linkPathGenerator)
          .attr("fill", "none")
          .attr("stroke", "#555");
  
      // Draw nodes
      const nodes = g.selectAll(".node")
        .data(root.descendants())
        .enter().append("g")
          .attr("class", "node")
          .attr("transform", d => `translate(${d.x},${d.y})`);
  
      nodes.append("circle")
        .attr("r", 10)
        .attr("fill", "#999");
  
      nodes.append("text")
        .attr("dy", "0.35em")
        .attr("x", d => d.children ? -12 : 12)
        .style("text-anchor", "middle")
        .text(d => d.data.name);
    }
  </script>
  
  <svg bind:this={svg} width="800" height="900" style="border: 1px solid black;"></svg>
  