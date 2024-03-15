<script>
    function toggle() {
        window.document.body.classList.toggle('dark-mode')
    }
</script>


<button type="button" class="btn btn-outline btn-sm float-start" on:click={toggle}>
    <slot/>
</button>


<style>

    :global(body.dark-mode) button {
        background-color: #0084f6;
        color: white;
    }
</style>