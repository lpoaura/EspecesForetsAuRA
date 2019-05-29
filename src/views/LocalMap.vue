<template xmlns="http://www.w3.org/1999/html">
    <b-container fluid class="paddingless">

        <b-row id="bloc">
            <b-col class="map">
                <div class="alert-fixed">
                    <b-alert v-if="displayDataCol === false" show variant="primary">Cliquez sur la carte
                        pour accéder
                        aux informations
                    </b-alert>
                    <b-alert
                            variant="danger"
                            dismissible
                            fade
                            :show="showWarning"
                            @dismissed="showWarning=false"
                    >
                        <p>Cette carte est une représentation actuelle du niveau de connaissance des espèces dans
                            les forêts d’Auvergne-Rhône-Alpes. L’absence d’espèce sur certaines mailles peut être
                            due à un défaut de prospection et non à une vraie absence. Il faut donc rester prudent
                            quant à l’interprétation de cette carte.</p>
                    </b-alert>
                </div>
                <!--                <div v-if="loading" class="loader"></div>-->
                <spin-loader v-if="loading"></spin-loader>
                <l-map ref="deptMap" id="map" :options="{gestureHandling: true}" :zoom="zoom" :center="center"
                       :bounds="bounds" :maxBounds="bounds">
                    <l-tile-layer
                            :url="tileLayer.url"
                            :attribution="tileLayer.attribution"
                            :opacity="tileLayer.opacity"
                    />
                    <l-control-layers :collapsed="true"/>
                    <l-control :collapsed="true" class="legend" :position="legendPosition">
                        <div v-if="legend">
                            <h6>Nb d'espèces à enjeux
                                <b-badge pill variant="primary" v-on:click="displayLegend(false)" class="float-right">
                                    x
                                </b-badge>
                            </h6>
                            <div v-for="item in legendItems">
                                <canvas width="10" height="10" v-bind:style="{backgroundColor: item.color}"></canvas>
                                {{ item.label }}
                                <br>
                            </div>
                        </div>
                        <h6 v-else>
                            <span v-on:click="displayLegend(true)">Afficher la Légende</span>
                        </h6>
                    </l-control>
                    <l-geo-json
                            v-if="showDept"
                            :geojson="geojsonDept"
                            :optionsStyle="styleDept"
                    />
                    <l-geo-json
                            v-if="showDatas"
                            :geojson="geojsonDatas"
                            :options="options"
                            :optionsStyle="styleDataNbsp"
                    />
                    <l-wms-tile-layer
                            v-for="layer in layers"
                            :key="layer.name"
                            :base-url="baseWmsUrl"
                            :layers="layer.layers"
                            :visible="layer.visible"
                            :transparent="layer.transparent"
                            :opacity="layer.opacity"
                            :name="layer.name"
                            layer-type="overlay"
                    />
                </l-map>
            </b-col>
            <b-col v-if="displayDataCol" col lg="4" md="6" sm="11" class="datas">

                <div v-if="featureProps">
                    <h1>Données
                        <b-button pill @click="closeDatas" class="float-right" variant="outline-danger">&times;
                        </b-button>
                    </h1>
                    <b-alert variant="info" show><b>Entre parenthèse</b> les espèces non observées mais dont la présence
                        reste possible au regard de contexte du territoire
                    </b-alert>
                    <div class="nbdata">
                        <div v-if="featureProps.nb_sp_total">
                            <h4>
                                {{featureProps.nb_sp_total}}
                                <span
                                        v-if="featureProps.nb_sp_total == 1"
                                >espèce forestière à enjeu</span>
                                <span v-else>espèces forestières à enjeux</span>
                            </h4>
                        </div>
                        <div v-else><h4>Aucune espèce forestière à enjeu</h4></div>
                    </div>
                    <div v-if="featureProps.list_chiro">
                        <h4>
                            Chauves-souris
                            <b-badge
                                    pill
                                    :to="{ path: '/assets/docs/Preconisations_de_gestion_chiropteres.pdf'}"
                                    target="_blank"
                                    variant="info"
                            >Fiche
                            </b-badge>
                        </h4>
                        <p>{{featureProps.list_chiro}}</p>
                    </div>
                    <div v-if="featureProps.pres_chatforest">
                        <h4>
                            Chat forestier
                            <b-badge
                                    pill
                                    :to="{ path: '/assets/docs/Preconisations_de_gestion_chat_forestier.pdf'}"
                                    target="_blank"
                                    variant="info"
                            >Fiche
                            </b-badge>
                        </h4>
                        <p>{{featureProps.pres_chatforest}}</p>
                    </div>
                    <div v-if="featureProps.pres_castor">
                        <h4>
                            Castor d'Europe
                            <b-badge
                                    pill
                                    :to="{ path: '/assets/docs/Preconisations_de_gestion_castor.pdf'}"
                                    target="_blank"
                                    variant="info"
                            >Fiche
                            </b-badge>
                        </h4>
                        <p>{{featureProps.pres_castor}}</p>
                    </div>
                    <div v-if="featureProps.list_amphib">
                        <h4>
                            Amphibiens
                            <b-badge
                                    pill
                                    :to="{ path: '/assets/docs/Preconisations_de_gestion_amphibiens.pdf'}"
                                    target="_blank"
                                    variant="info"
                            >Fiche
                            </b-badge>
                        </h4>
                        <p>{{featureProps.list_amphib}}</p>
                    </div>
                    <div v-if="featureProps.list_rap_ard">
                        <h4>
                            Rapaces & Ardéidés
                            <b-badge
                                    pill
                                    :to="{ path: '/assets/docs/Preconisations_de_gestion_rapaces_ardeides.pdf'}"
                                    target="_blank"
                                    variant="info"
                            >Fiche
                            </b-badge>
                        </h4>
                        <p>{{featureProps.list_rap_ard}}</p>
                    </div>
                    <div v-if="featureProps.list_tetrao">
                        <h4>
                            Tétraonidés
                            <b-badge
                                    pill
                                    :to="{ path: '/assets/docs/Preconisations_de_gestion_tetraonides.pdf'}"
                                    target="_blank"
                                    variant="info"
                            >Fiche
                            </b-badge>
                        </h4>
                        <p>{{featureProps.list_tetrao}}</p>
                    </div>
                    <div v-if="featureProps.list_pics">
                        <h4>
                            Pics
                            <b-badge
                                    pill
                                    :to="{ path: '/assets/docs/Preconisations_de_gestion_pics.pdf'}"
                                    target="_blank"
                                    variant="info"
                            >Fiche
                            </b-badge>
                        </h4>
                        <p>{{featureProps.list_pics}}</p>
                    </div>
                    <div v-if="featureProps.list_chouettes">
                        <h4>
                            Chouettes
                            <b-badge
                                    pill
                                    :to="{ path: '/assets/docs/Preconisations_de_gestion_chouettes.pdf'}"
                                    target="_blank"
                                    variant="info"
                            >Fiche
                            </b-badge>
                        </h4>
                        <p>{{featureProps.list_chouettes}}</p>
                    </div>
                    <div v-if="featureProps.list_esp_vieil_foret">
                        <h4>
                            Espèces de vieilles forêts
                            <b-badge
                                    pill
                                    :to="{ path: '/assets/docs/Preconisations_de_gestion_vieilles_foret.pdf'}"
                                    target="_blank"
                                    variant="info"
                            >Fiche
                            </b-badge>
                        </h4>
                        <p>{{featureProps.list_esp_vieil_foret}}</p>
                    </div>
                    <div v-if="featureProps.list_esp_semi_ouv">
                        <h4>
                            Espèces de milieux semi-ouverts
                            <b-badge
                                    pill
                                    :to="{ path: '/assets/docs/Preconisations_de_gestion_semi_ouverts.pdf'}"
                                    target="_blank"
                                    variant="info"
                            >Fiche
                            </b-badge>
                        </h4>
                        <p>{{featureProps.list_esp_semi_ouv}}</p>
                    </div>
                    <div v-if="featureProps.list_prebois">
                        <h4>
                            Espèces de prébois
                            <b-badge
                                    pill
                                    :to="{ path: '/assets/docs/Preconisations_de_gestion_prebois.pdf'}"
                                    target="_blank"
                                    variant="info"
                            >Fiche
                            </b-badge>
                        </h4>
                        <p>{{featureProps.list_prebois}}</p>
                    </div>
                </div>
                <div v-else>
                    <h1>Cliquez sur la carte</h1>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    // TODO : VOIR https://router.vuejs.org/guide/advanced/data-fetching.html#fetching-after-navigation/**/
    import {LControl, LControlLayers, LGeoJson, LMap, LTileLayer, LWMSTileLayer} from "vue2-leaflet";
    // import {GestureHandling} from 'leaflet-gesture-handling';
    import SpinLoader from '../components/SpinLoader';
    import axios from "axios";

    import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";

    export default {
        name: "LocalMap",
        components: {
            SpinLoader,
            LMap,
            LTileLayer,
            LGeoJson,
            LControl,
            "l-wms-tile-layer": LWMSTileLayer,
            LControlLayers
        },
        data() {
            return {
                loading: false,
                baseUrl: process.env.BASE_URL,
                showDept: false,
                showDatas: false,
                showWarning: true,
                enableTooltip: true,
                baseWmsUrl:
                    "http://wxs.ign.fr/corinelandcover/geoportail/r/wms?service=WMS&request=GetCapabilities",
                dept: null,
                zoom: 6,
                center: [45.51, 4.53],
                legend: true,
                displayDataCol: false,
                displayData: false,
                geojsonDatas: null,
                geojsonDept: null,
                nomDept: "Département",
                featureData: null,
                featureProps: null,
                bounds: null,
                featureUpdates: null,
                fillColor: "blue",
                tileLayer: {
                    url: "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
                    attribution:
                        '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    opacity: 0.5
                },
                layers: [
                    {
                        name: "Occupation du sol",
                        visible: false,
                        layers: "LANDCOVER.CLC12_FR",
                        format: "image/png",
                        transparent: true,
                        attribution:
                            '<a href="http://www.statistiques.developpement-durable.gouv.fr">SOeS CLC12</a>',
                        opacity: 0.5
                    }
                ],
                legendPosition: "bottomright",
                legendItems: [
                    {label: "Aucune espèce observée", color: "rgba(0,0,0,0)"},
                    {
                        label: "De 1 à 3 espèces",
                        color: "rgb(255, 255, 178, 0.5)"
                    },
                    {
                        label: "De 4 à 7 espèces",
                        color: "rgba(254, 183, 81, 0.5)"
                    },
                    {
                        label: "De 8 à 11 espèces",
                        color: "rgba(245, 86, 41, 0.5)"
                    },
                    {label: "Plus de 11 espèces", color: "rgba(189, 0, 38, 0.5)"}
                ]
            };
        },
        metaInfo() {
            return {
                title: "Synthèse départementale (" +
                    this.nomDept +
                    ") | Portail de synthèse des espèces de vertébrés forestiers à enjeux en Auvergne-Rhône-Alpes",
                meta: [
                    {name: 'description', content: 'Synthèse des données pour le département ' + this.nomDept}
                ]

            }
        },
        methods: {
            getDatas() {
                this.loading = true;
                this.showDept = false;
                this.showDatas = false;
                this.dept = this.$route.params.dept;
                axios
                    .get(
                        "https://data.fauneauvergnerhonealpes.org/getdatas/getData.php?geotable=webgis.departements_aura&geomfield=geom&fields=code_dept,nom_dept&parameters=code_dept+ilike+%27" +
                        this.dept +
                        "%27"
                    )
                    .then(response => {
                        this.geojsonDept = response.data;
                        this.bounds = L.geoJSON(this.geojsonDept).getBounds();
                        this.showDept = true;
                        this.nomDept = this.geojsonDept['features'][0]['properties']['nom_dept'];
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                axios
                    .get(
                        "https://data.fauneauvergnerhonealpes.org/getdatas/getData.php?geotable=webgis.draaf_esp_foret_v2&geomfield=geom&fields=nb_data,nb_sp_total,pres_castor,list_chiro,pres_chatforest,list_amphib,list_rap_ard,list_tetrao,list_pics,list_esp_vieil_foret,list_esp_semi_ouv,list_chouettes,list_prebois&parameters=dept+ilike+%27" +
                        this.dept +
                        "%27"
                    )
                    .then(response => {
                        this.geojsonDatas = response.data;
                        this.loading = false;
                        this.showDatas = true;
                        this.nomDept = this.geojsonDept['features'][0]['properties']['nom_dept'];
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            displayLegend: function (bool) {
                this.legend = bool;
                console.log('legend', this.legend);
            },
        },
        watch: {
            "$route.params.dept"() {
                this.getDatas();
            }
        },
        computed: {
            options() {
                return {
                    onEachFeature: this.onEachFeatureFunction
                };
            },
            nbSp(feature) {
                if (feature.properties.nb_sp_total) {
                    var nbSp = "Données: " + feature.properties.nb_sp_total;
                }
                return nbSp;
            },
            styleDept() {
                const fillColor = this.fillColor; // important! need touch fillColor in computed for re-calculate when change fillColor
                return () => {
                    return {
                        weight: 3,
                        color: "#1779ba",
                        opacity: 1,
                        fillColor: fillColor,
                        fillOpacity: 0
                    };
                };
            },
            styleDataNbsp() {
                const weight = 0.5;
                const linecolor = "white";
                const opacity = 0.8;
                const fillopacity = 0.5;
                return feature => {
                    if (
                        feature.properties.nb_sp_total >= 0.0 &&
                        feature.properties.nb_sp_total <= 0.0
                    ) {
                        return {
                            color: linecolor,
                            weight: weight,
                            opacity: opacity,
                            dashArray: "",
                            lineCap: "butt",
                            lineJoin: "miter",
                            fillColor: "rgba(0,0,0,0)",
                            fillOpacity: "0.0"
                        };
                    }
                    if (feature.properties.nb_sp_total >= 0.0 && feature.properties.nb_sp_total < 4.0) {
                        return {
                            color: linecolor,
                            weight: weight,
                            opacity: opacity,
                            dashArray: "",
                            lineCap: "butt",
                            lineJoin: "miter",
                            fillColor: "rgb(255, 255, 178)",
                            fillOpacity: fillopacity
                        };
                    }
                    if (feature.properties.nb_sp_total >= 4.0 && feature.properties.nb_sp_total < 8.0) {
                        return {
                            color: linecolor,
                            weight: weight,
                            opacity: opacity,
                            dashArray: "",
                            lineCap: "butt",
                            lineJoin: "miter",
                            fillColor: "rgba(254, 183, 81)",
                            fillOpacity: fillopacity
                        };
                    }
                    if (feature.properties.nb_sp_total >= 8.0 && feature.properties.nb_sp_total < 12.0) {
                        return {
                            color: linecolor,
                            weight: weight,
                            opacity: opacity,
                            dashArray: "",
                            lineCap: "butt",
                            lineJoin: "miter",
                            fillColor: "rgba(245, 86, 41)",
                            fillOpacity: fillopacity
                        };
                    }
                    if (feature.properties.nb_sp_total >= 12.0) {
                        return {
                            color: linecolor,
                            weight: weight,
                            opacity: opacity,
                            dashArray: "",
                            lineCap: "butt",
                            lineJoin: "miter",
                            fillColor: "#bd0026",
                            fillOpacity: fillopacity
                        };
                    }
                };
            },
            openDatas() {
                return () => {
                    var self = this;
                    self.displayDataCol = true;
                    this.$nextTick(() => {
                        this.$refs.deptMap.mapObject.invalidateSize()
                    })
                };
            },
            closeDatas() {
                return () => {
                    var self = this;
                    self.displayDataCol = false;
                    this.$nextTick(() => {
                        this.$refs.deptMap.mapObject.invalidateSize()
                    })
                };
            },
            onEachFeatureFunction() {
                if (!this.enableTooltip) {
                    return () => {
                    };
                }
                return (feature, layer) => {
                    var self = this;
                    layer.on("click", function (e) {
                        self.featureProps = feature.properties;
                        if (self.displayDataCol === false) {
                            self.openDatas();
                        }
                        ;
                        self.displayData = true;
                    }),
                        layer.on('mouseover', function (e) {
                            layer.setStyle({
                                weight: 5,
                                color: '#c82333'
                            })
                        }),
                        layer.on('mouseout', function (e) {
                            layer.setStyle({
                                weight: 0.5,
                                color: 'white'
                            })
                        });
                };
            }
        },
        // beforeCreate() {
        //     this.$nextTick(() => {
        //         this.$refs.deptMap.mapObject.addInitHook("addHandler", "gestureHandling", GestureHandling);
        //     })
        // },
        created() {
            this.getDatas();
            // },
            // beforeRouteUpdate (to, from, next) {
            //     this.getDatas()
            //     console.log('beforeRouteUpdate TO', to.params.dept);
            //     next()
            // }
        }
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

    .nbdata h4 {
        color: orangered;
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
        overflow-y: scroll;
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
        margin-top: -60px;
        margin-left: -60px;
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

    .leaflet-container {
        background-color: rgba(255, 0, 0, 0);
    }

    .alert-fixed {
        position: absolute !important;
        left: 10%;
        top: 10%;
        width: 80%;
        z-index: 999;
    }

    .legend {
        background: #fff;
        /*height: 200px;*/
        padding: 0 0.5em;
        border: 1px solid #aaa;
        border-radius: 0.1em;
        text-align: left;
        line-height: normal;
    }
</style>
