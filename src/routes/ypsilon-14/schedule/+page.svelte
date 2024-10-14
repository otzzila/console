<script lang="ts">
    import {spaceYear, shipName} from '../data'

    import LineLink from "$lib/content/LineLink.svelte";
	import RawText from "$lib/content/RawText.svelte";


    const pcShipExtended = shipName.replaceAll(' ', '\u00A0').padEnd(18, '.')

</script>

<RawText>DIAGNOSTICS</RawText>
<RawText>SCHEDULE</RawText>
<RawText>{spaceYear}-07-02&nbsp;06:33 -  {pcShipExtended} - RESUPPLY - BAY&nbsp;2 - DOCK</RawText>
<RawText>{spaceYear}-06-04&nbsp;08:34 -  RSV&nbsp;THE&nbsp;HERACLES.. - RESEARCH - BAY&nbsp;1 - DOCK</RawText>
<RawText>{spaceYear}-06-02&nbsp;12:23 -  CTV&nbsp;HORN&nbsp;OV&nbsp;PLENTY - RESUPPLY - BAY&nbsp;2 - DEPART</RawText>
<RawText>{spaceYear}-06-01&nbsp;16:04 -  CTV&nbsp;HORN&nbsp;OV&nbsp;PLENTY - RESUPPLY - BAY&nbsp;2 - DOCK</RawText>
<RawText>{spaceYear}-05-02&nbsp;08:32 -  MCH&nbsp;VASQUEZ&nbsp;XV.... - PICKUP   - BAY&nbsp;1 - DEPART</RawText>
<RawText>{spaceYear}-05-01&nbsp;06:02 -  MCH&nbsp;VASQUEZ&nbsp;XV.... - PICKUP   - BAY&nbsp;1 - DOCK</RawText>
<RawText>{spaceYear}-04-02&nbsp;13:02 -  CTV&nbsp;HORN&nbsp;OV&nbsp;PLENTY - RESUPPLY - BAY&nbsp;2 - DEPART</RawText>
<RawText>{spaceYear}-04-01&nbsp;15:54 -  CTV&nbsp;HORN&nbsp;OV&nbsp;PLENTY - RESUPPLY - BAY&nbsp;2 - DOCK</RawText>
<RawText>{spaceYear}-06-02&nbsp;08:33 -  MCH&nbsp;VASQUEZ&nbsp;XV.... - PICKUP   - BAY&nbsp;1 - DEPART</RawText>
<RawText>{spaceYear}-06-01&nbsp;06:04 -  MCH&nbsp;VASQUEZ&nbsp;XV.... - PICKUP   - BAY&nbsp;1 - DOCK</RawText>
<LineLink>&gt; MORE</LineLink>
<LineLink href={'/ypsilon-14'}>&lt; BACK</LineLink>
