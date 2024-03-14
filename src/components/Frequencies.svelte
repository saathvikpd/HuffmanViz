<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import { debounce } from 'lodash-es';
    export let userInput;
  
    function calculateFrequencies(text) {
      const freqMap = {};
      text.split('').forEach(char => {
        freqMap[char] = (freqMap[char] || 0) + 1;
      });
      return Object.entries(freqMap)
                   .map(([character, frequency]) => ({ character, frequency }))
                   .sort((a, b) => b.frequency - a.frequency);
    }
  
    let data = [];
  
    $: data = calculateFrequencies(userInput), debouncedUpdateHistogram();

    let debouncedUpdateHistogram = debounce(() => {
        updateHistogram();
    }, 250); // Wait for 500ms of inactivity before calling updateHistogram

    // Use the debounced function in your reactive statement
    $: userInput, debouncedUpdateHistogram();
  
    function updateHistogram() {
        if (data.length === 0) return;
        
        const svg = d3.select('#frequency-chart');
        const margin = { top: 20, right: 30, bottom: 40, left: 40 };
        const fixedBarWidth = 20;
        const chartWidth = 400; // Fixed chart width
        const heightPerBar = 25; // Including space between bars
        const chartHeight = data.length * heightPerBar + margin.top + margin.bottom; // Dynamic chart height

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
        const bars = chartBody.selectAll('.bar').data(data, d => d.character);
        const labels = chartBody.selectAll('.label').data(data, d => d.character);

        // Transition for animations
        const transition = d3.transition().duration(750);

        // Update bars
        bars.join(
        enter => enter.append('rect')
            .attr('class', 'bar')
            .attr('x', 0)
            .attr('y', d => y(d.character))
            .attr('height', y.bandwidth())
            .attr('fill', 'steelblue')
            .attr('rx', 5) // Rounded corners
            .attr('ry', 5)
            .call(enter => enter.transition(transition)
            .attr('width', d => x(d.frequency))), // Animate the entry of bars
        update => update
            .call(update => update.transition(transition)
            .attr('y', d => y(d.character))
            .attr('height', y.bandwidth()) // Ensure the height is updated
            .attr('width', d => x(d.frequency))), // Animate bar width changes
        exit => exit
            .call(exit => exit.transition(transition)
            .attr('width', 0)
            .remove()) // Animate the exit of bars
        );

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

        // ... (rest of the event handlers) ...
    }

  
    onMount(() => {
      updateHistogram();
    });
</script>

<svg id="frequency-chart" width="400"></svg>

<style>
  .label {
    font-size: 12px;
  }
</style>
