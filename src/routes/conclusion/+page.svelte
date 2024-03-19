<script>
    import Encoding from '$lib/components/Encoding.svelte';
    import { userInputStore } from '$lib/stores.js';

    // let userInputFromStore = '';

    // userInputStore.subscribe(value => {
    //     userInputFromStore = value;
    // });
    console.log($userInputStore)
</script>

<style>

</style>

<Encoding {$userInputStore}/>
<p>{$userInputStore}</p>
