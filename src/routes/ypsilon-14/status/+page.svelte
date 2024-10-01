<script lang="ts">
    import LineLink from "$lib/content/LineLink.svelte";
	import RawText from "$lib/content/RawText.svelte";

</script>

<RawText>STATUS</RawText>
<RawText>SYSTEMS CHECK ...</RawText>
<RawText fgColor="warn">WARNING: AIR FILTERS LAST REPLACED 455 DAYS AGO</RawText>
<RawText>(255 DAYS PAST RECOMMENDATION)</RawText>
<RawText>&nbsp;</RawText>
<RawText fgColor="warn">WARNING: SHOWER 5 OUT OF ORDER AS OF 1 DAY AGO</RawText>
<RawText>&nbsp;</RawText>
<RawText fgColor="warn">WARNING: MINESHAFT ELEVATOR LAST MAINTAINED 455 DAYS AGO</RawText>
<RawText>(255 DAYS PAST RECOMMENDATION)</RawText>
<RawText>&nbsp;</RawText>
<RawText fgColor="warn">WARNING: AIRFLOW 82%</RawText>
<RawText>(SUBOPTIMAL: REPLACE FILTERS AND CHECK VENTS FOR BLOCKAGES)</RawText>
<RawText>&nbsp;</RawText>
<RawText>ALL SYSTEMS WITHIN ACCEPTABLE OPERATING CONDITIONS</RawText>
<LineLink href={'diagnostics'}>&lt; BACK</LineLink>
