<script>
  import { fly, fade, draw } from "svelte/transition";
  import { tweened } from "svelte/motion";
  import { cubicOut, cubicInOut } from "svelte/easing";
  import { cities } from "../data/cities";
  import { troops } from "../data/troops";

  export let index, width, height;

  const sent = "data_science_class";
  let sectionText = "";

  const start = 620;
  let x_pos = [];
  let y_pos = [];
  for (let i = 0; i < sent.length; i++) {
    x_pos.push(start + (i * 10));
    y_pos.push(40);
  }
  
  const tweenOptions = {
    delay: 0,
    duration: 1000,
    easing: cubicOut,
  };

  let lst = [];
  let lst1 = [];
  let order = [];
  let inds = {};
  let letters = {};
  let counter = 0;

  for (let l = 0; l < sent.length; l++) {
    if (!(sent[l] in letters)) {
      letters[sent[l]] = 0;
      inds[sent[l]] = counter;
      counter += 1;
    }
    letters[sent[l]] += 1;
    order.push(inds[sent[l]])
  }
  

  lst = Object.keys(letters);
  lst1 = Object.values(letters);

  let items = Object.keys(letters).map(function(key) {
    return [key, letters[key]];
  });
  items.sort(function(first, second) {
    return first[1] - second[1];
  });

  const tweenedX = tweened(
    x_pos,
    tweenOptions
  );

  const tweenedY = tweened(
    y_pos,
    tweenOptions
  );

  $: {
    if (index === 0) {
      
      x_pos = [];
      y_pos = [];
      for (let i = 0; i < sent.length; i++) {
        x_pos.push(start + (i * 10));
        y_pos.push(40);
      }
      $tweenedX = x_pos;
      $tweenedY = y_pos;
       sectionText = [
    "Section 1",
    "Huffman encoding is a compression algorithm",
    "made to compress data that are larger, primarily comprised of characters",
    "which take up 4 bytes. It converts it into bits, where characters dependent",
    "on their frequency are represented by 0 and 1s.",
    "An example given is dsc 106."
  ];
  let sectionId = "";

    }

    if (index === 1) {
      //sectionText = "Section 2"; 
      lst = [];
      lst1 = [];
      order = [];
      inds = {};
      letters = {};
      counter = 0;

      for (let l = 0; l < sent.length; l++) {
        if (!(sent[l] in letters)) {
          letters[sent[l]] = 0;
          inds[sent[l]] = counter;
          counter += 1;
        }
        letters[sent[l]] += 1;
        order.push(inds[sent[l]])
      }

      lst = Object.keys(letters);
      lst1 = Object.values(letters);

      x_pos = [];
      y_pos = [];
      for (let i = 0; i < 18; i++) {
        x_pos.push(start + 50)
        y_pos.push(250 + (20 * inds[lst[order[i]]]));
      }
      $tweenedX = x_pos;
      $tweenedY = y_pos;
      sectionText = "Section 2";

    }

    if (index === 2) {
      counter = 0;
      for (let l = 0; l < items.length; l++) {
        inds[items[l][0]] = counter;
        counter += 1;
      }

      x_pos = [];
      y_pos = [];
      for (let i = 0; i < 18; i++) {
        x_pos.push(start + 50)
        y_pos.push(250 + (20 * inds[lst[order[i]]]));
      }
      $tweenedX = x_pos;
      $tweenedY = y_pos;
      sectionText = "Section 3";
    }

    if (index === 3) {
      inds[items[0][0]] = 0
      inds[items[1][0]] = 0;
      x_pos = [];
      y_pos = [];
      for (let i = 0; i < 18; i++) {
        if (lst[order[i]] === items[0][0]) {
          x_pos.push(start);
        }
        else if (lst[order[i]] === items[1][0]) {
          x_pos.push(start + 100);
        }
        else {
          x_pos.push(start + 50);
        }
        y_pos.push(250 + (20 * inds[lst[order[i]]]));
      }
      $tweenedX = x_pos;
      $tweenedY = y_pos;
      console.log($tweenedY);
      sectionText = "Section 4";

    }

    if (index > 3) {
      
      letters["i"] = 0;
      letters["n"] = 20;
      letters["l"] = 40;
      letters["_"] = 60;
      letters["e"] = 80;
      letters["d"] = 170;
      letters["t"] = 170;
      letters["a"] = 200;
      letters["s"] = 220;
      letters["c"] = 240;
      x_pos = [];
      y_pos = [];
      for (let i = 0; i < 18; i++) {
        if (lst[order[i]] === "d") {
          x_pos.push(start);
        }
        else if (lst[order[i]] === "t") {
          x_pos.push(start + 100);
        }
        else {
          x_pos.push(start + 50);
        }
        y_pos.push(250 + letters[lst[order[i]]]);
      }
      $tweenedX = x_pos;
      $tweenedY = y_pos;
      console.log($tweenedY);
      sectionText = "Section 5";
    }

    


  }

  
