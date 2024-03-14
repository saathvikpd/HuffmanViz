<script>
    // import ThemeSwitch from '$lib/ThemeSwitch/ThemeSwitch.svelte';
    import Frequencies from '../components/Frequencies.svelte';

    let userInput = '';
  </script>


<main>
    <h1>Huffman Coding Visualization</h1>
    <textarea bind:value={userInput} placeholder="Type some text here..."></textarea>
    <Frequencies {userInput} />
</main>
