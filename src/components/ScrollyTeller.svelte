<script>
  import Scroller from "@sveltejs/svelte-scroller";
  import Map from "./Map.svelte";
  import { geoMercator } from "d3-geo";
  import Graph from "./Graph.svelte";

  let count, index, offset, progress;
  let width, height;

  let geoJsonToFit = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [1, 0],
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [0, 1],
        },
      },
    ],
  };

  $: projection = geoMercator().fitSize([width, height], geoJsonToFit);

</script>

<Scroller
  top={0.0}
  bottom={1}
  threshold={0.5}
  bind:count
  bind:index
  bind:offset
  bind:progress
>
  <div 
    class="background"
    slot="background"
    bind:clientWidth={width}
    bind:clientHeight={height}
  >
    <!-- <Map bind:geoJsonToFit {index} /> -->
    <Graph {index} {width} {height}/>
    <!-- <div class = "box">
      <p><strong><u>d</u> <u>a</u> <u>t</u> <u>a</u> <u>_</u> <u>s</u> <u>c</u> <u>i</u> <u>e</u> <u>n</u> <u>c</u> <u>e</u> <u>_</u> <u>c</u> <u>l</u> <u>a</u> <u>s</u> <u>s</u></strong></p>
    </div> -->
    <div class="progress-bars">
      <p>current section: <strong>{index + 1}/{count}</strong></p>
      <progress value={count ? (index + 1) / count : 0} />

      <p>offset in current section</p>
      <progress value={offset || 0} />

      <p>total progress</p>
      <progress value={progress || 0} />
    </div>
  </div>

  <div class="foreground" slot="foreground">
    {#each {length: 10} as _, i}
      <section>
      </section>
    {/each}
    
  </div>

</Scroller>


<style>
  .background {
    width: 100%;
    height: 100vh;
    position: relative;
    outline: green solid 3px;
  }

  .foreground {
    width: 50%;
    margin: 0 auto;
    height: auto;
    position: relative;
    outline: white solid 3px;
  }

  .progress-bars {
    position: absolute;
    background: rgba(170, 51, 120, 0.2) /*  40% opaque */;
    visibility: visible;
  }

  .box {
    position: absolute;
    top: 20px;
    left: 450px;
    width: 30%;
    height: 12%;
    font-size: 30px;
    text-align: center;
    color: white;
    background: rgba(0, 0, 0, 0.9) /*  40% opaque */;
    visibility: visible;
  }

  section {
    height: 80vh;
    background-color: rgba(0, 0, 0, 0.2); /* 20% opaque */
    text-align: center;
    max-width: 750px; /* adjust at will */
    color: red;
    padding: 1em;
    margin: 0 0 2em 0;
  }
</style>
