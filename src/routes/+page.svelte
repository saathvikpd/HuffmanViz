 <script>
    import { tweened } from 'svelte/motion';
    import { cubicInOut } from 'svelte/easing';
    import Frequencies from '$lib/components/Frequencies.svelte';
    import HuffmanController from '$lib/components/HuffmanController.svelte';
    import Encoding from '$lib/components/Encoding.svelte';
    import { navigate } from 'svelte-routing';
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    
    // Function to navigate to the next page
    function nextPage() {
      navigate('main/');
    }
  
    onMount(() => {
      // D3 code for visualization and animations
      // Example D3 code for a simple animation
      const svg = d3.select('svg');
      svg.append('circle')
        .attr('cx', 50)
        .attr('cy', 50)
        .attr('r', 10)
        .attr('fill', 'red')
        .transition()
        .duration(1000)
        .attr('cx', 250);
    });
  </script>

<div class="introduction">
    <h1>Welcome to our DSC 106 Final Project, Huffman Encoding!</h1>
    <h3>A project done by Kai, Saathvik, and Justin</h3>
    <p class = "text">Explore the world of big data and the need for data compression.</p>

    <!-- SVG container for D3 visualization -->
    <svg width="300" height="100"></svg>
    
    <!-- Button to navigate to the next page -->
    <button class="button" onclick="window.location.href='/finalproject/dataintro'">Click here to get started</button>
  </div> 
  
  <style>
   .introduction {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Set the height to viewport height for vertical centering */
    text-align: center; /* Center text horizontally */
  }

  /* Style for the button */
  .button {
    padding: 20px 30px;
    border-radius: 5px;
    background-color: #007bff; /* Default blue color */
    color: #fff; /* Text color */
    cursor: pointer;
    transition: background-color 0.3s ease; /* Smooth transition for background color */
    border: none; /* Remove default border */
    outline: none; /* Remove default outline */
    font-size: 30px;
  }

  /* Hover effect */
  .button:hover {
    background-color: #0056b3; /* Bright blue color on hover */
  }

  .text{
    font-size: 25px;
  }
  </style>
  
  
