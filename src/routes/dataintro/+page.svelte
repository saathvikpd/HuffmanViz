<script>
  import { navigate } from 'svelte-routing';
  import { onMount, onDestroy } from 'svelte';
  import bits from '$lib/images/bits.jpeg';

  let lines = [];
  let text = "";
  const paragraph = `
      In a digital age brimming with data, we are on a perpetual quest 
      to store information efficiently share it swiftly and
      preserve the essence of our digital footprint. Computer 
      files are just strings of bits ones and zeros 
      but they often use more space than necessary wasting press storage.
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
  .digital-container {
    display: flex;
    justify-content: space-between; /* Ensures items are spread horizontally */
    align-items: center;
    height: 100vh;
    padding: 0 20px; /* Adjust padding */
  }

  .digital-text {
    width: 50%; /* Adjust width */
    padding-right: 20px; /* Adjust padding */
  }

  .digital-text pre {
      font-size: 18px; /* Adjust font size */
    }

  .digital-image {
    width: 50%; /* Adjust width */
  }

  .digital-image img {
    max-width: 100%;
    height: auto;
  }

  /* Style for the button */
  .button {
    padding: 20px 40px;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border: none;
    outline: none;
    margin-top: 20px;
    font-size: 20px;
  }

  /* Hover effect */
  .button:hover {
    background-color: #0056b3;
  }
</style>

<div class="digital-container">
  <div class="digital-text">
      <h1 style="margin-left: 280px;">Bits and bytes</h1>
      <pre>{text}</pre>
      <button class="button" onclick="window.location.href='/finalproject/huffmanintro'" style="margin-left: 290px;">Continue</button>
  </div>
  <div class="digital-image">
      <img src={bits} alt="hi">
  </div>
</div>
