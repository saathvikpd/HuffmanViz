<script>
    import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
    import Frequencies from '$lib/components/Frequencies.svelte';
    import HuffmanController from '$lib/components/HuffmanController.svelte';
    
    let userInput = '';
    let inputLocked = false;


    // Position for animating the column. Starting from 100% (centered),
    // we'll animate this to 33% to move to the left side.
    const position = tweened(33, {
        duration: 750,
        delay: 1000,
        easing: cubicInOut
    });

    // Handle the lockInput event from Frequencies component
    function handleInputLock(event) {
        inputLocked = event.detail;
        if (inputLocked) {
            position.set(0); // Animate to move to the left
        }
    }

    function reset() {
        window.location.reload();
    }

   


    function validateInput(event) {
        const inputValue = event.target.value;
        const regex = /^[a-zA-Z]*$/; // Regular expression to allow only letters

        if (!regex.test(inputValue)) {
            // If the input contains characters other than letters
            // Remove those characters from the input
            event.target.value = inputValue.replace(/[^a-zA-Z]/g, '');
        }
    }
</script>


<div class="container-fluid">

    <div class="row mb-3 align-items-start">
        <div class="col-md-4">
            <button type="button" class="btn btn-outline-danger btn-sm float-start" on:click={reset}>Reset</button>
        </div>
        <div class="col-md-4">
            <h1 class="text-center">Huffman Coding Visualization</h1>
        </div>
        <div class="col-md-4">
            <a href="/test/priorityqueue/">PriorityQueueTest</a>
        </div>
    </div>

    <div class="row justify-content-center" style="transform: translateX({$position}%)">
        <div class="col-md-4">
            <div class="d-flex flex-column align-items-center">
                <textarea 
                    class="text-input form-control mb-3" 
                    bind:value={userInput} 
                    placeholder="Type some text(letters only) here..." 
                    disabled={inputLocked}
                    on:input={validateInput}
                ></textarea>
                <Frequencies {userInput} on:lockInput={handleInputLock}/>
            </div>
        </div>
        <div class="col-md-8">
            <div class="d-flex flex-column align-items-center">
                <HuffmanController />
            </div>
        </div>
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
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .container-fluid {
        padding: 2rem; /* Padding around the entire container */
    }

    .float-start {
        margin-right: 1rem;
    }
    
	:global(body) {
		background-color: #f2eee2;
		color: #001221;
		transition: background-color 0.3s
	}
</style>
