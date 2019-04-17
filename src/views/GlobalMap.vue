<template>
        <l-map id='map' :zoom="zoom" :center="center">
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            <l-marker :lat-lng="marker">
                <l-popup :content="text"></l-popup>
            </l-marker>
            <l-geo-json :geojson="geojson"/>
        </l-map>
</template>

<script>
    import {LGeoJson, LMap, LMarker, LPopup, LTileLayer} from 'vue2-leaflet';
    import axios from 'axios';

    export default {
        name: 'VueLeaflet',
        components: {
            LMap,
            LTileLayer,
            LMarker,
            LPopup,
            LGeoJson
        },
        data() {
            return {
                loading: false,
                zoom: 13,
                center: L.latLng(47.413220, -1.219482),
                geojson: null,
                url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                marker: L.latLng(47.413220, -1.219482),
                text: 'this is a marker'
            }
        },
        created() {
            this.loading = true;
            axios.get('http://localhost/~fcloitre/depts.json').then(response => {
                this.geojson = response.data;
                this.loading = false;
            });
        }
    }
</script>

<style lang="scss">
    #map {
        height: calc(100% - 80px);
        width: 100%;
        position: absolute !important;
    }
</style>
