<script lang="ts">
    import LineLink from '$lib/content/LineLink.svelte';
	import RawText from '$lib/content/RawText.svelte';

    let {data} = $props()

</script>

<RawText>SYSTEM</RawText>
{#if data.hasAdmin}
<RawText>[ACCESS GRANTED. WELCOME, SONYA.]</RawText>
<LineLink href={'life-support'}>&gt; LIFE SUPPORT</LineLink>
<LineLink href={'scuttle'}>&gt; SCUTTLE</LineLink>
{:else}
<RawText fgColor="error">[ACCESS DENIED. ADMIN KEYCARD REQUIRED.]</RawText>
{/if}
<LineLink href={'controls'}>&lt; BACK</LineLink>