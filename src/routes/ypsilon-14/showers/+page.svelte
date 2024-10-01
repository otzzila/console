<script lang="ts">
	import LineButton from '$lib/content/LineButton.svelte';
	import LineLink from '$lib/content/LineLink.svelte';
	import RawText from '$lib/content/RawText.svelte';
    import { AirlockName, AirlockState } from '../data';
    import type { PageData, ActionData } from './$types';
	let {data, form}: {data: PageData, form: ActionData} = $props()
    
    // Most recent airlock information
    let showers = $derived(form?.showers ?? data.showers)

    $effect(() =>{
        console.log({showers})
    })
</script>

{#each showers as status, idx}
<form method="post" action="/ypsilon-14/showers?">
    <input type="hidden" name="target" value={idx} />
    <input type="hidden" name="status" value={!status} />
    <LineButton>SHOWER {idx+1} [&gt; {status ? "ON " : "OFF"}]</LineButton>
</form>
{/each}

{#if form?.errorMsg }
    <RawText fgColor="error">{form?.errorMsg ?? ""}</RawText>
{/if}
<LineLink href={'controls'}>&lt; BACK</LineLink>