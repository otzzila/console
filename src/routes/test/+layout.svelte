<script lang="ts">
	import Crt from '$lib/filters/Crt.svelte';

    // import "../app.css"

    let {children} = $props();
</script>

<Crt>
    <div class="p-4 max-h-full">
        {@render children()}
    </div>
</Crt>