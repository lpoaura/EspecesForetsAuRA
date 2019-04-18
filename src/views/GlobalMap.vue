<template>
    <l-map id='map' :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-marker :lat-lng="marker">
            <l-popup :content="text"></l-popup>
        </l-marker>
        <l-geo-json :geojson="geojson"/>
        <l-control class="logo_region" :position="bottomleft">
            <img src="@/assets/logo_region_aura.svg">
        </l-control>
    </l-map>
</template>

<script>
    import {LGeoJson, LMap, LMarker, LPopup, LTileLayer, LControl} from 'vue2-leaflet';
    import depts from '@/datas/depts.json'

    export default {
        name: 'VueLeaflet',
        components: {
            LMap,
            LTileLayer,
            LMarker,
            LPopup,
            LGeoJson,
            LControl
        },
        data() {
            return {
                loading: false,
                zoom: 8,
                center: L.latLng(45.5, 5),
                geojson: depts,
                // bounds: L.getBounds(depts),
                url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                marker: L.latLng(47.413220, -1.219482),
                text: 'this is a marker',
            }
        },

    }
</script>

<style lang="scss">
    #map {
        height: calc(100% - 80px);
        width: 100%;
        position: absolute !important;
    }
    .logo_region {
        background: #fff;
        height: 100px;
        padding: 0 0.5em;
        border: 1px solid #aaa;
        border-radius: 0.1em;
    }

    img {
        height: 80px;
    }

</style>
