<script lang="ts">
	import type { ComponentProps, Snippet } from "svelte";

    interface LineLinkProps {
        children?: Snippet,
        href?: string,
        disabled?: boolean,
        selected?: boolean,
        onclick?: (() => any)
    }

    let { children, href = "#!", disabled = false, onclick,
        fgColor = 'primary', bgColor = 'secondary',
     ...others}: LineLinkProps & ThemeColoredProps = $props();

</script>

<a {href} {onclick} {...others}>
    <div class={`line w-full bg-${bgColor} text-${fgColor} hover:text-${bgColor} hover:bg-${fgColor} text-6xl font-primary`}>
        {#if children}
            {@render children()}
        {/if}
    </div>   
</a>

<style>

</style>
