<script>
  import Scroller from "@sveltejs/svelte-scroller";
  import Map from "./Map.svelte";
  import { geoMercator } from "d3-geo";
  import Graph from "./Graph.svelte";

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
  }

</script>

<main>

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
  main {
		height: 100vh;
		min-width: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-family: sans-serif;
		background-color: rgb(229, 230, 221);
	}

  .background {
    width: 100%;
    height: 100vh;
    position: relative;
    outline: green solid 3px;
  }

  .button {
    display: flex;
		align-items: center;
		justify-content: space-between;
    height: 60px
  }

  
</style>
