<script lang="ts">
    import { enhance } from '$app/forms';
	import { AirlockName, AirlockState } from '../ypsilon-14/data';

    import type { PageData, ActionData } from './$types';
	let{data, form}: {data: PageData, form: ActionData} = $props()

    let status = $derived(data.status)
    const AIRLOCK_STATES: AirlockState[] = [AirlockState.LOCKED, AirlockState.UNLOCKED, AirlockState.OPEN]
</script>

{#snippet airlock(name: AirlockName)}
    <div>
        <h2>{name}</h2>
        <div class="px-8">
            {#each AIRLOCK_STATES as state}
                <form method="post" action="?/airlock" use:enhance>
                    <input type="hidden" name="target" value={name} />
                    <input type="hidden" name="status" value={state} />
                    <button>{state}{state == status.airlocks[name] ? ' <' : ''}</button>
                </form>
            {/each}
        </div>
        
    </div>
{/snippet}

<div class="grid grid-cols-1 divide-y-8">
    <div>
        {#each status.showers as showerStatus, idx}
            <form method="post" action="?/shower" use:enhance>
                <input type="hidden" name="target" value={idx} />
                <input type="hidden" name="status" value={!showerStatus} />
                <button>SHOWER {idx+1} [&gt; {showerStatus ? "ON " : "OFF"}]</button>
            </form>
        {/each}
    </div>

    <div>
        <form method="post" action="?/lifeSupport" use:enhance>
            <input type="hidden" name="status" value={!status.lifeSupport} />
            <button>LIFE SUPPORT [&gt; {status.lifeSupport ? "ON " : "OFF"}]</button>
        </form>
    </div>

    <div>
        <form method="post" action="?/hasAdmin" use:enhance>
            <input type="hidden" name="status" value={!status.hasAdmin} />
            <button>HAS ADMIN [&gt; {status.hasAdmin ? "YES " : "NO"}]</button>
        </form>
    </div>

    <div>
        {@render airlock(AirlockName.BAY1)}

        {@render airlock(AirlockName.BAY2)}

        {@render airlock(AirlockName.MINESHAFT)}
    </div>
</div>