</script>

<svg class="graph">
  {#each {length: 18} as _, i}
    <text
      x={$tweenedX[i]}
      y={$tweenedY[i]}
      id={lst[order[i]]}
      in:fly={{x: -300, duration: 200}}
      out:fly={{x: -300, duration: 200}}
    >
      {lst[order[i]]}
    </text>
    
    {#if index > 0}
      <text
        x={$tweenedX[i] + 20}
        y={$tweenedY[i]}
        id={lst1[order[i]]}
        in:fly={{x: 300, duration: 400}}
        out:fly={{x: 300, duration: 400}}
      >
        {": " + lst1[order[i]]}
      </text>
    {/if}
  {/each}
  {#if index > 2}
    <line
      x1={$tweenedX[0] + 15}
      y1={$tweenedY[0] - 20}
      x2={$tweenedX[0] + 50}
      y2={$tweenedY[0] - 50}
      stroke-width=2px
      in:fly={{x: 300, duration: 400}}
      out:fly={{x: 300, duration: 400}}
    >
    </line>
    <line
      x1={$tweenedX[2] + 15}
      y1={$tweenedY[2] - 20}
      x2={$tweenedX[2] - 25}
      y2={$tweenedY[2] - 50}
      stroke-width=2px
      in:fly={{x: 300, duration: 400}}
      out:fly={{x: 300, duration: 400}}
    >
    </line>
    <circle
        cx={$tweenedX[0] + 63}
        cy={$tweenedY[0] - 60}
        r=15
        fill="white"
        stroke-width=2px
        in:fly={{x: 300, duration: 400}}
        out:fly={{x: 300, duration: 400}}
    >
    </circle>
    <text
      transform="translate({$tweenedX[0] + 63}, {$tweenedY[0] - 53})"
      in:fly={{x: 300, duration: 400}}
      out:fly={{x: 300, duration: 400}}
    >
      {items[0][1] + items[1][1]}
    </text>
  {/if}

  {#if index <= 4}
  
    <text
      x={$tweenedX[0] + 400} 
      y={$tweenedY[0]}
      class="sectionText"
    >
      {sectionText}
    </text>
  {/if}

</svg>
<style>
    .scrollable-container {
      max-height: 100px; /* Set the maximum height of the container */
      overflow: auto;    /* Enable vertical scrollbar if content exceeds the height */
      border: 1px solid #ccc; /* Optional: Add border for visualization */
    }

    div {
      margin-bottom: 8px; /* Add some margin between lines */
    }
    .sectionText {
      font-size: 20px;
      fill: black; /* Set the text color */
      white-space: pre-line
    }
    .graph {
      width: 100%; /* Hello testing*/
      height: 100vh; /* check problem when se34535tting width */
      position: absolute;
      outline: white solid 7px;
      stroke-width: 1px;
      font-size: 20px;
      text-anchor: middle;
      stroke: #0d51ef;
    }
</style>