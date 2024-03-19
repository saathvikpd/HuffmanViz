<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import * as d3 from 'd3';
    import { priorityQueueStore, highlightTopBar, highlightBarIndex } from '$lib/stores.js';
    import { TreeNode } from '$lib/modules/TreeNode.js';
  
    export let userInput;
    const dispatch = createEventDispatcher();
    let isSorted = false;
    let data = calculateFrequencies(userInput);

    let highlightTopStatus = false;
    let highlightNewBar;

    let width = 300;
    function updateDimensions() {
        width = document.getElementById('frequency-chart').clientWidth;
        updateHistogram(); // Redraw the histogram using the updated dimensions
    }

    onMount(() => {
        window.addEventListener('resize', updateDimensions);
    });

    // Subscribe to highlight status stores
    highlightTopBar.subscribe(value => {
        highlightTopStatus = value;
        console.log(highlightTopStatus);
        updateHistogram();
    });

    // Subscribe to highlight status stores
    highlightBarIndex.subscribe(value => {
        highlightNewBar = value;
        updateHistogram();
    });

    // Function to calculate and return character frequencies in order of appearance
    function calculateFrequencies(text) {
        let sanitizedText = text.toUpperCase().replace(/[\W_]+/g, '');
        let freqMap = new Map();
        sanitizedText.split('').forEach(char => {
            freqMap.set(char, (freqMap.get(char) || 0) + 1);
        });
        return Array.from(freqMap.entries()).map(([character, frequency]) => ({ character, frequency, color:"steelblue" }));
    }

    // Populate the initial priority queue with TreeNode objects
    function populatePriorityQueue() {
        console.log("Populating priority queue with frequency data...");
        data.forEach(({ character, frequency }) => {
            const node = new TreeNode(character, frequency);
            priorityQueueStore.insert(node);
            console.log(`Inserted ${character}: ${frequency}`);
        });
        console.log("Priority queue populated.");
    }

    // Function to sort frequencies in descending order
    function sortAndPopulateQueue() {
        dispatch('lockInput', true); // Dispatch event to lock the input box
        data.sort((a, b) => a.frequency - b.frequency);
        updateHistogram();
        populatePriorityQueue();
        console.log($priorityQueueStore);
        isSorted = true;
    }

    // React to changes in the priority queue and update the histogram accordingly
    $: priorityQueueStore.subscribe(queue => {
        const newData = queue.map(node => ({ character: node.id, frequency: node.frequency, color: node.color }));
        if (JSON.stringify(newData) !== JSON.stringify(data) && isSorted) {
            data = newData;
            updateHistogram();
        }
    });
    
    // React to userInput changes
    $: if (userInput && !isSorted) {
        data = calculateFrequencies(userInput);
        updateHistogram();
    }

    
    function updateHistogram() {
        if (data.length === 0) return;
       
        const svg = d3.select('#frequency-chart');
        const margin = { top: 20, right: 30, bottom: 40, left: 40 };
        const fixedBarWidth = 20;
        const chartWidth = width; // Fixed chart width
        const heightPerBar = 25; // Including space between bars
        const chartHeight = data.length * heightPerBar + margin.top + margin.bottom; // Dynamic chart height
        
        // Set animation duration
        const duration = 750;

        svg.attr('height', chartHeight); // Update SVG height dynamically based on data
        
        const x = d3.scaleLinear()
        .range([0, chartWidth - margin.left - margin.right])
        .domain([0, d3.max(data, d => d.frequency)]);

        const y = d3.scaleBand()
            .range([0, data.length * heightPerBar])
            .padding(0.1)
            .domain(data.map(d => d.character));

        // Only append the <g> element if it doesn't exist
        if (!svg.select('g').node()) {
            svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
        }
        const chartBody = svg.select('g');

        // Bind data to bars and labels
        const labels = chartBody.selectAll('.label').data(data, d => d.character);

        // Transition for animations
        const transition = d3.transition().duration(duration);

        // Select and bind data to a group container for each data point
        const barGroups = chartBody.selectAll(".bar-group")
            .data(data, d => d.character);

        // Enter selection for the group
        const barGroupEnter = barGroups.enter().append("g")
            .attr("class", "bar-group");

        // Append rect for each bar in the enter selection
        barGroupEnter.append("rect")
            .attr("class", "bar")
            .attr("x", 0)
            .attr("y", d => y(d.character))
            .attr("height", y.bandwidth())
            .attr("fill",  d => d.color)
            .attr("rx", 5) // Rounded corners
            .attr("ry", 5)
            .attr("width", 0) // Start with a width of 0 for new bars
            .transition(d3.transition().duration(750))
            .attr("width", d => x(d.frequency)); // Transition to the correct width

        // Append text for the frequency label in the enter selection, initially hidden
        barGroupEnter.append("text")
            .attr("class", "freq-label")
            .style("fill", "black")
            .attr("text-anchor", "start")
            .attr("dy", "0.35em")
            .style("opacity", 0) // Start with labels hidden
            .attr("x", d => x(d.frequency) + 10) // Position slightly to the right of the bar
            .attr("y", d => y(d.character) + y.bandwidth() / 2);



        // Merge the enter and update selections for bars to re-apply event listeners
        const mergedBars = barGroupEnter.merge(barGroups).select(".bar");
        mergedBars
            .attr("fill",  d => d.color)
            .on("mouseover", function(event, d) {
                // Store the original color of the bar
                const originalColor = d3.select(this).attr('fill');

                // Set a temporary attribute on the bar to store the original color
                d3.select(this).attr('data-original-color', originalColor);

                // Change the fill color to orange to indicate hover state
                d3.select(this).attr('fill', 'lightblue');

                // Make the frequency label visible
                d3.select(this.parentNode).select(".freq-label")
                    .style("opacity", 1);
            })
            .on("mouseout", function(d) {
                // Retrieve the original color from the temporary attribute
                const originalColor = d3.select(this).attr('data-original-color');

                // Revert the bar's fill color to its original
                d3.select(this).attr('fill', originalColor);

                // Hide the label on mouse out
                d3.select(this.parentNode).select(".freq-label")
                    .style("opacity", 0);
            });


        // Apply transitions to merged bars for consistent updates
        mergedBars.transition(d3.transition().duration(750))
            .attr("y", d => y(d.character))
            .attr("width", d => x(d.frequency))

        // Ensure labels for all bars, including new ones, are correctly positioned
        const mergedLabels = barGroupEnter.merge(barGroups).select(".freq-label");

        mergedLabels
            .attr("x", d => x(d.frequency) + 10) // Ensure label positions are updated
            .attr("y", d => y(d.character) + y.bandwidth() / 2)
            .text(d => d.frequency); // Update label text

        // Continue with the removal of exiting groups if needed
        barGroups.exit().remove();


        // Update labels
        labels.join(
            enter => enter.append('text')
                .attr('class', 'label')
                .attr('x', -20)
                .attr('y', d => y(d.character) + y.bandwidth() / 2)
                .attr('dy', '0.35em')
                .attr('text-anchor', 'end')
                .text(d => d.character),
            update => update
                .call(update => update.transition(transition)
                .attr('y', d => y(d.character) + y.bandwidth() / 2)
                .text(d => d.character)), // Animate label changes
            exit => exit.remove()
        );

        // Update bar highlights
        if (highlightNewBar.on) {
            mergedBars
              .each(function(d, i) {
                if (i === highlightNewBar.index) {
                    d3.select(this).attr('fill', 'orange');
                }
            });
        } else {
            mergedBars
              .each(function(d, i) {
                if (i === highlightNewBar.index) {
                    d3.select(this).attr('fill', d => d.color);
                }
            });
        }
        if (highlightTopStatus) {
            mergedBars
                .each(function(d, i) {
                if (i === 0) { // Assuming the data is already sorted, highlight the first bar
                    d3.select(this).attr('fill', 'orange');
                }
            });
        }
    }

</script>

{#if !isSorted}
    <button type="button" class="btn btn-outline-primary btn-sm" on:click={sortAndPopulateQueue} disabled={isSorted}>Sort Frequencies</button>
{/if}

<svg id="frequency-chart" width="100%"></svg>