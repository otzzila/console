<script lang="ts">
	import {page} from '$app/stores'
	import LineLink from '$lib/content/LineLink.svelte';
	import RawText from '$lib/content/RawText.svelte';
	import Crt from '$lib/filters/Crt.svelte';
</script>

<Crt>
    <RawText>&nbsp;</RawText>
    <RawText fgColor="error">{$page.status} {$page.error?.message}</RawText>
    <LineLink href={"/ypsilon-14"}>Back</LineLink>
</Crt>

