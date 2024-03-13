<script>
    export let treeData;

    import Graph from "./Graph.svelte";
    import ScrollyTeller from "./ScrollyTeller.svelte";
    import { onMount } from "svelte";
  
    let userInput = "";
    let huffmanTree;
  
    const visualizeTree = () => {
      huffmanTree = generateHuffmanTree(userInput);
    };
  
    const generateHuffmanTree = (input) => {
      const frequency = new Map();
  
      for (const char of input) {
        frequency.set(char, (frequency.get(char) || 0) + 1);
      }
  
      const priorityQueue = Array.from(frequency.entries())
        .map(([char, freq]) => ({ char, freq }))
        .sort((a, b) => a.freq - b.freq);
  
      while (priorityQueue.length > 1) {
        const left = priorityQueue.shift();
        const right = priorityQueue.shift();
        const newNode = { char: null, freq: left.freq + right.freq, left, right };
        priorityQueue.push(newNode);
        priorityQueue.sort((a, b) => a.freq - b.freq);
      }
  
      return priorityQueue[0];
    };
  
    onMount(() => {
      visualizeTree();
    });


    let count, offset, progress;
    let width, height;

    let index = 0;
    function incrementCount() {
      index++;
      if (index > 19) {
        index = 19;
      }
    }

    function decrementCount() {
      index--;
      if (index < 0) {
        index = 0;
      }
    }

    
    $: {
      index = index;
      console.log(index);
    }

  </script>
  
  <div class="graph-container">
    
  </div>
  
  
  <main>
    <label for="inputData">Enter text:</label>
    <input bind:value={userInput} type="text" id="inputData" placeholder="Type text here" />
  
    <button on:click={visualizeTree}>Visualize Huffman Tree</button>
  
    <div
      class="button"
    >
      <h1>
        Huffman Tree
      </h1>
    </div>

    <div
      class="button"
    >

      <button
        on:click={decrementCount}
      >
        Prev
      </button>

      <button
        on:click={incrementCount}
      >
        Next
    </button>
    

    </div>

    <div 
      class="background"
      bind:clientWidth={width}
      bind:clientHeight={height}
    >
      <Graph {index} {width} {height}/>
    </div>

    
  </main>

<style>
.graph-container {
  border: 1px solid #ddd;
  padding: 10px;
  margin-top: 20px;
}

main {
  padding: 20px;
}
</style>
