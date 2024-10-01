<script lang="ts">
	import { onMount } from "svelte";

    import LineLink from "$lib/content/LineLink.svelte";
	import RawText from "$lib/content/RawText.svelte";

    let loading = true;
    onMount(async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));
            loading = !loading
        });
</script>

<RawText>COMMS</RawText>
{#if loading}
    <RawText>SCANNING FOR NEARBY SHIPS...</RawText>
{:else}
    <RawText>FOUND:</RawText>
    <LineLink>&gt; HAIL RSV THE HERACLES</LineLink>
    <LineLink>&gt; HAIL IMV GRASSHOPPER</LineLink>
{/if}
<LineLink href={'/ypsilon-14'}>&lt; BACK</LineLink>
