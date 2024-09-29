<svg height="0">
    <filter id="SphereMapTest" filterUnits="objectBoundingBox" x="-0.45" y="-1.29" width="1.6" height="3.5">
        <feImage id="mapa" result="Map" xlink:href="img/sphere_wide_1.png" />
        <feDisplacementMap id="despMap" in="SourceGraphic" in2="map" scale="100" xChannelSelector="R" yChannelSelector="G" />
    </filter>
</svg>