<script lang="ts">
	import LineLink from "$lib/content/LineLink.svelte";

</script>


{#each [...Array(10).keys()] as n }
    <LineLink onclick={() => console.log(""+n)}>Test {n}</LineLink>
{/each}