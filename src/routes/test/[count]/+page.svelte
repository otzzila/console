<script lang="ts">
	import LineLink from "$lib/content/LineLink.svelte";
    import type { PageData } from './$types';
	
	export let data: PageData;
</script>


{#each [...Array(data.count).keys()] as n }
    <LineLink onclick={() => console.log("Clicked "+n)}>Test {n}</LineLink>
{/each}