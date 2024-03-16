<script>
    import { createEventDispatcher } from 'svelte';
    import * as d3 from 'd3';
    import { priorityQueueStore, highlightTopBar } from '$lib/stores.js';
    import { TreeNode } from '$lib/modules/TreeNode.js';
  
    export let userInput;
    const dispatch = createEventDispatcher();
    let isSorted = false;
    let data = calculateFrequencies(userInput);

    // Function to calculate and return character frequencies in order of appearance
    function calculateFrequencies(text) {
        let sanitizedText = text.toUpperCase().replace(/[\W_]+/g, '');
        let freqMap = new Map();
        sanitizedText.split('').forEach(char => {
            freqMap.set(char, (freqMap.get(char) || 0) + 1);
        });
        return Array.from(freqMap.entries()).map(([character, frequency]) => ({ character, frequency }));
    }

    // Populate the priority queue with TreeNode objects
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
        isSorted = true;
        populatePriorityQueue();
        updateHistogram();
    }

    // React to changes in the priority queue and update the histogram accordingly
    $: priorityQueueStore.subscribe(queue => {
        const newData = queue.map(node => ({ character: node.character, frequency: node.frequency }));
        if (JSON.stringify(newData) !== JSON.stringify(data)) {
            data = newData;
            updateHistogram();
        }
    });
    
    // React to userInput changes
    $: if (userInput && !isSorted) {
        data = calculateFrequencies(userInput);
        updateHistogram();
    }

    $: $highlightTopBar, updateHistogram();

    function updateHistogram() {
        if (data.length === 0) return;
        
        const svg = d3.select('#frequency-chart');
        const margin = { top: 20, right: 30, bottom: 40, left: 40 };
        const fixedBarWidth = 20;
        const chartWidth = 400; // Fixed chart width
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
            .attr("fill", "steelblue")
            .attr("rx", 5) // Rounded corners
            .attr("ry", 5)
            .attr("width", 0) // Start with a width of 0 for new bars
            .transition(d3.transition().duration(750))
            .attr("width", d => x(d.frequency)); // Transition to the correct width

        // Append text for the frequency label in the enter selection, initially hidden
        barGroupEnter.append("text")
            .attr("class", "freq-label")
            .attr("text-anchor", "start")
            .attr("dy", "0.35em")
            .style("opacity", 0) // Start with labels hidden
            .attr("x", d => x(d.frequency) + 10) // Position slightly to the right of the bar
            .attr("y", d => y(d.character) + y.bandwidth() / 2);

        // Merge the enter and update selections for bars to re-apply event listeners
        const mergedBars = barGroupEnter.merge(barGroups).select(".bar");

        mergedBars
            .on("mouseover", function(event, d) {
                d3.select(this).attr('fill', 'orange'); // Highlight color on hover
                d3.select(this.parentNode).select(".freq-label")
                    .style("opacity", 1); // Show the label on hover
            })
            .on("mouseout", function(d) {
                d3.select(this).attr('fill', 'steelblue'); // Reset color on mouse out
                d3.select(this.parentNode).select(".freq-label")
                    .style("opacity", 0); // Hide the label on mouse out
            });

        // Apply transitions to merged bars for consistent updates
        mergedBars.transition(d3.transition().duration(750))
            .attr("y", d => y(d.character))
            .attr("width", d => x(d.frequency));

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

        // Additional logic to highlight the top bar if shouldHighlightTopBar is true
        if ($highlightTopBar) {
            svg.selectAll('.bar')
                .each(function(d, i) {
                if (i === 0) { // Assuming the data is already sorted, highlight the first bar
                    d3.select(this).style('fill', 'red');
                }
                });
        }
    }

</script>

<button type="button" class="btn btn-outline-primary btn-sm" on:click={sortAndPopulateQueue} disabled={isSorted}>Sort Frequencies</button>

<svg id="frequency-chart" width="400"></svg>