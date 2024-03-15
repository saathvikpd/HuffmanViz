<!-- src/routes/treeVisualization.svelte -->
<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
  
    let svg;
    const width = 800;
    const height = 600;
    const duration = 750; // Duration of each animation step
  
    onMount(() => {
      const data = {
        name: "root",
        children: [
          { name: "child1", children: [{ name: "grandchild1" }, { name: "grandchild2" }] },
          { name: "child2" }
        ]
      };
  
      const treeLayout = d3.tree().size([width, height - 160]);
      const root = d3.hierarchy(data);
      treeLayout(root);
  
      const nodes = root.descendants();
      const links = root.links();
  
      const diagonal = d3.linkVertical()
        .x(d => d.x)
        .y(d => d.y);
  
      // Calculate the max depth of the tree
      const maxDepth = d3.max(nodes, d => d.depth);
  
      // Draw links (edges)
      const link = d3.select(svg)
        .selectAll('.link')
        .data(links)
        .enter().append('path')
          .attr('class', 'link')
          .attr('d', diagonal)
          .attr('fill', 'none')
          .attr('stroke', '#555')
          .attr('stroke-opacity', 0.4)
          .attr('stroke-width', 1.5)
          .attr('transform', 'translate(0,80)');
  
      // Initially hide links
      link.style('opacity', 0);
  
      // Draw nodes
      const node = d3.select(svg)
        .selectAll('.node')
        .data(nodes)
        .enter().append('g')
          .attr('class', 'node')
          .attr("transform", d => `translate(${d.x},${d.y + 80})`) // Adjust y for initial translation
          .style('opacity', 0); // Initially hide nodes
  
      node.append('circle')
          .attr('r', 10)
          .attr('fill', '#999');
  
      node.append('text')
          .attr("dy", "0.31em")
          .attr("x", d => d.children ? -15 : 15)
          .attr("text-anchor", d => d.children ? "end" : "start")
          .text(d => d.data.name)
          .clone(true).lower()
          .attr("stroke-linejoin", "round")
          .attr("stroke-width", 3)
          .attr("stroke", "white");
  
      // Animate the nodes and links based on their depth
      node.transition()
          .delay(d => (maxDepth - d.depth) * duration)
          .duration(duration)
          .style('opacity', 1);
  
      link.transition()
          .delay(d => (maxDepth - d.source.depth) * duration)
          .duration(duration)
          .style('opacity', 1);
    });
  </script>
  
  <svg bind:this={svg} width={width} height={height} style="max-width: 100%; height: auto; border: 1px solid black;"></svg>
  