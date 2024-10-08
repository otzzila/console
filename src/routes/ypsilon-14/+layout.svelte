<script lang="ts">
	import Crt from '$lib/filters/Crt.svelte';

    // import "../app.css"

    let {children} = $props();

    const left = 37
    const up = 38
    const right = 39
    const down = 40


    function onKeyUp(e: KeyboardEvent) {
        const key = e.key
        if (key != 'ArrowUp' && key != 'ArrowDown'){
            return
        }
        e.preventDefault()
        e.stopPropagation()

        const allLinks = document.getElementsByClassName('line-link')

        if (allLinks.length == 0){
            return
        }

        let activeElement = document.activeElement

        let currentlySelectedIndex: number | null = null

        for (let idx = 0; idx < allLinks.length; idx++){
            const current = allLinks.item(idx)
            if (current == activeElement) {
                currentlySelectedIndex = idx
                break
            }
        }


        let newActive: null | HTMLElement = null
        if (currentlySelectedIndex == null) {
            // Pick top or bottom if nothing is currently selected
            if (key == 'ArrowDown'){
                newActive = allLinks.item(0) as HTMLElement
            } else if (key == 'ArrowUp') {
                newActive = allLinks.item(allLinks.length - 1)  as HTMLElement
            }
        } else {
            let newIndex = currentlySelectedIndex

            if (key == 'ArrowDown'){
                newIndex += 1
                if (newIndex == allLinks.length){
                    newIndex = 0
                }
            } else if (key == 'ArrowUp'){
                newIndex -= 1
                if (newIndex == -1) {
                    newIndex = allLinks.length - 1
                }
            }

            newActive = allLinks.item(newIndex) as HTMLElement
        }

        if (newActive != null){
            newActive.focus()
        }
    }
</script>

<Crt>
    <div class="m-4 max-h-full">
        {@render children()}
    </div>
</Crt>

<svelte:window on:keyup={onKeyUp} />