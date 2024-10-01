<script lang="ts">
	import type { HasChildren } from "$lib/util";

    interface LineButtonProps extends HasChildren, ThemeColoredProps {

    }
    let {children, fgColor = 'primary', bgColor = 'secondary'}: LineButtonProps = $props()
</script>

<button class={`w-full bg-${bgColor} hover:bg-${fgColor}`}>
    <pre class={`line text-left w-full bg-${bgColor} text-${fgColor} hover:text-${bgColor} hover:bg-${fgColor} text-6xl font-primary`}>{#if children}{@render children()}{/if}</pre>
</button>
