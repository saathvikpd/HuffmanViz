<script>
    import { onMount, afterUpdate } from 'svelte';
    import { select, hierarchy, tree, linkVertical } from 'd3';
    import { highlightLeftNode, highlightRightNode, highlightRoot } from '$lib/stores.js';
  
    export let nodeA;
    export let nodeB;
  
    let svg;
    const width = 800;
    const height = 600;
    let highlightedNodes = { left: false, right: false, root: false };
  
    highlightLeftNode.subscribe(value => {
      highlightedNodes.left = value;
      updateHighlights();
    });
  
    highlightRightNode.subscribe(value => {
      highlightedNodes.right = value;
      updateHighlights();
    });
  
    highlightRoot.subscribe(value => {
      highlightedNodes.root = value;
      updateHighlights();
    });
  
    onMount(() => {
      drawTree();
    });
  
    afterUpdate(() => {
      drawTree();
    });
  
    function drawTree() {
      if (!nodeA && !nodeB) return; // If no nodes, don't draw
  
      const treeData = {
        name: "Root",
        children: [
          nodeA ? { name: `${nodeA.character}:${nodeA.frequency}`, children: [] } : undefined,
          nodeB ? { name: `${nodeB.character}:${nodeB.frequency}`, children: [] } : undefined,
        ].filter(n => n)
      };
  
      const root = hierarchy(treeData);
      const treeLayout = tree().size([height, width - 160]);
      treeLayout(root);
  
      const links = root.links();
      const linkPathGenerator = linkVertical().x(d => d.x).y(d => d.y);
  
      select(svg).selectAll("*").remove(); // Clear the SVG for redrawing
  
      const g = select(svg)
        .append("g")
        .attr("transform", "translate(40,0)"); // Add some margin
  
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
        .attr("fill", d => {
          if (d.data.name.startsWith("Root") && highlightedNodes.root) return "red";
          if (nodeA && d.data.name === `${nodeA.character}:${nodeA.frequency}` && highlightedNodes.left) return "red";
          if (nodeB && d.data.name === `${nodeB.character}:${nodeB.frequency}` && highlightedNodes.right) return "red";
          return "#999";
        });
  
      nodes.append("text")
        .attr("dy", "0.35em")
        .attr("x", d => d.children ? -12 : 12)
        .style("text-anchor", "middle")
        .text(d => d.data.name);
    }
  
    function updateHighlights() {
      drawTree();
    }
  </script>
  
  <svg bind:this={svg} width="800" height="600" style="border: 1px solid black;"></svg>
  