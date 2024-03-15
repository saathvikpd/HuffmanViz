<script>
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    import Frequencies from '../components/Frequencies.svelte';
    let userInput = '';
    let inputLocked = false;

    const position = tweened(0, { // Start in the center (50% of the parent width)
        duration: 400,
        easing: cubicOut
    });

    // Handle the lockInput event from Frequencies component
    function handleInputLock(event) {
        inputLocked = event.detail;
        if (inputLocked) {
            position.set(0); // Move to the left (0% of the parent width)
        } else {
            position.set(50); // Return to the center
        }
    }

    function reset() {
        window.location.reload();
    }
</script>


<div class="container-fluid">
    <div class="row mb-3">
        <div class="col-12">
            <button type="button" class="btn btn-outline-danger btn-sm float-start" on:click={reset}>Reset</button>
            <h1 class="text-center">Huffman Coding Visualization</h1>
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-md-4" style="transform: translateX({$position}%);">
            <div class="d-flex flex-column align-items-center">
                <textarea 
                    class="text-input form-control mb-3" 
                    bind:value={userInput} 
                    placeholder="Type some text here..." 
                    disabled={inputLocked}
                ></textarea>
                <Frequencies {userInput} on:lockInput={handleInputLock} />
            </div>
        </div>
        {#if inputLocked}
            <!-- This div takes up the remaining space when input is locked -->
            <div class="col-md-8">
                <!-- Content for the remaining 2/3 of the page goes here -->
            </div>
        {/if}
    </div>
</div>

  
<style>
    h1 {
        margin-top: 0.5rem;
        margin-bottom: 1rem;
    }

    .text-input {
        width: 100%; /* Bootstrap's form-control class is full width by default */
        height: 60px;
        margin-bottom: 1rem; /* Bootstrap's spacing utility for margin bottom */
        display: block;
        border-radius: 8px;
        padding: 10px;
        font-size: 1em;
        border: 1px solid #000000;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .container-fluid {
        padding: 2rem; /* Padding around the entire container */
    }

    .float-start {
        margin-right: 1rem;
    }
    .row {
        transition: margin-left 0.5s ease-in-out;
    }
</style>
