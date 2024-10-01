<script lang="ts">
    import type { HasChildren } from "$lib/util";

    interface RawTextProps extends HasChildren, ThemeColoredProps {
        pre?: boolean,
    }
	
    let {
        children,
        pre = false,
        fgColor = 'primary',
        bgColor = 'secondary',
    }: RawTextProps = $props();
</script>


<div class={`text w-full bg-${bgColor} text-${fgColor} text-6xl font-primary`}>
    {#if children}
        {#if pre}
            <pre class={`text w-full bg-${bgColor} text-${fgColor} text-6xl font-primary`}>{@render children()}</pre>
        {:else}
            {@render children()}
        {/if}
    {/if}
</div>