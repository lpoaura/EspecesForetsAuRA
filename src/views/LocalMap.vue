<template>
    <b-container fluid class="paddingless">
        <b-row id="bloc">
            <div v-if="loading" class="loader"></div>
            <b-col cols="8" class="map">
                <l-map id="map" :zoom="zoom" :center="center" :bounds="bounds">
                    <l-tile-layer :url="url" :attribution="attribution"/>
                    <l-control-layers
                            :collapse="false"
                    />
                    <l-geo-json v-if="show" :geojson="geojsonDept" :options="options"
                                :options-style="styleDeptFunction"/>
                    <l-geo-json v-if="show" :geojson="geojsonDatas" :options="options"
                                :options-style="styleForetSyntheseNbsp"/>
                    <l-wms-tile-layer
                            v-for="layer in layers"
                            :key="layer.name"
                            :base-url="baseWmsUrl"
                            :layers="layer.layers"
                            :visible="layer.visible"
                            :transparent="layer.transparent"
                            :opacity="layer.opacity"
                            :name="layer.name"
                            layer-type="overlay"/>
                </l-map>

            </b-col>
            <b-col cols="4" class="datas">
                <div v-if="featureProps">
                    <h1>Données</h1>
                    <span>Entre parenthèse les espèces non observées mais dont la présence reste possible au regard de contexte du territoire</span>
                    <div v-if="featureProps.nb_data">
                        <h4>{{featureProps.nb_data}} <span v-if="featureProps.nb_data == 1">donnée</span><span v-else>données</span>
                            d'espèce forestière</h4></div>
                    <div v-if="featureProps.nb_sp">
                        <h4>{{featureProps.nb_sp}} <span v-if="featureProps.nb_sp == 1">espèce forestière à enjeu observée</span><span
                                v-else>espèces forestières à enjeux observées</span></h4></div>
                    <div v-if="featureProps.list_chiro"><h4>Chauves-souris <b-badge pill :to="{ path: '/assets/docs/Preconisations_de_gestion_chat_forestier.pdf'}" target="_blank" variant="info">Fiche</b-badge></h4>
                        <p>{{featureProps.list_chiro}}</p></div>
                    <div v-if="featureProps.pres_chatforest"><h4>Chat forestier <b-badge pill :to="{ path: '/assets/docs/Preconisations_de_gestion_chat_forestier.pdf'}" target="_blank" variant="info">Fiche</b-badge></h4>
                        <p>{{featureProps.pres_chatforest}}</p></div>
                    <div v-if="featureProps.pres_castor"><h4>Castor d'Europe <b-badge pill :to="{ path: '/assets/docs/Preconisations_de_gestion_chat_forestier.pdf'}" target="_blank"  variant="info">Fiche</b-badge></h4>
                        <p>{{featureProps.pres_castor}}</p></div>
                    <div v-if="featureProps.list_amphib"><h4>Amphibiens <b-badge pill href="#" variant="info">Fiche</b-badge></h4>
                        <p>{{featureProps.list_amphib}}</p></div>
                    <div v-if="featureProps.list_rap_ard"><h4>Rapaces & Ardéidés <b-badge pill href="#" variant="info">Fiche</b-badge></h4>
                        <p>{{featureProps.list_rap_ard}}</p></div>
                    <div v-if="featureProps.list_tetrao"><h4>Tétraonidés <b-badge pill href="#" variant="info">Fiche</b-badge></h4>
                        <p>{{featureProps.list_tetrao}}</p></div>
                    <div v-if="featureProps.list_pics"><h4>Pics <b-badge pill href="#" variant="info">Fiche</b-badge></h4>
                        <p>{{featureProps.list_pics}}</p></div>
                    <div v-if="featureProps.list_chouettes"><h4>Chouettes <b-badge pill href="#" variant="info">Fiche</b-badge></h4>
                        <p>{{featureProps.list_chouettes}}</p></div>
                    <div v-if="featureProps.list_esp_vieil_foret"><h4>Espèces de vieilles forêts <b-badge pill href="#" variant="info">Fiche</b-badge></h4>
                        <p>{{featureProps.list_esp_vieil_foret}}</p></div>
                    <div v-if="featureProps.list_esp_semi_ouv"><h4>Espèces de milieux semi-ouverts <b-badge pill href="#" variant="info">Fiche</b-badge></h4>
                        <p>{{featureProps.list_esp_semi_ouv}}</p></div>
                    <div v-if="featureProps.list_prebois"><h4>Espèces de prébois <b-badge pill href="#" variant="info">Fiche</b-badge></h4>
                        <p>{{featureProps.list_prebois}}</p></div>
                </div>
                <div v-else>
                    <h1>Cliquez sur la carte</h1>
                </div>


            </b-col>
        </b-row>
    </b-container>
    </div>
</template>

<script>
    // TODO : VOIR https://router.vuejs.org/guide/advanced/data-fetching.html#fetching-after-navigation/**/
    import {LControlLayers, LGeoJson, LMap, LTileLayer, LWMSTileLayer} from "vue2-leaflet";
    import axios from "axios";


    export default {
        name: "LocalMap",
        components: {
            LMap,
            LTileLayer,
            LGeoJson,
            'l-wms-tile-layer': LWMSTileLayer,
            LControlLayers
        },
        data() {
            return {
                loading: false,
                baseUrl: process.env.BASE_URL,
                show: true,
                enableTooltip: true,
                baseWmsUrl: 'http://wxs.ign.fr/corinelandcover/geoportail/r/wms?service=WMS&request=GetCapabilities',
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
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                tileProviders: [
                    {
                        name: 'OpenStreetMap',
                        visible: true,
                        attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    },
                    {
                        name: 'OpenTopoMap',
                        visible: false,
                        url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
                        attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
                    }
                ],
                layers: [
                    {
                        name: 'Occupation du sol',
                        visible: false,
                        layers: 'LANDCOVER.CLC12_FR',
                        format: 'image/png',
                        transparent: true,
                        attribution: '<a href="http://www.statistiques.developpement-durable.gouv.fr">SOeS CLC12</a>',
                        opacity: 0.5,
                    }
                ]
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
            styleForetSyntheseNbsp() {
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

    .loader {
        border: 5px solid white; /* Light grey */
        border-top: 5px solid #3498db; /* Blue */
        border-radius: 50%;
        position: absolute !important;
        left: 50%;
        top: 50%;
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;
        z-index: 999;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .paddingless {
        padding: 0;
    }
</style>
