<template>
    <b-container fluid>
        <b-row id="bloc">
            <b-col cols="8" class="map">
                <l-map id="map" :zoom="zoom" :center="center" :bounds="bounds">
                    <l-tile-layer :url="url" :attribution="attribution"/>
                    <l-geo-json v-if="show" :geojson="geojsonDept" :options="options"
                                :options-style="styleDeptFunction"/>
                    <l-geo-json v-if="show" :geojson="geojsonDatas" :options="options"
                                :options-style="doStyleforetsynthesenbsp"/>
                </l-map>
            </b-col>
            <b-col cols="4" class="datas">
                <div v-if="featureProps">
                    <h1>Données</h1>
                    <div v-if="featureProps.nb_data">
                        <h4>{{featureProps.nb_data}} <span v-if="featureProps.nb_data == 1">donnée</span><span v-else>données</span>
                            d'espèce forestière</h4></div>
                    <div v-if="featureProps.nb_sp"><h4>Nombre d'espèces observées</h4>
                        <p>{{featureProps.nb_sp}}</p></div>
                    <div v-if="featureProps.list_chiro"><h4>Chauves-souris</h4>
                        <p>{{featureProps.list_chiro}}</p></div>
                    <div v-if="featureProps.nb_data"><h4>Nombre de données</h4>
                        <p>{{featureProps.nb_data}}</p></div>
                    <div v-if="featureProps.nb_data"><h4>Nombre de données</h4>
                        <p>{{featureProps.nb_data}}</p></div>
                </div>
                <div v-else> cliquez sur la carte</div>
            </b-col>
        </b-row>

    </b-container>
    </div>
</template>

<script>
    // TODO : VOIR https://router.vuejs.org/guide/advanced/data-fetching.html#fetching-after-navigation/**/
    import {LGeoJson, LMap, LTileLayer} from "vue2-leaflet";
    import axios from "axios";
    import Autolinker from "autolinker";


    export default {
        name: "LocalMap",
        components: {
            LMap,
            LTileLayer,
            LGeoJson,
            Autolinker
        },
        data() {
            return {
                loading: false,
                show: true,
                enableTooltip: true,
                dept: null,
                zoom: 6,
                center: [48, -1.219482],
                displayData: false,
                chiro: null,
                nb_data: null,
                nb_sp: null,
                geojsonDatas: null,
                geojsonDept: null,
                featureData: null,
                featureProps: null,
                bounds: null,
                featureUpdates: null,
                fillColor: "blue",
                url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
                attribution:
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }
        },
        methods: {
            getDatas() {
                this.loading = true;
                this.dept = this.$route.params.dept;
                axios
                    .get(
                        "https://data.fauneauvergnerhonealpes.org/getdatas/getData.php?geotable=webgis.departements_aura&geomfield=geom&fields=code_dept,nom_dept&parameters=code_dept+ilike+%27" +
                        this.dept +
                        "%27",
                        {crossdomain: true}
                    )
                    .then(response => {
                        this.geojsonDept = response.data;
                        console.log("DEPT", response.data);
                        this.loading = false;
                        this.bounds = L.geoJSON(this.geojsonDept).getBounds();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                axios
                    .get(
                        "https://data.fauneauvergnerhonealpes.org/getdatas/getData.php?geotable=webgis.draaf_esp_foret&geomfield=geom&fields=nb_data,nb_sp,pres_castor,list_chiro,pres_chatforest,list_amphib,list_rap_ard,list_tetrao,list_pics,list_esp_vieil_foret,list_esp_semi_ouv,list_chouettes,list_prebois&parameters=dept+ilike+%27" +
                        this.dept +
                        "%27",
                        {crossdomain: true}
                    )
                    .then(response => {
                        this.geojsonDatas = response.data;
                        console.log("DATAS", response.data);
                        this.loading = false;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        watch: {
            '$route.params.dept'() {
                this.getDatas()
            }
        },
        computed: {
            options() {
                return {
                    onEachFeature: this.onEachFeatureFunction
                };
            },
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
            styleDataFunction() {
                const fillColor = this.fillColor;
                const self = this;// important! need touch fillColor in computed for re-calculate when change fillColor
                return () => {
                    return {
                        weight: 1,
                        color: "white",
                        opacity: 1,
                        fillColor: fillColor,
                        fillOpacity: 0.1
                    };
                };
            },
            doStyleforetsynthesenbsp() {
                return (feature, layer) => {
                    const weight = 0.5;
                    const linecolor = 'white';
                    const opacity = 0.5;
                    if (feature.properties.nb_sp >= 0.0 &&
                        feature.properties.nb_sp <= 0.0) {

                        return {
                            color: linecolor,
                            weight: weight,
                            opacity: opacity,
                            dashArray: '',
                            lineCap: 'butt',
                            lineJoin: 'miter',
                            fillColor: '#b172ba',

                            fillOpacity: '0.0',
                        }
                    }
                    if (feature.properties.nb_sp >= 0.0 &&
                        feature.properties.nb_sp <= 5.0) {

                        return {
                            color: linecolor,
                            weight: weight,
                            opacity: opacity,
                            dashArray: '',
                            lineCap: 'butt',
                            lineJoin: 'miter',
                            fillColor: '#ffffb2',
                            fillOpacity: '0.701960784314',
                        }
                    }
                    if (feature.properties.nb_sp >= 5.0 &&
                        feature.properties.nb_sp <= 10.0) {

                        return {
                            color: linecolor,
                            weight: weight,
                            opacity: opacity,
                            dashArray: '',
                            lineCap: 'butt',
                            lineJoin: 'miter',
                            fillColor: '#feb751',
                            fillOpacity: '0.749019607843',
                        }
                    }
                    if (feature.properties.nb_sp >= 10.0 &&
                        feature.properties.nb_sp <= 15.0) {

                        return {
                            color: linecolor,
                            weight: weight,
                            opacity: opacity,
                            dashArray: '',
                            lineCap: 'butt',
                            lineJoin: 'miter',
                            fillColor: '#f55629',
                            fillOpacity: '0.8',
                        }
                    }
                    if (feature.properties.nb_sp >= 15.0) {

                        return {
                            color: linecolor,
                            weight: weight,
                            opacity: opacity,
                            dashArray: '',
                            lineCap: 'butt',
                            lineJoin: 'miter',
                            fillColor: '#bd0026',
                            fillOpacity: '0.9',
                        }
                    }
                }
            },

            onEachFeatureFunction() {
                if (!this.enableTooltip) {
                    return () => {
                    };
                }
                return (feature, layer) => {
                    var self = this;
                    layer.on('click', function (e) {
                        self.displayData = true;
                        self.featureProps = feature.properties;
                    });

                }
            }
        },
        created() {
            this.getDatas()
        }// },
        // beforeRouteUpdate (to, from, next) {
        //     this.getDatas()
        //     console.log('beforeRouteUpdate TO', to.params.dept);
        //     next()
        // }
    };
</script>


<style lang="scss">
    #bloc {
        margin: 0;
        padding: 0;
        min-height: inherit;
        height: calc(100vh - 80px);
    }

    #map {
        width: 100%;
        position: absolute !important;
        min-height: inherit;
        height: 100%;
    }

    .datas {
        border-left: 1px solid teal;
        width: 100%;
        padding: 20px;
        min-height: inherit;
        min-width: inherit;
        height: 100%;
        position: relative;
        text-align: left;
    }

    .map {
        width: 100%;
        height: 100%;
        padding: 0;
        min-height: inherit;
        min-width: inherit;
        position: inherited;

    }

</style>
