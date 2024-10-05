<script lang="ts">
	import { enhance } from '$app/forms';
    
    import LineButton from '$lib/content/LineButton.svelte';
	import LineLink from '$lib/content/LineLink.svelte';
	import RawText from '$lib/content/RawText.svelte';
    import type { PageData, ActionData } from './$types';
	let {data, form}: {data: PageData, form: ActionData} = $props()
    
    // Most recent airlock information
    let lifeSupport = $derived(form?.lifeSupport ?? data.lifeSupport)

    $effect(() =>{
        console.log({lifeSupport})
    })
</script>


<RawText>LIFE SUPPORT</RawText>
<form method="post" action="/ypsilon-14/life-support?" use:enhance>
    <input type="hidden" name="status" value={!lifeSupport} />
    <LineButton>LIFE SUPPORT [&gt; {lifeSupport ? "ON " : "OFF"}]</LineButton>
</form>

{#if form?.errorMsg }
    <RawText fgColor="error">{form?.errorMsg ?? ""}</RawText>
{/if}

<LineLink href={'system'}>&lt; BACK</LineLink>