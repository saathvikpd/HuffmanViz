<!-- <script>
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
  
  <style>
   .digital {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Set the height to viewport height for vertical centering */
    text-align: center; /* Center text horizontally */
  }

  /* Style for the button */
  .button {
    padding: 10px 20px;
    border-radius: 5px;
    background-color: #007bff; /* Default blue color */
    color: #fff; /* Text color */
    cursor: pointer;
    transition: background-color 0.3s ease; /* Smooth transition for background color */
    border: none; /* Remove default border */
    outline: none; /* Remove default outline */
  }

  /* Hover effect */
  .button:hover {
    background-color: #0056b3; /* Bright blue color on hover */
  }
  </style>
  
  <div class="digital">
    <h1>Enter Huffman Encoding</h1>
    <p>Many years ago a genius named David Huffman realized this inefficiency and
        <br>created a creatively named compression algorithm to shrink
        <br>files to the smaller size. No data is lost as it's just represented more
        <br>compactly. The key idea replace common symbols with tiny codes and rare ones
        <br>with longer codes this uneven encoding means the total number of bits is
        <br>drastically reduced but seeing is understanding that's why we built an
        <br>interactive visualization to actually show you how the huff and coding process
        works</p>

    
    <button class="button" onclick="window.location.href='/main'">Try it for yourself</button>
  </div>  -->

  <script>
    import { navigate } from 'svelte-routing';
    import { onMount, onDestroy } from 'svelte';
  
    let lines = [];
    let text = "";
    const paragraph = `
      Many years ago a genius named David Huffman realized this inefficiency and
      created a creatively named compression algorithm to shrink
      files to the smaller size. No data is lost as it's just represented more
      compactly. The key idea replace common symbols with tiny codes and rare ones
      with longer codes this uneven encoding means the total number of bits is
      drastically reduced but seeing is understanding that's why we built an
      interactive visualization to actually show you how the huffman coding process works
    `;
  
    let lineIndex = 0;
    let charIndex = 0;
    let typingInterval;
  
    onMount(() => {
      lines = paragraph.split('\n');
      startTyping();
    });
  
    onDestroy(() => {
      clearInterval(typingInterval);
    });
  
    function startTyping() {
      typingInterval = setInterval(() => {
        if (lineIndex < lines.length) {
          const line = lines[lineIndex];
          if (charIndex < line.length) {
            text += line[charIndex++];
          } else {
            text += '\n'; // Add new line when the line is fully typed
            lineIndex++;
            charIndex = 0;
          }
        } else {
          clearInterval(typingInterval);
        }
      }, 15); // Adjust typing speed here
    }
</script>
  
<style>
    .digital {
      display: flex;
      flex-direction: column;
      align-items: flex-start; /* Align items to the left */
      justify-content: center;
      height: 100vh; /* Set the height to viewport height for vertical centering */
      padding-left: 40px; /* Add padding to align content to the left */
      text-align: left; /* Align text to the left */
    }
  
    /* Style for the button */
    .button {
      padding: 10px 20px;
      border-radius: 5px;
      background-color: #007bff; /* Default blue color */
      color: #fff; /* Text color */
      cursor: pointer;
      transition: background-color 0.3s ease; /* Smooth transition for background color */
      border: none; /* Remove default border */
      outline: none; /* Remove default outline */
      margin-top: 20px; /* Add some space above the button */
    }
  
    /* Hover effect */
    .button:hover {
      background-color: #0056b3; /* Bright blue color on hover */
    }
</style>
  
<div class="digital">
    <h1 style="margin-left: 140px;">Enter Huffman Encoding</h1> <!-- Adjust margin-left to shift the header -->
    <pre>{text}</pre> <!-- Use <pre> tag to preserve new lines -->
  <!-- svelte-ignore a11y-img-redundant-alt -->
    
    <!-- Button to navigate to the next page -->
    <button class="button" onclick="window.location.href='/main'" style="margin-left: 280px;">Try it for yourself</button> <!-- Adjust margin-left to shift the button -->
</div>

