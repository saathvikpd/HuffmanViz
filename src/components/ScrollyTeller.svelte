<script>
  import Scroller from "@sveltejs/svelte-scroller";
  import Map from "./Map.svelte";
  import { geoMercator } from "d3-geo";
  import Graph from "./Graph.svelte";
  import App from './App.svelte';


  let count, offset, progress;
  let width;
  let height;

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

  let outerWidth, innerWidth, outerHeight, innerHeight;

  
  $: {
    width = outerWidth;
    index = index;
  }

</script>

<svelte:window bind:innerWidth bind:outerWidth bind:innerHeight bind:outerHeight />

<main>

  <div
    class="buttonDiv"
  >
    <h1>
      Huffman Tree
    </h1>
  </div>

  <div
    class="buttonDiv"
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
  main {
		height: 100vh;
		min-width: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-family: 'Times New Roman', Times, serif;
		background-color: rgb(229, 230, 221);
	}

  .background {
    width: 100%;
    height: 100vh;
    position: relative;
    outline: green solid 3px;
    align-items: center
  }

  .buttonDiv {
    display: flex;
		align-items: center;
		justify-content: space-between;
    width: 200px;
    height: 60px;
    font-family: 'Times New Roman', Times, serif;
  }


  button {
    font-family: 'Times New Roman', Times, serif;
  }

  
</style>
