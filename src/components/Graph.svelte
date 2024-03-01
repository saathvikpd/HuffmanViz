<script>
  import { fly, fade, draw } from "svelte/transition";
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

    if (index === 2) {
      letters["t"] = 20;
      letters["i"] = 40;
      letters["n"] = 60;
      letters["l"] = 80;
      letters["_"] = 100;
      letters["e"] = 120;
      letters["a"] = 140;
      letters["s"] = 160;
      letters["c"] = 180;
      x_pos = [];
      y_pos = [];
      for (let i = 0; i < 18; i++) {
        x_pos.push(start + 50)
        y_pos.push(250 + letters[lst[order[i]]]);
      }
      $tweenedX = x_pos;
      $tweenedY = y_pos;
    }

    if (index === 3) {
      letters["d"] = 0
      letters["t"] = 0;
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
      2
    </text>
  {/if}
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
      stroke: #0d51ef;
    }
</style>