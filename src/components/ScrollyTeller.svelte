<script>
  import Scroller from "@sveltejs/svelte-scroller";
  import Map from "./Map.svelte";
  import { geoMercator } from "d3-geo";
  import Graph from "./Graph.svelte";
  //import App from './App.svelte';


  let count, offset, progress;
  let width;
  let height;

  let index = 0;
  function incrementCount() {
		index++;
    if (index > 20) {
      index = 20;
    }
	}

  function decrementCount() {
    index--;
    if (index < 0) {
      index = 0;
    }
  }

  let outerWidth = 1000; 
  let innerWidth, outerHeight, innerHeight;

  
  $: {
    console.log(outerWidth)
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
      Huffman Trees
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

  
  
<a href="js/index.html" target="_blank" class="link">Go to js/index.html</a>

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
    align-items: center
  }

  .buttonDiv {
    display: flex;
		align-items: center;
		justify-content: space-between;
    width: 210px;
    margin: auto;
    height: 60px;
    font-family: 'Times New Roman', Times, serif;
    background-color: rgb(229, 230, 221);
  }


  button {
    font-family: 'Times New Roman', Times, serif;
    position: relative;
    bottom: 5px
  }

  
</style>
