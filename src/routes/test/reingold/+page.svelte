<!-- src/routes/treeVisualization.svelte -->
<script>
    import { onMount } from 'svelte';
    import { BaseNode, reingoldTilford } from '$lib/tree.js';

    let svgContent;
    const svgWidth = 800;
    const svgHeight = 600;

    onMount(() => {
        const rootNode = new BaseNode('root');
        // Example tree construction
        const child1 = new BaseNode('child1');
        const child2 = new BaseNode('child2');
        rootNode.children.push(child1, child2);

        console.log("Tree before running reingoldTilford:", rootNode);

        // Assuming your tree logic is applied here and updates rootNode accordingly
        reingoldTilford(rootNode);

        console.log("Tree after centering:", rootNode);

        // Center the tree
        centerTree(rootNode);

        // Prepare SVG content
        svgContent = drawTreeSVG(rootNode);
    });

    function centerTree(rootNode) {
        // Calculate bounds
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        function calculateBounds(node) {
            if (!node) return;
            minX = Math.min(minX, node.x);
            maxX = Math.max(maxX, node.x);
            minY = Math.min(minY, node.y);
            maxY = Math.max(maxY, node.y);
            node.children.forEach(calculateBounds);
        }
        calculateBounds(rootNode);

        // Calculate offsets to center the tree
        const offsetX = (svgWidth - (maxX - minX)) / 2 - minX;
        const offsetY = (svgHeight - (maxY - minY)) / 2 - minY;

        // Apply offsets
        function applyOffsets(node) {
            if (!node) return;
            node.x += offsetX;
            node.y += offsetY;
            node.children.forEach(applyOffsets);
        }
        applyOffsets(rootNode);
    }

    // Function to generate SVG content from the tree structure
    function drawTreeSVG(node) {
        let content = '';
        if (node) {
            console.log(`Drawing node: ${node.value}, x: ${node.x}, y: ${node.y}`);
            // Draw node
            content += `<circle cx="${node.x}" cy="${node.y}" r="20" stroke="black" stroke-width="2" fill="white" />`;
            content += `<text x="${node.x}" y="${node.y}" dominant-baseline="middle" text-anchor="middle">${node.value}</text>`;
            // Draw edges and children
            node.children.forEach(child => {
                content += `<line x1="${node.x}" y1="${node.y}" x2="${child.x}" y2="${child.y}" stroke="black"/>`;
                content += drawTreeSVG(child);
            });
        }
        return content;
    }
</script>

<style>
    .svg-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh; /* Use the full viewport height */
    }
</style>

<div class="svg-container">
    <svg width={svgWidth} height={svgHeight}>
        {@html svgContent}
    </svg>
</div>
  