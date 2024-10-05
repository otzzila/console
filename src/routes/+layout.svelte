<script lang="ts">
    import "../app.css"

    let {children} = $props();
</script>


<div id="screen" class="w-full h-screen overflow-auto">
    {@render children()}
</div>
