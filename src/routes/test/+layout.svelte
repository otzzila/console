<script lang="ts">
	import Crt from '$lib/filters/Crt.svelte';

    // import "../app.css"

    let {children} = $props();
</script>

<Crt>
    <div class="m-4 max-h-full overflow-auto">
        {@render children()}
    </div>
</Crt>