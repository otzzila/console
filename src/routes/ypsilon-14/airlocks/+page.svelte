<script lang="ts">
    import { enhance } from '$app/forms';

	import LineButton from '$lib/content/LineButton.svelte';
	import LineLink from '$lib/content/LineLink.svelte';
	import RawText from '$lib/content/RawText.svelte';
    import { AirlockName, AirlockState } from '../data';
    import type { PageData, ActionData } from './$types';
	let {data, form}: {data: PageData, form: ActionData} = $props()
    
    // Most recent airlock information
    let airlocks = $derived(data.airlocks)

    $effect(() =>{
        console.log({airlocks})
    })

    const getAirlockAction = (name: AirlockName) => {
       if (airlocks[name] == AirlockState.LOCKED){
        return {newState: AirlockState.UNLOCKED, actionText: "UNLOCK"}
       } else {
        return {newState: AirlockState.LOCKED, actionText: "LOCK"}
       }
    }

    const statusString = (name: AirlockName) => {
        if (airlocks[name] == AirlockState.LOCKED){
        return "LOCKED"
       } else {
        return "UNLOCKED"
       }
    }
</script>

{#snippet airlock(name: AirlockName)}
    {@const {newState, actionText} = getAirlockAction(name) }
    <form method="post" action="/ypsilon-14/airlocks?/modifyAirlock" use:enhance>
        <input type="hidden" name="target" value={name} />
        <input type="hidden" name="status" value={newState} />
        <LineButton>{(name as string).padEnd(10,' ')} {statusString(name)} [&gt; {actionText}]</LineButton>
    </form>
{/snippet}

{#if form?.errorMsg }
    <RawText fgColor="error">{form?.errorMsg ?? ""}</RawText>
{/if}

{@render airlock(AirlockName.BAY1)}

{@render airlock(AirlockName.BAY2)}

{@render airlock(AirlockName.MINESHAFT)}

<LineLink href={'controls'}>&lt; BACK</LineLink>
