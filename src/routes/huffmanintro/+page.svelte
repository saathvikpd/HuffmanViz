<script>
  import { navigate } from 'svelte-routing';
  import { onMount, onDestroy } from 'svelte';
  import theboydavid from '$lib/images/huffman.jpeg';

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

  .digital-image {
    width: 100%; /* Adjust width */
    margin-left: 200px; /* Adjust margin-left to shift the image more to the right */
  }

  .digital-image img {
    max-width: 100%;
    height: auto;
    right: 40px;
  }

  .digital-text pre {
    font-size: 18px; /* Adjust font size */
  }

  .button {
    padding: 15px 30px; /* Adjust padding */
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border: none;
    outline: none;
    margin-top: 20px;
    font-size: 20px; /* Adjust font size */
  }

  /* Hover effect */
  .button:hover {
    background-color: #0056b3;
  }
</style>

<div class="digital-container">
  <div class="digital-text">
      <h1 style="margin-left: 270px;">Enter Huffman Encoding</h1>
      <pre>{text}</pre>
      <button class="button" onclick="window.location.href='/DSC106FinalProject/main'" style="margin-left: 340px;">Try it for yourself</button> <!-- Adjust margin-left to shift the button -->
  </div>
  <div class="digital-image">
      <!-- svelte-ignore missing-declaration -->
      <img src={theboydavid} alt="Huffman">
    </div>
</div>
