<script>
    import Frequencies from '../components/Frequencies.svelte';
    let userInput = '';
  </script>
  
  <main>
    <h1 id="titletext">Huffman Coding Visualization</h1>
    <textarea class="text-input" bind:value={userInput} placeholder="Type some text here..."></textarea>
    <Frequencies {userInput} />
  </main>

  <style>
    #titletext {
      text-align: center;
    }

    .text-input {
      width: 40%;
      height: 60px;
      margin: 0 auto;
      display: block;
      border-radius: 8px;
      padding: 10px;
      font-size: 1em;
      border: 1px solid #000000;
      box-shadow: #000000;
    }
</style>