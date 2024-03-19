<script>
    import Encoding from '$lib/components/Encoding.svelte';
    import { userInputStore } from '$lib/stores.js';

    // let userInputFromStore = '';

    // userInputStore.subscribe(value => {
    //     userInputFromStore = value;
    // });
</script>

<style>

</style>

<Encoding userInput={$userInputStore}/>

<p>{userInputStore}</p>
