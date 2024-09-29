<script lang="ts">
	import type { ComponentProps, Snippet } from "svelte";

    interface LineLinkProps {
        children?: Snippet,
        href?: string,
        disabled?: boolean,
        onclick?: (() => any)
    }

    let { children, href = "#!", disabled = false, onclick, ...others}: LineLinkProps = $props();

</script>

<a {href} {onclick} {...others}>
    <div class="line w-full bg-secondary text-primary hover:text-secondary hover:bg-primary text-6xl font-primary">
        {#if children}
            {@render children()}
        {/if}
    </div>   
</a>

<style>

</style>
