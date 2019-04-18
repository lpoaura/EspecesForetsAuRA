<template>
    <l-map id='map' :zoom="zoom" :center="center" :bounds="bounds">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-geo-json :geojson="geojsonDept" :options="options"/>
        <l-control class="logo_region">
            <img src="@/assets/logo_region_aura.svg">
        </l-control>
    </l-map>
</template>

<script>
    import {LControl, LGeoJson, LMap, LMarker, LPopup, LTileLayer} from 'vue2-leaflet';
    import axios from 'axios';

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
                geojsonDept: null,
                bounds: null,
                url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                marker: L.latLng(47.413220, -1.219482),
                text: 'this is a marker',
            }
        },
        methods: {
            getDatas() {
                this.loading = true;
                axios
                    .get(
                        "https://data.fauneauvergnerhonealpes.org/getdatas/getData.php?geotable=webgis.departements_aura&geomfield=geom&fields=code_dept,nom_dept",
                        {crossdomain: true}
                    )
                    .then(response => {
                        this.geojsonDept = response.data;
                        console.log("DEPT", response.data);
                        this.bounds = L.geoJSON(this.geojsonDept).getBounds();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }

        },
        computed: {
            options() {
                return {
                    onEachFeature: this.onEachFeatureFunction
                };
            }
            ,
            styleDeptFunction() {
                const fillColor = this.fillColor; // important! need touch fillColor in computed for re-calculate when change fillColor
                return () => {
                    return {
                        weight: 2,
                        color: "cadetblue",
                        opacity: 1,
                        fillColor: fillColor,
                        fillOpacity: 0
                    };
                };
            },
            onEachFeatureFunction() {
                return (feature, layer) => {
                    layer.bindTooltip(feature.properties.nom_dept + ' (' + feature.properties.code_dept + ')', {
                        permanent: false,
                        sticky: true
                    });
                    var self = this;
                    layer.on('click', function (e) {
                        self.$router.push({name: 'LocalMap', params: {dept: feature.properties.code_dept}});
                        console.log('DEPT', feature.properties.code_dept)
                    });

                }
            }
        }
        ,
        created() {
            this.getDatas()
        }
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
