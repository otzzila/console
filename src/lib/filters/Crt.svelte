<script lang="ts">
    import {gsap} from "gsap";
	import type { Snippet } from "svelte";

    interface CrtProps {
        children?: Snippet
    }
    let { children }: CrtProps = $props();
    

    /* animate the offset rectangles down the screen */
    let leftOffsetRect: SVGRectElement;
    let rightOffsetRect: SVGRectElement;


    // TODO the y bound may need to be larger?
    $effect(() => {
        if (leftOffsetRect){
            gsap.to(leftOffsetRect, {
                attr: {
                    y: "800"
                },
                duration: 5,
                repeat: -1,
                ease: "none"
            })
        }

        if (rightOffsetRect){
            gsap.to(rightOffsetRect, {
                attr: {
                    y: "800"
                },
                duration: 5,
                repeat: -1,
                ease: "none",
                delay: 2.5
            })
        }
    })
    
    

    
</script>
<!-- https://codepen.io/alisasila/pen/qBRNJbj by Alisa Kin-->
<div class="crt bg-black h-full w-full pointer-events-none">
    <svg width="100%" height="100%">
        <defs>
            <!-- create a pattern with some phosphor dots for our base tile (I used Illustrator for this) -->
            <pattern id="phosphor-dot-fill" width="11.875" height="4.25" patternUnits="userSpaceOnUse">
            <g id="phosphor-dots" transform="scale(0.25)">
                <rect class="red" x="0.95" y="1.5" width="8.63" height="20" rx="4.31"/>
                <rect class="green" x="10.8" y="1.5" width="8.63" height="20" rx="4.31"/>
                <rect class="blue" x="20.29" y="1.5" width="8.63" height="20" rx="4.31"/>
                <path class="red" d="M31,5.89A4.24,4.24,0,0,0,35.33,10h0a4.23,4.23,0,0,0,4.31-4.11V0H31Z"/>
                <path class="green" d="M40.87,5.89a4.31,4.31,0,0,0,8.62,0V0H40.87Z"/>
                <path class="blue" d="M50.36,0V5.89A4.23,4.23,0,0,0,54.67,10h0A4.24,4.24,0,0,0,59,5.89V0Z"/>
                <path class="red" d="M35.33,13h0A4.24,4.24,0,0,0,31,17.11V23h8.63V17.11A4.23,4.23,0,0,0,35.33,13Z"/>
                <path class="green" d="M45.18,13a4.23,4.23,0,0,0-4.31,4.11V23h8.62V17.11A4.23,4.23,0,0,0,45.18,13Z"/>
                <path class="blue" d="M59,17.11A4.24,4.24,0,0,0,54.67,13h0a4.23,4.23,0,0,0-4.31,4.11V23H59Z"/>
            </g>
            </pattern>
            
            <!-- fill a rectangle the size of the whole element with the phosphor dot pattern -->
            <rect x="0" y="0" id="phosphor-filled-rect" width="100%" height="100%" fill="url(#phosphor-dot-fill)"/>

            <!-- create base rectangles for glitch animation -->
            <rect id="left-offset-rect" x="0" y="-100" width="100%" height="50%"/>
            <rect id="right-offset-rect" x="0" y="-100" width="100%" height="50%"/>
            
            <filter id="crt-filter">

                <!-- get reference to the phosphor dot screen we created above -->
                <feImage xlink:href="#phosphor-filled-rect" result="GRID_PATTERN" />
                
                <!-- get references to the rectangles we created above -->
                <feImage xlink:href="#left-offset-rect" result="LEFT_RECT_SHAPE"/>
                <feImage xlink:href="#right-offset-rect" result="RIGHT_RECT_SHAPE"/>
                
                <!-- clip the source graphic to each rectangle -->
                <feComposite in="SourceGraphic" in2="LEFT_RECT_SHAPE" operator="in" result="LEFT_RECT_IMAGE"/>
                <feComposite in="SourceGraphic" in2="RIGHT_RECT_SHAPE" operator="in" result="RIGHT_RECT_IMAGE"/>
                
                <!-- offset each rectangle to right/left -->
                <feOffset in="LEFT_RECT_IMAGE" dx="-6" dy="0" result="LEFT_OFFSET_RECT"/>
                <feOffset in="RIGHT_RECT_IMAGE" dx="6" dy="0" result="RIGHT_OFFSET_RECT"/>
                
                <!-- merge the source graphic and the offset rectangles together -->
                <feMerge result="MERGED_SOURCE">
                    <feMergeNode in="SourceGraphic"/>
                    <feMergeNode in="LEFT_OFFSET_RECT" />
                    <feMergeNode in="RIGHT_OFFSET_RECT" />
                </feMerge>

            
                
                <!-- blur the graphic a little to give a more realistic look -->
                <feGaussianBlur in="MERGED_SOURCE" stdDeviation="1" result="BLURRED_SOURCE"/>
                
                <!-- isolate each rgb color in the phosphor dots grid -->
                <feColorMatrix
                    in="GRID_PATTERN"
            type="matrix"
            values="1 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    1 0 0 0 0" result="RED"/>
                
                <feColorMatrix
                    in="GRID_PATTERN"
            type="matrix"
            values="0 0 0 0 0
                    0 1 0 0 0
                    0 0 0 0 0
                    0 1 0 0 0" result="GREEN"/>
                
                <feColorMatrix
                    in="GRID_PATTERN"
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 1 0 0
                    0 0 1 0 0" result="BLUE"/>
                
                <!-- clip the blurred source graphic to the channels we just isolated -->
                <feComposite in="BLURRED_SOURCE" in2="RED" operator="atop" result="COMPOSITED_RED"/>
                <feComposite in="BLURRED_SOURCE" in2="GREEN" operator="atop" result="COMPOSITED_GREEN"/>
                <feComposite in="BLURRED_SOURCE" in2="BLUE" operator="atop" result="COMPOSITED_BLUE"/>
                
                <!-- bring out only the corresponding channel from our clipped source graphic -->
                <feColorMatrix
                    in="COMPOSITED_RED"
            type="matrix"
            values="1 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    1 0 0 0 0" result="RED_FINAL"/>
                
                <feColorMatrix
                    in="COMPOSITED_GREEN"
            type="matrix"
            values="0 0 0 0 0
                    0 1 0 0 0
                    0 0 0 0 0
                    0 1 0 0 0" result="FINAL_GREEN"/>
                
                <feColorMatrix
                    in="COMPOSITED_BLUE"
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 1 0 0
                    0 0 1 0 0" result="FINAL_BLUE"/>
                
                <!-- merge all the channels back together -->
                <feMerge result="MERGED_TV">
                    <feMergeNode in="RED_FINAL"/>
                    <feMergeNode in="FINAL_GREEN"/>
                    <feMergeNode in="FINAL_BLUE"/>
                </feMerge>
                
                <!-- blur for a more realistic look -->
                <feGaussianBlur stdDeviation="1.3" result="BLUR"/>
                
                <!-- brighten all the pixels a bit -->
                <feColorMatrix
            type="matrix"
            values="2 0 0 0 0
                    0 2 0 0 0
                    0 0 2 0 0
                    0 0 0 2 0"
                    result="FINAL_CRT"/>
            </filter>
        </defs>
    </svg>
    
    <!-- now, all that you need to do to use the filter is add "filter: url(#crt-filter)" to your desired html/svg element!-->
    
    <!-- here I added it to the .tv class in my css-->
    <div class="tv">
        <!-- two colored (red & blue) stripes that animate down the screen for a more realistic CRT look -->
        <div class="stripe red-stripe"></div>
        <div class="stripe blue-stripe"></div>
        
        <div id="tv-content" class="pointer-events-auto w-full h-full">
            {#if children}
                {@render children()}
            {:else}
                <div class="w-full h-fullflex flex-col justify-center content-center items-center">
                    <!-- Example 1. 404 error page -->
                    <h1 class="error-title">404</h1>
                    <h4 class="error-scnd-title">PAGE NOT FOUND</h4>
                    <div class="rainbow-rect"></div>
                </div>
            {/if}
        </div>   
        
        
        
        
        <!-- Example 2. House Commercial -->
    <!-- 	<img class="background-house" src="https://landscapespecialistmalaysia.com/wp-content/uploads/2017/08/Outdoor_Establishments_landscape_design_mosman_classic_courtyard-5-e1504184337865.jpg" alt="the new house on the market"></img>
        <h1 contenteditable class="commercial-heading">New House on the Market!</h1>
        <img class="guy-img" src="https://previews.123rf.com/images/imagerymajestic/imagerymajestic0811/imagerymajestic081100638/3825934-cool-guy-showing-hand-gesture-against-white-background.jpg" alt="cool guy"/>
        <div class="price">
            <span>Only for <span>50,000$</span>!</span>
        </div>
        <button class="button">Buy Now!</button> -->
    </div>
</div>


<!-- <div class="credit">Inspired by <a href="https://www.youtube.com/watch?v=UtjozTVSsLA" target="_blank">Ben Marriott's CRT Screen video</a></div> -->

<style>


    .red {
        fill: rgb(255, 0, 0);
    }

    .green {
        fill: rgb(0, 255, 0);
    }

    .blue {
        fill: rgb(0, 0, 255);
    }


    .tv {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: absolute;
        top: 0;
        background: linear-gradient(to bottom, hsl(255, 0%, 20%), hsl(255, 0%, 50%));

        
        filter: url(#crt-filter); /* *** This is where I added the filter *** */
    }

    /* stripes */
    .stripe {
        width: 100%;
        height: 20vmin;
        filter: blur(40px);
        opacity: 0.1;
        position: absolute;
        top: -100%;
        animation: stripeAnim 10s linear infinite;
    }
    .red-stripe {
        background-color: rgb(255, 0, 0);
        animation-delay: 5s;
    }

    .blue-stripe {
        background-color: rgb(0, 0, 255);
    }

    @keyframes stripeAnim {   
        50% {
            top: 110%;
        }
        100% {
            top: 110%;
        }
    }


    /* Example 1. 404 Page */
    .error-title {
        color: white;
        font-size: calc(10px + 15vmin);
        margin: 0em;
    }

    .error-scnd-title {
        color: white;
        font-size: calc(10px + 8vmin);
        font-weight: 400;
        margin: 0 0 0.3em 0;
    }

    .rainbow-rect {
        width: 80%;
        height: 10%;
        background: linear-gradient(270deg, #ff0000, #ff00ad, #000cff, #00fffa, #1fff00, #fffe00, #ff6c00, #ff0000, #ff00ad, #000cff, #00fffa);
        background-size: 350% 350%;
        animation: rainbowGradientAnim 8s linear infinite;
    }

    @keyframes rainbowGradientAnim {
    0% {
                background-position: 0% 50%;
        }
    100% {
                background-position: 98% 50%;
        }
    }
</style>