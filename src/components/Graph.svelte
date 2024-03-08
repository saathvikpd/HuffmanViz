<script>
  import { fly, fade, draw } from "svelte/transition";
  import { tweened } from "svelte/motion";
  import { cubicOut, cubicInOut } from "svelte/easing";
  import { cities } from "../data/cities";
  import { troops } from "../data/troops";

  export let index, width, height;

  let obj = {
    sentence: "data_science_class",
    index: {}, // maps letter to order of appearance in sentence
    counts: {}, // maps letter to counts
    order: [], // holds the order of indices used to form the sentence [list]
    lst: [], // keys for counts, letters [list]
    lst1: [], // values for counts, counts for letters [list]
    items: [] // sorted counts of the form [key (letter), count]. [list]
  };

  let nodes = {};
  let node_counter = 0;

  
  const start = 650;
  let x_pos = [];
  let y_pos = [];
  for (let i = 0; i < obj.sentence.length; i++) {
    x_pos.push(start + (i * 10));
    y_pos.push(40);
  }
  
  const tweenOptions = {
    delay: 0,
    duration: 1000,
    easing: cubicOut,
  };

  let counter = 0;

  let sent = obj.sentence;
  for (let l = 0; l < sent.length; l++) {
    if (!(sent[l] in obj.counts)) {
      obj.counts[sent[l]] = 0;
      obj.index[sent[l]] = counter;
      counter += 1;
    }
    obj.counts[sent[l]] += 1;
    obj.order.push(obj.index[sent[l]]);
  }
  
  obj.lst = Object.keys(obj.counts);
  obj.lst1 = Object.values(obj.counts);
  obj.items = Object.keys(obj.counts).map(function(key) {
    return [key, obj.counts[key]];
  });
  obj.items.sort(function(first, second) {
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
      for (let i = 0; i < obj.sentence.length; i++) {
        x_pos.push(start + (i * 10));
        y_pos.push(250);
      }
      $tweenedX = x_pos;
      $tweenedY = y_pos;
    }

    if (index === 1) {
      counter = 0;

      obj = {
        sentence: "data_science_class",
        index: {},
        counts: {},
        order: [],
        lst: [],
        lst1: [],
        items: []
      };
      sent = obj.sentence;
      for (let l = 0; l < sent.length; l++) {
        if (!(sent[l] in obj.counts)) {
          obj.counts[sent[l]] = 0;
          obj.index[sent[l]] = counter;
          counter += 1;
        }
        obj.counts[sent[l]] += 1;
        obj.order.push(obj.index[sent[l]]);
      }
      obj.lst = Object.keys(obj.counts);
      obj.lst1 = Object.values(obj.counts);

      x_pos = [];
      y_pos = [];
      for (let i = 0; i < 18; i++) {
        x_pos.push(start + 50)
        y_pos.push(250 + (20 * obj.index[obj.lst[obj.order[i]]]));
      }
      $tweenedX = x_pos;
      $tweenedY = y_pos;
    }

    if (index === 2) {
      counter = 0;

      obj = {
        sentence: "data_science_class",
        index: {},
        counts: {},
        order: [],
        lst: [],
        lst1: [],
        items: []
      };
      sent = obj.sentence;
      for (let l = 0; l < sent.length; l++) {
        if (!(sent[l] in obj.counts)) {
          obj.counts[sent[l]] = 0;
          obj.index[sent[l]] = counter;
          counter += 1;
        }
        obj.counts[sent[l]] += 1;
        obj.order.push(obj.index[sent[l]]);
      }
      obj.lst = Object.keys(obj.counts);
      obj.lst1 = Object.values(obj.counts);
      obj.items = Object.keys(obj.counts).map(function(key) {
        return [key, obj.counts[key]];
      });
      obj.items.sort(function(first, second) {
        return first[1] - second[1];
      });

      counter = 0;
      for (let l = 0; l < obj.items.length; l++) {
        obj.index[obj.items[l][0]] = counter;
        counter += 1;
      }

      x_pos = [];
      y_pos = [];
      for (let i = 0; i < 18; i++) {
        x_pos.push(start + 50)
        y_pos.push(250 + (20 * obj.index[obj.lst[obj.order[i]]]));
      }
      console.log(obj.order);
      $tweenedX = x_pos;
      $tweenedY = y_pos;
    }

    if (index === 3) {

      counter = 0;
      for (let l = 0; l < obj.items.length; l++) {
        obj.index[obj.items[l][0]] = counter;
        counter += 1;
      }

      obj.index[obj.items[0][0]] = 0;
      obj.index[obj.items[1][0]] = 0;

      x_pos = [];
      y_pos = [];
      for (let i = 0; i < 18; i++) {
        if (obj.lst[obj.order[i]] === "d") {
          x_pos.push(start);
        }
        else if (obj.lst[obj.order[i]] === "t") {
          x_pos.push(start + 100);
        }
        else {
          x_pos.push(start + 50);
        }
        y_pos.push(250 + (20 * obj.index[obj.lst[obj.order[i]]]));
      }
      $tweenedX = x_pos;
      $tweenedY = y_pos;
    }

    if (index === 4) {
      

      obj.index["i"] = 0;
      obj.index["n"] = 1;
      obj.index["l"] = 2;
      obj.index["_"] = 3;
      obj.index["e"] = 4;
      obj.index["d"] = 8.5;
      obj.index["t"] = 8.5;
      obj.index["a"] = 10;
      obj.index["s"] = 11;
      obj.index["c"] = 12;
      x_pos = [];
      y_pos = [];
      for (let i = 0; i < 18; i++) {
        if (obj.lst[obj.order[i]] === "d") {
          x_pos.push(start);
        }
        else if (obj.lst[obj.order[i]] === "t") {
          x_pos.push(start + 100);
        }
        else {
          x_pos.push(start + 50);
        }
        y_pos.push(250 + (20 * obj.index[obj.lst[obj.order[i]]]));
      }
      $tweenedX = x_pos;
      $tweenedY = y_pos;
      console.log(y_pos)
    }

    if (index === 5) {
      obj.index["i"] = 0;
      obj.index["n"] = 0;
      obj.index["l"] = 2;
      obj.index["_"] = 3;
      obj.index["e"] = 4;
      obj.index["d"] = 8.5;
      obj.index["t"] = 8.5;
      obj.index["a"] = 10;
      obj.index["s"] = 11;
      obj.index["c"] = 12;

      x_pos = [];
      y_pos = [];
      for (let i = 0; i < 18; i++) {
        if ((obj.lst[obj.order[i]] === "d") || (obj.lst[obj.order[i]] === "i")) {
          x_pos.push(start);
        }
        else if ((obj.lst[obj.order[i]] === "t") || (obj.lst[obj.order[i]] === "n")) {
          x_pos.push(start + 100);
        }
        else {
          x_pos.push(start + 50);
        }
        y_pos.push(250 + (20 * obj.index[obj.lst[obj.order[i]]]));
      }
      $tweenedX = x_pos;
      $tweenedY = y_pos;
      console.log(y_pos)
    }

    if (index === 6) {

      obj.index["l"] = 0;
      obj.index["_"] = 1;
      obj.index["e"] = 2;
      obj.index["d"] = 6.5;
      obj.index["t"] = 6.5;
      obj.index["i"] = 11;
      obj.index["n"] = 11;
      obj.index["a"] = 12.5;
      obj.index["s"] = 13.5;
      obj.index["c"] = 14.5;
      x_pos = [];
      y_pos = [];
      for (let i = 0; i < 18; i++) {
        if ((obj.lst[obj.order[i]] === "d") || (obj.lst[obj.order[i]] === "i")) {
          x_pos.push(start);
        }
        else if ((obj.lst[obj.order[i]] === "t") || (obj.lst[obj.order[i]] === "n")) {
          x_pos.push(start + 100);
        }
        else {
          x_pos.push(start + 50);
        }
        y_pos.push(250 + (20 * obj.index[obj.lst[obj.order[i]]]));
      }
      $tweenedX = x_pos;
      $tweenedY = y_pos;

    }

    if (index === 7) {

      obj.index["l"] = 0;
      obj.index["_"] = 0;
      obj.index["e"] = 2;
      obj.index["d"] = 6.5;
      obj.index["t"] = 6.5;
      obj.index["i"] = 11;
      obj.index["n"] = 11;
      obj.index["a"] = 12.5;
      obj.index["s"] = 13.5;
      obj.index["c"] = 14.5;

      x_pos = [];
      y_pos = [];
      for (let i = 0; i < 18; i++) {
        if ((obj.lst[obj.order[i]] === "d") || 
            (obj.lst[obj.order[i]] === "i") ||
            (obj.lst[obj.order[i]] === "l")) {
          x_pos.push(start);
        }
        else if ((obj.lst[obj.order[i]] === "t") || 
                 (obj.lst[obj.order[i]] === "n") ||
                 (obj.lst[obj.order[i]] === "_")) {
          x_pos.push(start + 100);
        }
        else {
          x_pos.push(start + 50);
        }
        y_pos.push(250 + (20 * obj.index[obj.lst[obj.order[i]]]));
      }
      $tweenedX = x_pos;
      $tweenedY = y_pos;
    }

    if (index === 8) {
      
      obj.index["e"] = 0;
      obj.index["d"] = 4.5;
      obj.index["t"] = 4.5;
      obj.index["i"] = 9;
      obj.index["n"] = 9;
      obj.index["a"] = 10;
      obj.index["s"] = 11;
      obj.index["c"] = 12;
      obj.index["l"] = 16.5;
      obj.index["_"] = 16.5;
      x_pos = [];
      y_pos = [];
      for (let i = 0; i < 18; i++) {
        if ((obj.lst[obj.order[i]] === "d") || 
            (obj.lst[obj.order[i]] === "i") ||
            (obj.lst[obj.order[i]] === "l")) {
          x_pos.push(start);
        }
        else if ((obj.lst[obj.order[i]] === "t") || 
                 (obj.lst[obj.order[i]] === "n") ||
                 (obj.lst[obj.order[i]] === "_")) {
          x_pos.push(start + 100);
        }
        else {
          x_pos.push(start + 50);
        }
        y_pos.push(250 + (20 * obj.index[obj.lst[obj.order[i]]]));
      }
      $tweenedX = x_pos;
      $tweenedY = y_pos;

    }

    if (index === 9) {

      obj.index["e"] = 0;
      obj.index["d"] = 3;
      obj.index["t"] = 3;
      obj.index["i"] = 7.5;
      obj.index["n"] = 7.5;
      obj.index["a"] = 8.5;
      obj.index["s"] = 9.5;
      obj.index["c"] = 10.5;
      obj.index["l"] = 15;
      obj.index["_"] = 15;

      x_pos = [];
      y_pos = [];
      for (let i = 0; i < 18; i++) {
        if ((obj.lst[obj.order[i]] === "i") ||
            (obj.lst[obj.order[i]] === "l")) {
          x_pos.push(start);
        }
        else if (obj.lst[obj.order[i]] === "e") {
          x_pos.push(start - 50);
        }
        else if ((obj.lst[obj.order[i]] === "d") ||
                 (obj.lst[obj.order[i]] === "n") ||
                 (obj.lst[obj.order[i]] === "_")) {
          x_pos.push(start + 100);
        }
        else if (obj.lst[obj.order[i]] === "t") {
          x_pos.push(start + 200);
        }
        else {
          x_pos.push(start + 50);
        }
        y_pos.push(250 + (20 * obj.index[obj.lst[obj.order[i]]]));
      }
      $tweenedX = x_pos;
      $tweenedY = y_pos;
    }

    if (index === 10) {

      
      obj.index["i"] = 0;
      obj.index["n"] = 0;
      obj.index["a"] = 1;
      obj.index["s"] = 2;
      obj.index["c"] = 3;
      obj.index["l"] = 7.5;
      obj.index["_"] = 7.5;
      obj.index["e"] = 15;
      obj.index["d"] = 18;
      obj.index["t"] = 18;
      x_pos = [];
      y_pos = [];
      for (let i = 0; i < 18; i++) {
        if ((obj.lst[obj.order[i]] === "i") ||
            (obj.lst[obj.order[i]] === "l")) {
          x_pos.push(start);
        }
        else if (obj.lst[obj.order[i]] === "e") {
          x_pos.push(start - 50);
        }
        else if ((obj.lst[obj.order[i]] === "d") ||
                 (obj.lst[obj.order[i]] === "n") ||
                 (obj.lst[obj.order[i]] === "_")) {
          x_pos.push(start + 100);
        }
        else if (obj.lst[obj.order[i]] === "t") {
          x_pos.push(start + 200);
        }
        else {
          x_pos.push(start + 50);
        }
        y_pos.push(250 + (20 * obj.index[obj.lst[obj.order[i]]]));
      }
      $tweenedX = x_pos;
      $tweenedY = y_pos;

    }

    if (index === 11) {

      obj.index["i"] = 0;
      obj.index["n"] = 0;
      obj.index["a"] = -3;
      obj.index["s"] = 1;
      obj.index["c"] = 2;
      obj.index["l"] = 6.5;
      obj.index["_"] = 6.5;
      obj.index["e"] = 14;
      obj.index["d"] = 17;
      obj.index["t"] = 17;

      x_pos = [];
      y_pos = [];
      for (let i = 0; i < 18; i++) {
        if ((obj.lst[obj.order[i]] === "l") || 
            (obj.lst[obj.order[i]] === "n")) {
          x_pos.push(start);
        }
        else if (obj.lst[obj.order[i]] === "e") {
          x_pos.push(start - 50);
        }
        else if (obj.lst[obj.order[i]] === "a") {
          x_pos.push(start + 150);
        }
        else if ((obj.lst[obj.order[i]] === "d") ||
                (obj.lst[obj.order[i]] === "_")) {
          x_pos.push(start + 100);
        }
        else if (obj.lst[obj.order[i]] === "t") {
          x_pos.push(start + 200);
        }
        else if (obj.lst[obj.order[i]] === "i") {
          x_pos.push(start - 100);
        }
        else {
          x_pos.push(start + 50);
        }
        y_pos.push(200 + (20 * obj.index[obj.lst[obj.order[i]]]));
      }
      $tweenedX = x_pos;
      $tweenedY = y_pos;
    }

    if (index === 12) {


      
      obj.index["s"] = 0;
      obj.index["c"] = 1;
      obj.index["l"] = 5.5;
      obj.index["_"] = 5.5;
      obj.index["e"] = 13;
      obj.index["d"] = 16;
      obj.index["t"] = 16;
      obj.index["i"] = 25;
      obj.index["n"] = 25;
      obj.index["a"] = 22;
      
      x_pos = [];
      y_pos = [];
      for (let i = 0; i < 18; i++) {
        if ((obj.lst[obj.order[i]] === "l") || 
            (obj.lst[obj.order[i]] === "n")) {
          x_pos.push(start);
        }
        else if (obj.lst[obj.order[i]] === "e") {
          x_pos.push(start - 50);
        }
        else if (obj.lst[obj.order[i]] === "a") {
          x_pos.push(start + 150);
        }
        else if ((obj.lst[obj.order[i]] === "d") ||
                (obj.lst[obj.order[i]] === "_")) {
          x_pos.push(start + 100);
        }
        else if (obj.lst[obj.order[i]] === "t") {
          x_pos.push(start + 200);
        }
        else if (obj.lst[obj.order[i]] === "i") {
          x_pos.push(start - 100);
        }
        else {
          x_pos.push(start + 50);
        }
        y_pos.push(200 + (20 * obj.index[obj.lst[obj.order[i]]]));
      }
      $tweenedX = x_pos;
      $tweenedY = y_pos;

    }

    if (index === 13) {

      obj.index["s"] = 0;
      obj.index["c"] = 0;
      obj.index["l"] = 5.5;
      obj.index["_"] = 5.5;
      obj.index["e"] = 13;
      obj.index["d"] = 16;
      obj.index["t"] = 16;
      obj.index["i"] = 25;
      obj.index["n"] = 25;
      obj.index["a"] = 22;

      x_pos = [];
      y_pos = [];
      for (let i = 0; i < 18; i++) {
        if ((obj.lst[obj.order[i]] === "l") || 
            (obj.lst[obj.order[i]] === "n") ||
            (obj.lst[obj.order[i]] === "s")) {
          x_pos.push(start);
        }
        else if (obj.lst[obj.order[i]] === "e") {
          x_pos.push(start - 50);
        }
        else if (obj.lst[obj.order[i]] === "a") {
          x_pos.push(start + 150);
        }
        else if ((obj.lst[obj.order[i]] === "d") ||
                 (obj.lst[obj.order[i]] === "_") ||
                 (obj.lst[obj.order[i]] === "c")) {
          x_pos.push(start + 100);
        }
        else if (obj.lst[obj.order[i]] === "t") {
          x_pos.push(start + 200);
        }
        else if (obj.lst[obj.order[i]] === "i") {
          x_pos.push(start - 100);
        }
        else {
          x_pos.push(start + 50);
        }
        y_pos.push(200 + (20 * obj.index[obj.lst[obj.order[i]]]));
      }
      $tweenedX = x_pos;
      $tweenedY = y_pos;
    }

    if (index === 14) {

      obj.index["l"] = 0;
      obj.index["_"] = 0;
      obj.index["e"] = 7.5;
      obj.index["d"] = 10.5;
      obj.index["t"] = 10.5;
      obj.index["i"] = 19.5;
      obj.index["n"] = 19.5;
      obj.index["a"] = 16.5;
      obj.index["s"] = 25;
      obj.index["c"] = 25;

      x_pos = [];
      y_pos = [];
      for (let i = 0; i < 18; i++) {
        if ((obj.lst[obj.order[i]] === "l") || 
            (obj.lst[obj.order[i]] === "n") ||
            (obj.lst[obj.order[i]] === "s")) {
          x_pos.push(start);
        }
        else if (obj.lst[obj.order[i]] === "e") {
          x_pos.push(start - 50);
        }
        else if (obj.lst[obj.order[i]] === "a") {
          x_pos.push(start + 150);
        }
        else if ((obj.lst[obj.order[i]] === "d") ||
                 (obj.lst[obj.order[i]] === "_") ||
                 (obj.lst[obj.order[i]] === "c")) {
          x_pos.push(start + 100);
        }
        else if (obj.lst[obj.order[i]] === "t") {
          x_pos.push(start + 200);
        }
        else if (obj.lst[obj.order[i]] === "i") {
          x_pos.push(start - 100);
        }
        else {
          x_pos.push(start + 50);
        }
        y_pos.push(200 + (20 * obj.index[obj.lst[obj.order[i]]]));
      }
      $tweenedX = x_pos;
      $tweenedY = y_pos;

    }

    if (index === 15) {

      obj.index["l"] = 4;
      obj.index["_"] = 4;
      obj.index["e"] = 6.5;
      obj.index["d"] = 9.5;
      obj.index["t"] = 9.5;
      obj.index["i"] = 19.5;
      obj.index["n"] = 19.5;
      obj.index["a"] = 16.5;
      obj.index["s"] = 25;
      obj.index["c"] = 25;

      x_pos = [];
      y_pos = [];
      for (let i = 0; i < 18; i++) {
        if ((obj.lst[obj.order[i]] === "n") ||
            (obj.lst[obj.order[i]] === "s")) {
          x_pos.push(start);
        }
        else if (obj.lst[obj.order[i]] === "_") {
          x_pos.push(start - 45);
        }
        else if (obj.lst[obj.order[i]] === "l") {
          x_pos.push(start - 145)
        }
        else if (obj.lst[obj.order[i]] === "a"){
          x_pos.push(start + 150);
        }
        else if (obj.lst[obj.order[i]] === "e") {
          x_pos.push(start + 105);
        }
        else if (obj.lst[obj.order[i]] === "d") {
          x_pos.push(start + 255);
        }
        else if (obj.lst[obj.order[i]] === "c") {
          x_pos.push(start + 100);
        }
        else if (obj.lst[obj.order[i]] === "t") {
          x_pos.push(start + 355);
        }
        else if (obj.lst[obj.order[i]] === "i") {
          x_pos.push(start - 100);
        }
        else {
          x_pos.push(start + 50);
        }
        y_pos.push(200 + (20 * obj.index[obj.lst[obj.order[i]]]));
      }
      $tweenedX = x_pos;
      $tweenedY = y_pos;

    }

    if (index === 16) {

      obj.index["a"] = -2;
      obj.index["i"] = 1;
      obj.index["n"] = 1;
      obj.index["s"] = 6.5;
      obj.index["c"] = 6.5;
      obj.index["l"] = 19;
      obj.index["_"] = 19;
      obj.index["e"] = 21.5;
      obj.index["d"] = 24.5;
      obj.index["t"] = 24.5;

      x_pos = [];
      y_pos = [];
      for (let i = 0; i < 18; i++) {
        if ((obj.lst[obj.order[i]] === "n") ||
            (obj.lst[obj.order[i]] === "s")) {
          x_pos.push(start);
        }
        else if (obj.lst[obj.order[i]] === "_") {
          x_pos.push(start - 45);
        }
        else if (obj.lst[obj.order[i]] === "l") {
          x_pos.push(start - 145)
        }
        else if (obj.lst[obj.order[i]] === "a"){
          x_pos.push(start + 150);
        }
        else if (obj.lst[obj.order[i]] === "e") {
          x_pos.push(start + 105);
        }
        else if (obj.lst[obj.order[i]] === "d") {
          x_pos.push(start + 255);
        }
        else if (obj.lst[obj.order[i]] === "c") {
          x_pos.push(start + 100);
        }
        else if (obj.lst[obj.order[i]] === "t") {
          x_pos.push(start + 355);
        }
        else if (obj.lst[obj.order[i]] === "i") {
          x_pos.push(start - 100);
        }
        else {
          x_pos.push(start + 50);
        }
        y_pos.push(200 + (20 * obj.index[obj.lst[obj.order[i]]]));
      }
      $tweenedX = x_pos;
      $tweenedY = y_pos;

    }

    if (index === 17) {

      obj.index["a"] = 4.5;
      obj.index["i"] = 7.5;
      obj.index["n"] = 7.5;
      obj.index["s"] = 2;
      obj.index["c"] = 2;
      obj.index["l"] = 19;
      obj.index["_"] = 19;
      obj.index["e"] = 21.5;
      obj.index["d"] = 24.5;
      obj.index["t"] = 24.5;

      x_pos = [];
      y_pos = [];
      for (let i = 0; i < 18; i++) {
        if (obj.lst[obj.order[i]] === "n") {
          x_pos.push(start - 145);
        }
        else if (obj.lst[obj.order[i]] === "s") {
          x_pos.push(start + 155);
        }
        else if (obj.lst[obj.order[i]] === "_") {
          x_pos.push(start - 45);
        }
        else if (obj.lst[obj.order[i]] === "l") {
          x_pos.push(start - 145)
        }
        else if (obj.lst[obj.order[i]] === "a"){
          x_pos.push(start + 5);
        }
        else if (obj.lst[obj.order[i]] === "e") {
          x_pos.push(start + 105);
        }
        else if (obj.lst[obj.order[i]] === "d") {
          x_pos.push(start + 255);
        }
        else if (obj.lst[obj.order[i]] === "c") {
          x_pos.push(start + 255);
        }
        else if (obj.lst[obj.order[i]] === "t") {
          x_pos.push(start + 355);
        }
        else if (obj.lst[obj.order[i]] === "i") {
          x_pos.push(start - 245);
        }
        else {
          x_pos.push(start + 50);
        }
        y_pos.push(200 + (20 * obj.index[obj.lst[obj.order[i]]]));
      }
      $tweenedX = x_pos;
      $tweenedY = y_pos;

    }

    if (index === 18) {

      obj.index["l"] = 2;
      obj.index["_"] = 2;
      obj.index["e"] = 4.5;
      obj.index["d"] = 7.5;
      obj.index["t"] = 7.5;
      obj.index["a"] = 22;
      obj.index["i"] = 25;
      obj.index["n"] = 25;
      obj.index["s"] = 19.5;
      obj.index["c"] = 19.5;

      x_pos = [];
      y_pos = [];
      for (let i = 0; i < 18; i++) {
        if (obj.lst[obj.order[i]] === "n") {
          x_pos.push(start - 145);
        }
        else if (obj.lst[obj.order[i]] === "s") {
          x_pos.push(start + 155);
        }
        else if (obj.lst[obj.order[i]] === "_") {
          x_pos.push(start - 45);
        }
        else if (obj.lst[obj.order[i]] === "l") {
          x_pos.push(start - 145)
        }
        else if (obj.lst[obj.order[i]] === "a"){
          x_pos.push(start + 5);
        }
        else if (obj.lst[obj.order[i]] === "e") {
          x_pos.push(start + 105);
        }
        else if (obj.lst[obj.order[i]] === "d") {
          x_pos.push(start + 255);
        }
        else if (obj.lst[obj.order[i]] === "c") {
          x_pos.push(start + 255);
        }
        else if (obj.lst[obj.order[i]] === "t") {
          x_pos.push(start + 355);
        }
        else if (obj.lst[obj.order[i]] === "i") {
          x_pos.push(start - 245);
        }
        else {
          x_pos.push(start + 50);
        }
        y_pos.push(200 + (20 * obj.index[obj.lst[obj.order[i]]]));
      }
      $tweenedX = x_pos;
      $tweenedY = y_pos;

    }

    if (index === 19) {

      obj.index["l"] = 16;
      obj.index["_"] = 16;
      obj.index["e"] = 18.5;
      obj.index["d"] = 21.5;
      obj.index["t"] = 21.5;
      obj.index["a"] = 18.5;
      obj.index["i"] = 21.5;
      obj.index["n"] = 21.5;
      obj.index["s"] = 16;
      obj.index["c"] = 16;

      x_pos = [];
      y_pos = [];
      for (let i = 0; i < 18; i++) {
        if (obj.lst[obj.order[i]] === "n") {
          x_pos.push(start + 205);
        }
        else if (obj.lst[obj.order[i]] === "s") {
          x_pos.push(start + 505);
        }
        else if (obj.lst[obj.order[i]] === "_") {
          x_pos.push(start - 395);
        }
        else if (obj.lst[obj.order[i]] === "l") {
          x_pos.push(start - 495)
        }
        else if (obj.lst[obj.order[i]] === "a"){
          x_pos.push(start + 355);
        }
        else if (obj.lst[obj.order[i]] === "e") {
          x_pos.push(start - 245);
        }
        else if (obj.lst[obj.order[i]] === "d") {
          x_pos.push(start - 95);
        }
        else if (obj.lst[obj.order[i]] === "c") {
          x_pos.push(start + 605);
        }
        else if (obj.lst[obj.order[i]] === "t") {
          x_pos.push(start + 5);
        }
        else if (obj.lst[obj.order[i]] === "i") {
          x_pos.push(start + 105);
        }
        else {
          x_pos.push(start + 50);
        }
        y_pos.push(200 + (20 * obj.index[obj.lst[obj.order[i]]]));
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
      id={obj.lst[obj.order[i]]}
      in:fly={{x: -300, duration: 200}}
      out:fly={{x: -300, duration: 200}}
    >
      {obj.lst[obj.order[i]]}
    </text>
    {#if index > 0}
      <text
        x={$tweenedX[i] + 20}
        y={$tweenedY[i]}
        id={obj.lst1[obj.order[i]]}
        in:fly={{x: 300, duration: 400}}
        out:fly={{x: 300, duration: 400}}
      >
        {": " + obj.lst1[obj.order[i]]}
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

  {#if index > 4}
    <line
      x1={$tweenedX[7] + 15}
      y1={$tweenedY[7] - 20}
      x2={$tweenedX[7] + 50}
      y2={$tweenedY[7] - 50}
      stroke-width=2px
      in:fly={{x: 300, duration: 400}}
      out:fly={{x: 300, duration: 400}}
    >
    </line>
    <line
      x1={$tweenedX[9] + 15}
      y1={$tweenedY[9] - 20}
      x2={$tweenedX[9] - 25}
      y2={$tweenedY[9] - 50}
      stroke-width=2px
      in:fly={{x: 300, duration: 400}}
      out:fly={{x: 300, duration: 400}}
    >
    </line>
    <circle
        cx={$tweenedX[7] + 63}
        cy={$tweenedY[7] - 60}
        r=15
        fill="white"
        stroke-width=2px
        in:fly={{x: 300, duration: 400}}
        out:fly={{x: 300, duration: 400}}
    >
    </circle>
    <text
      transform="translate({$tweenedX[7] + 63}, {$tweenedY[7] - 53})"
      in:fly={{x: 300, duration: 400}}
      out:fly={{x: 300, duration: 400}}
    >
      2
    </text>
  {/if}

  {#if index > 6}
    <line
      x1={$tweenedX[14] + 15}
      y1={$tweenedY[14] - 20}
      x2={$tweenedX[14] + 50}
      y2={$tweenedY[14] - 50}
      stroke-width=2px
      in:fly={{x: 300, duration: 400}}
      out:fly={{x: 300, duration: 400}}
    >
    </line>
    <line
      x1={$tweenedX[4] + 15}
      y1={$tweenedY[4] - 20}
      x2={$tweenedX[4] - 25}
      y2={$tweenedY[4] - 50}
      stroke-width=2px
      in:fly={{x: 300, duration: 400}}
      out:fly={{x: 300, duration: 400}}
    >
    </line>
    <circle
        cx={$tweenedX[14] + 63}
        cy={$tweenedY[14] - 60}
        r=15
        fill="white"
        stroke-width=2px
        in:fly={{x: 300, duration: 400}}
        out:fly={{x: 300, duration: 400}}
    >
    </circle>
    <text
      transform="translate({$tweenedX[14] + 63}, {$tweenedY[14] - 53})"
      in:fly={{x: 300, duration: 400}}
      out:fly={{x: 300, duration: 400}}
    >
      3
    </text>
  {/if}

  {#if index > 8}
    <line
      x1={$tweenedX[8] + 15}
      y1={$tweenedY[8] - 20}
      x2={$tweenedX[8] + 100}
      y2={$tweenedY[8] - 100}
      stroke-width=2px
      in:fly={{x: 300, duration: 400}}
      out:fly={{x: 300, duration: 400}}
    >
    </line>
    <line
      x1={$tweenedX[8] + 215}
      y1={$tweenedY[8] - 20}
      x2={$tweenedX[8] + 125}
      y2={$tweenedY[8] - 100}
      stroke-width=2px
      in:fly={{x: 300, duration: 400}}
      out:fly={{x: 300, duration: 400}}
    >
    </line>
    <circle
        cx={$tweenedX[8] + 114}
        cy={$tweenedY[8] - 109}
        r=15
        fill="white"
        stroke-width=2px
        in:fly={{x: 300, duration: 400}}
        out:fly={{x: 300, duration: 400}}
    >
    </circle>
    <text
      transform="translate({$tweenedX[8] + 114}, {$tweenedY[8] - 102})"
      in:fly={{x: 300, duration: 400}}
      out:fly={{x: 300, duration: 400}}
    >
      4
    </text>
  {/if}

  {#if index > 10}
    <line
      x1={$tweenedX[1] - 185}
      y1={$tweenedY[1] - 20}
      x2={$tweenedX[1] - 103}
      y2={$tweenedY[1] - 100}
      stroke-width=2px
      in:fly={{x: 300, duration: 400}}
      out:fly={{x: 300, duration: 400}}
    >
    </line>
    <line
      x1={$tweenedX[1] + 15}
      y1={$tweenedY[1] - 20}
      x2={$tweenedX[1] - 73}
      y2={$tweenedY[1] - 100}
      stroke-width=2px
      in:fly={{x: 300, duration: 400}}
      out:fly={{x: 300, duration: 400}}
    >
    </line>
    <circle
        cx={$tweenedX[1] - 88}
        cy={$tweenedY[1] - 109}
        r=15
        fill="white"
        stroke-width=2px
        in:fly={{x: 300, duration: 400}}
        out:fly={{x: 300, duration: 400}}
    >
    </circle>
    <text
      transform="translate({$tweenedX[1] - 88}, {$tweenedY[1] - 103})"
      in:fly={{x: 300, duration: 400}}
      out:fly={{x: 300, duration: 400}}
    >
      5
    </text>
  {/if}

  {#if index > 12}
    <line
      x1={$tweenedX[5] + 15}
      y1={$tweenedY[5] - 20}
      x2={$tweenedX[5] + 50}
      y2={$tweenedY[5] - 50}
      stroke-width=2px
      in:fly={{x: 300, duration: 400}}
      out:fly={{x: 300, duration: 400}}
    >
    </line>
    <line
      x1={$tweenedX[6] + 15}
      y1={$tweenedY[6] - 20}
      x2={$tweenedX[6] - 25}
      y2={$tweenedY[6] - 50}
      stroke-width=2px
      in:fly={{x: 300, duration: 400}}
      out:fly={{x: 300, duration: 400}}
    >
    </line>
    <circle
        cx={$tweenedX[5] + 63}
        cy={$tweenedY[5] - 60}
        r=15
        fill="white"
        stroke-width=2px
        in:fly={{x: 300, duration: 400}}
        out:fly={{x: 300, duration: 400}}
    >
    </circle>
    <text
      transform="translate({$tweenedX[5] + 63}, {$tweenedY[5] - 53})"
      in:fly={{x: 300, duration: 400}}
      out:fly={{x: 300, duration: 400}}
    >
      6
    </text>
  {/if}

  {#if index > 14}
    <line
      x1={$tweenedX[8] - 185}
      y1={$tweenedY[8] - 128}
      x2={$tweenedX[8] - 58}
      y2={$tweenedY[8] - 235}
      stroke-width=2px
      in:fly={{x: 300, duration: 400}}
      out:fly={{x: 300, duration: 400}}
    >
    </line>
    <line
      x1={$tweenedX[8] + 111}
      y1={$tweenedY[8] - 128}
      x2={$tweenedX[8] - 26}
      y2={$tweenedY[8] - 235}
      stroke-width=2px
      in:fly={{x: 300, duration: 400}}
      out:fly={{x: 300, duration: 400}}
    >
    </line>
    <circle
        cx={$tweenedX[8] - 42}
        cy={$tweenedY[8] - 240}
        r=15
        fill="white"
        stroke-width=2px
        in:fly={{x: 300, duration: 400}}
        out:fly={{x: 300, duration: 400}}
    >
    </circle>
    <text
      transform="translate({$tweenedX[8] - 42}, {$tweenedY[8] - 234})"
      in:fly={{x: 300, duration: 400}}
      out:fly={{x: 300, duration: 400}}
    >
      7
    </text>
  {/if}

  {#if index > 16}
    <line
      x1={$tweenedX[1] - 85}
      y1={$tweenedY[1] - 128}
      x2={$tweenedX[1] + 42}
      y2={$tweenedY[1] - 235}
      stroke-width=2px
      in:fly={{x: 300, duration: 400}}
      out:fly={{x: 300, duration: 400}}
    >
    </line>
    <line
      x1={$tweenedX[1] + 211}
      y1={$tweenedY[1] - 128}
      x2={$tweenedX[1] + 74}
      y2={$tweenedY[1] - 235}
      stroke-width=2px
      in:fly={{x: 300, duration: 400}}
      out:fly={{x: 300, duration: 400}}
    >
    </line>
    <circle
        cx={$tweenedX[1] + 58}
        cy={$tweenedY[1] - 240}
        r=15
        fill="white"
        stroke-width=2px
        in:fly={{x: 300, duration: 400}}
        out:fly={{x: 300, duration: 400}}
    >
    </circle>
    <text
      transform="translate({$tweenedX[1] + 58}, {$tweenedY[1] - 234})"
      in:fly={{x: 300, duration: 400}}
      out:fly={{x: 300, duration: 400}}
    >
      11
    </text>
  {/if}

  {#if index > 18}
    <line
      x1={$tweenedX[4] + 111}
      y1={$tweenedY[4] - 210}
      x2={$tweenedX[4] + 450}
      y2={$tweenedY[4] - 395}
      stroke-width=2px
      in:fly={{x: 300, duration: 400}}
      out:fly={{x: 300, duration: 400}}
    >
    </line>
    <line
      x1={$tweenedX[4] + 806}
      y1={$tweenedY[4] - 210}
      x2={$tweenedX[4] + 490}
      y2={$tweenedY[4] - 395}
      stroke-width=2px
      in:fly={{x: 300, duration: 400}}
      out:fly={{x: 300, duration: 400}}
    >
    </line>
    <circle
        cx={$tweenedX[4] + 470}
        cy={$tweenedY[4] - 400}
        r=18
        fill="white"
        stroke-width=2px
        in:fly={{x: 300, duration: 400}}
        out:fly={{x: 300, duration: 400}}
    >
    </circle>
    <text
      transform="translate({$tweenedX[4] + 469}, {$tweenedY[4] - 393})"
      in:fly={{x: 300, duration: 400}}
      out:fly={{x: 300, duration: 400}}
    >
     18
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