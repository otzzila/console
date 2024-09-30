<script lang="ts">
	import LineLink from "$lib/content/LineLink.svelte";
	import RawText from "$lib/content/RawText.svelte";

    type PageIndex = 'index' | 'diagnostics' | 'schedule' | 'controls' | 'roster' | 'comms' | 'layout' | 'status' | 'airlock' | 'showers' | 'system';
    
    let currentPage: PageIndex = 'index'
    currentPage = 'schedule'

    const pcShip: string = "IMV GRASSHOPPER"
    const pcShipExtended = pcShip.padEnd(18, ' ')

    const spaceYear = "2666"

    const setPage = (newPage: PageIndex) => {
        return (() => currentPage = newPage)
    }


</script>

{#snippet backLink()}
    <LineLink onclick={setPage('index')}>&lt; BACK</LineLink>
{/snippet}

{#if currentPage == 'index'}
    <RawText>YPSILON 14 CONTROL TERMINAL</RawText>
    <LineLink onclick={setPage('diagnostics')}>&gt; DIAGNOSTICS</LineLink>
    <LineLink onclick={setPage('schedule')}>&gt; SCHEDULE</LineLink>
    <LineLink onclick={setPage('controls')}>&gt; CONTROLS</LineLink>
    <LineLink onclick={setPage('roster')}>&gt; ROSTER</LineLink>
    <LineLink onclick={setPage('comms')}>&gt; COMMS</LineLink>
{:else if currentPage == 'diagnostics'}
    <RawText>DIAGNOSTICS</RawText>
    <LineLink onclick={setPage('layout')}>&gt; LAYOUT</LineLink>
    <LineLink onclick={setPage('status')}>&gt; STATUS</LineLink>
    {@render backLink()}
{:else if currentPage == 'status'}
    <RawText>STATUS</RawText>
    <RawText>SYSTEMS CHECK ...</RawText>
    <RawText fgColor="warn">WARNING: AIR FILTERS LAST REPLACED 455 DAYS AGO</RawText>
    <RawText fgColor="warn">(255 DAYS PAST RECOMMENDATION)</RawText>
    <RawText fgColor="warn">WARNING: SHOWER 5 OUT OF ORDER AS OF 1 DAY AGO</RawText>
    <RawText fgColor="warn">WARNING: MINESHAFT ELEVATOR LAST MAINTAINED 455 DAYS AGO</RawText>
    <RawText fgColor="warn">(255 DAYS PAST RECOMMENDATION)</RawText>
    <RawText fgColor="warn">WARNING: AIRFLOW 82%</RawText>
    <RawText fgColor="warn">(SUBOPTIMAL: REPLACE FILTERS AND CHECK VENTS FOR BLOCKAGES)</RawText>
    <RawText>ALL SYSTEMS WITHIN ACCEPTABLE OPERATING CONDITIONS</RawText>
    {@render backLink()}
{:else if currentPage == 'schedule'}
    <RawText>SCHEDULE</RawText>
    <RawText>{spaceYear}-07-02 06:33 - {pcShipExtended} - RESUPPLY - DOCKING BAY 2 - DOCK</RawText>
    <RawText>{spaceYear}-06-04 08:34 - RSV THE HERACLES   - RESEARCH - DOCKING BAY 1 - DOCK</RawText>
    <RawText>{spaceYear}-06-02 12:23 - CTV HORN OV PLENTY - RESUPPLY - DOCKING BAY 2 - DEPART</RawText>
    <RawText>{spaceYear}-06-01 16:04 - CTV HORN OV PLENTY - RESUPPLY - DOCKING BAY 2 - DOCK</RawText>
    <RawText>{spaceYear}-05-02 08:32 - MV VASQUEZ XV      - PICKUP   - DOCKING BAY 1 - DEPART</RawText>
    <RawText>{spaceYear}-05-01 06:02 - MV VASQUEZ XV      - PICKUP   - DOCKING BAY 1 - DOCK</RawText>
    <RawText>{spaceYear}-04-02 13:02 - CTV HORN OV PLENTY - RESUPPLY - DOCKING BAY 2 - DEPART</RawText>
    <RawText>{spaceYear}-04-01 15:54 - CTV HORN OV PLENTY - RESUPPLY - DOCKING BAY 2 - DOCK</RawText>
    <RawText>{spaceYear}-06-02 08:33 - MV VAZQUEZ XV      - PICKUP   - DOCKING BAY 1 - DEPART</RawText>
    <RawText>{spaceYear}-06-01 06:04 - MV VAZQUEZ XV      - PICKUP   - DOCKING BAY 1 - DOCK</RawText>
    <LineLink>&gt; MORE</LineLink>
    {@render backLink()}
{:else if currentPage == 'roster'}
    <RawText>ROSTER</RawText>
    <RawText>01. VERHOEVEN, SONYA     - OVERSEER</RawText>
    <RawText>02. SINGH, ASHRAF        - BREAKER</RawText>
    <RawText>03. DE BEERS, DANA       - HEAD DRILLER</RawText>
    <RawText>04. HUIZINGA, JEROME     - ASST. DRILLER</RawText>
    <RawText>05. TOBIN, ROSA          - MINING ENGINEER</RawText>
    <RawText>06. MIKKELSEN, MICHAEL   - MINING ENGINEER</RawText>
    <RawText>07. KANTARO, KENJI       - LOADER</RawText>
    <RawText>08. OBOWE, MORGAN        - LOADER</RawText>
    <RawText>09. KENBISHI, RIE        - PUTTER</RawText>
    <RawText>10. VACANT</RawText>
    {@render backLink()}
{:else if currentPage == 'controls'}
    <RawText>CONTROLS</RawText>
    <LineLink onclick={setPage('airlock')}>&gt; AIRLOCK</LineLink>
    <LineLink onclick={setPage('showers')}>&gt; SHOWERS</LineLink>
    <LineLink onclick={setPage('system')}>&gt; SYSTEM [A]</LineLink>
    {@render backLink()}
{:else}
    <RawText>How did you get here?</RawText>
    {@render backLink()}
{/if}

