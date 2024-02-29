<script>
  import { fly, draw } from "svelte/transition";
  import { tweened } from "svelte/motion";
  import { cubicOut, cubicInOut } from "svelte/easing";
  import { cities } from "../data/cities";
  import { troops } from "../data/troops";

  export let index, width, height;

  
  const lst = ["d", "a", "t", "_", "s", "c", "i", "e", "n", "l"];
  const lst1 = [": 1", ": 3", ": 1", ": 2", ": 3", ": 3", ": 1", ": 2", ": 1", ": 1"];
  const order = [0, 1, 2, 1, 3, 4, 5, 6, 7, 8, 5, 7, 3, 5, 9, 1, 4, 4]
  const start = 620;
  let x_pos = [];
  let y_pos = [];
  for (let i = 0; i < 18; i++) {
    x_pos.push(start + (i * 10));
    y_pos.push(40);
  }
  
  const tweenOptions = {
    delay: 0,
    duration: 1000,
    easing: cubicOut,
  };

  let letters = {"d": 0, "a": 20, "t": 40, "_": 60, "s": 80, "c": 100, "i": 120, "e": 140, "n": 160, "l": 180};

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
      letters = {"d": 0, "a": 20, "t": 40, "_": 60, "s": 80, "c": 100, "i": 120, "e": 140, "n": 160, "l": 180};
      x_pos = [];
      y_pos = [];
      for (let i = 0; i < 18; i++) {
        x_pos.push(start + (i * 10));
        y_pos.push(40);
      }
      $tweenedX = x_pos;
      $tweenedY = y_pos;
    }

    if (index === 1) {
      letters = {"d": 0, "a": 20, "t": 40, "_": 60, "s": 80, "c": 100, "i": 120, "e": 140, "n": 160, "l": 180};
      x_pos = [];
      y_pos = [];
      for (let i = 0; i < 18; i++) {
        x_pos.push(start + 50)
        y_pos.push(250 + letters[lst[order[i]]]);
      }
      $tweenedX = x_pos;
      $tweenedY = y_pos;
    }

    if (index > 1) {
      letters["t"] = 20;
      letters["i"] = 40;
      letters["n"] = 60;
      letters["l"] = 80;
      letters["_"] = 100;
      letters["e"] = 120;
      letters["a"] = 140;
      letters["s"] = 160;
      letters["c"] = 180;
      console.log(letters);
      x_pos = [];
      y_pos = [];
      for (let i = 0; i < 18; i++) {
        x_pos.push(start + 50)
        y_pos.push(250 + letters[lst[order[i]]]);
      }
      $tweenedX = x_pos;
      $tweenedY = y_pos;
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
        {lst1[order[i]]}
      </text>
    {/if}
  {/each}
</svg>

<style>
    .graph {
      width: 100%;
      height: 100vh; /* check problem when setting width */
      position: absolute;
      outline: white solid 7px;
      stroke-width: 1px;
      font-size: 20px;
      text-anchor: middle;
      stroke: #0d50ef;
    }
</style>