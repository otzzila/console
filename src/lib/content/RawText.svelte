<script lang="ts">
    import type { HasChildren } from "$lib/util";
	

    let {children, fgColor = 'primary', bgColor = 'secondary'}: HasChildren & ThemeColoredProps = $props();
</script>


<div class={`text w-full bg-${bgColor} text-${fgColor} text-6xl font-primary`}>
    {#if children}
        {@render children()}
    {/if}
</div>