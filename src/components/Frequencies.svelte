<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    export let userInput;
  
    // Function to calculate frequencies
    function calculateFrequencies(text) {
      const freqMap = {};
      text.split('').forEach(char => {
        freqMap[char] = (freqMap[char] || 0) + 1;
      });
      return Object.entries(freqMap).map(([character, frequency]) => ({ character, frequency }));
    }
  
    let data = [];
  
    // Reactively update the data whenever userInput changes
    $: data = calculateFrequencies(userInput), updateHistogram();
  
    function updateHistogram() {
      if (data.length === 0) return; // Ensure we have data to work with
      
      // Assuming the D3 setup code is here for brevity
      const svg = d3.select('#frequency-chart');
      const margin = { top: 20, right: 30, bottom: 40, left: 40 };
      const width = 400 - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;
      
      const x = d3.scaleBand()
        .range([0, width])
        .padding(0.1)
        .domain(data.map(d => d.character));
  
      const y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(data, d => d.frequency)]);
  
      // Ensure the SVG is empty before appending new elements
      svg.select('g').remove();
      const chartBody = svg.append('g')
                           .attr('transform', `translate(${margin.left},${margin.top})`);
  
      chartBody.selectAll('.bar')
        .data(data, d => d.character)
        .join('rect')
          .attr('class', 'bar')
          .attr('x', d => x(d.character))
          .attr('y', d => y(d.frequency))
          .attr('width', x.bandwidth())
          .attr('height', d => height - y(d.frequency))
          .attr('fill', 'steelblue');
    }
  
    onMount(() => {
      updateHistogram(); // Initial call to render the histogram
    });
  </script>
  
  <svg id="frequency-chart" width="400" height="300"></svg>
  