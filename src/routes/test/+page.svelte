<script lang="ts">
	import LineLink from "$lib/content/LineLink.svelte";

</script>


{#each [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20] as n }
    <LineLink onclick={() => console.log(""+n)}>Test {n}</LineLink>
{/each}