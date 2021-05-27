<template>
    <div>
        <l-map id="map" :zoom="zoom" :center="center" :bounds="bounds" :maxBounds="bounds">
            <l-tile-layer :url="tileLayer.url" :attribution="tileLayer.attribution"/>
            <l-geo-json :geojson="geojsonDept" :options="options" :optionsStyle="styleDept"/>
            <l-control class="logo_region" :position="logoPosition">
                <p>
                    <small>Avec le soutien financier de</small>
                </p>
                <a href="http://www.auvergnerhonealpes.fr/" target="_blank"><img id="logo_region"
                                                                 src="@/assets/logo_region_aura.svg"></a> &nbsp;&nbsp;
                <a href="https://www.prefectures-regions.gouv.fr/auvergne-rhone-alpes" target="_blank"><img id="logo_pref_aura"
                                                                                      src="@/assets/logo_pref_aura.svg"></a>
            </l-control>
        </l-map>
        <b-modal v-model="openModal" ref="modalInfo" ok-only ok-title="Fermer" ok-variant="danger" scrollable hide-header>
            <div class="text-center">
                <h3>Espèces vertébrées forestières à enjeux en Auvergne-Rhône-Alpes&nbsp;!</h3>
                <p>Cliquez sur l'un des départements pour explorer les données de son territoire.</p>
                <p><strong>Cette carte interactive est une représentation de la connaissance actuelle. L’absence
                    d’espèce sur certaines mailles peut être due à un défaut de prospection et non à une vraie absence.
                    Il faut donc rester prudent quant à l’interprétation de cette carte.</strong></p>
                <p>Vous trouverez plus de précisions sur les méthodologies employées dans l'onglet « Le projet ».</p>
                <p>Un projet réalisé avec le soutien financier de :</p>
                <div class="text-center">
                        <div class="logo">
                            <a href="http://www.auvergnerhonealpes.fr/" target="_blank"><img id="logo_region"
                                                                             src="@/assets/logo_region_aura.svg"></a>&nbsp;&nbsp;
                            <a href="https://www.prefectures-regions.gouv.fr/auvergne-rhone-alpes" target="_blank"><img id="logo_pref_aura"
                                                                                                  src="@/assets/logo_pref_aura.svg"></a>
                        </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import {
        LControl,
        LGeoJson,
        LMap,
        LMarker,
        LPopup,
        LTileLayer
    } from "vue2-leaflet";
    import axios from "axios";
    import Meta from "vue-meta";

    export default {
        name: "VueLeaflet",
        components: {
            LMap,
            LTileLayer,
            LMarker,
            LPopup,
            LGeoJson,
            LControl
        },
        metaInfo() {
            return {
                title: "Accueil | Portail de synthèse des espèces de vertébrés forestiers à enjeux en Auvergne-Rhône-Alpes",
                meta: [
                    {charset: 'utf-8'},
                    {
                        name: 'description',
                        content: 'Biodiversité, Portail de synthèse des espèces de vertébrés forestiers à enjeux en Auvergne-Rhône-Alpes'
                    },
                    {
                        'property': 'og:title',
                        'content': 'Accueil',
                        'template': chunk => `${chunk} | Portail de synthèse des espèces de vertébrés forestiers à enjeux en Auvergne-Rhône-Alpes`, //or as string template: '%s - My page',
                        'vmid': 'og:title'
                    }
                ]
            }
        },
        data() {
            return {
                loading: false,
                zoom: 8,
                openModal: true,
                logoPosition: "bottomright",
                center: [45.51, 4.53],
                geojsonDept: null,
                bounds: null,
                tileLayer: {
                    url: "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
                    attribution:
                        '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }
            };
        },
        methods: {
            getDatas() {
                this.loading = true;
                axios
                    .get(
                        "https://data.fauneauvergnerhonealpes.org/getdatas/getData.php?geotable=webgis.departements_aura&geomfield=geom&fields=code_dept,nom_dept"
                    )
                    .then(response => {
                        this.geojsonDept = response.data;
                        this.bounds = L.geoJSON(this.geojsonDept).getBounds();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            showModal() {
                this.$refs.modalInfo.show();
            },
            hideModal() {
                this.$refs.modalInfo.hide();
            },
            toggleModal() {
                // We pass the ID of the button that we want to return focus to
                // when the modal has hidden
                this.$refs.modalInfo.toggle("#toggle-btn");
            }
        },
        computed: {
            options() {
                return {
                    onEachFeature: this.onEachFeatureFunction
                };
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
            onEachFeatureFunction() {
                return (feature, layer) => {
                    layer.bindTooltip(
                        feature.properties.nom_dept +
                        " (" +
                        feature.properties.code_dept +
                        ")",
                        {
                            permanent: false,
                            sticky: true
                        }
                    );
                    var self = this;
                    layer.on("click", function (e) {
                        self.$router.push({
                            name: "LocalMap",
                            params: {dept: feature.properties.code_dept}
                        });
                        console.log("DEPT", feature.properties.code_dept);
                    });
                    // layer.on('mouseover', function(e){
                    //     self.layer.style({fillOpacity:1})
                    // })
                    layer.on('mouseover', function (e) {
                        layer.setStyle({
                            weight: 5,
                            fillColor: '#1779ba',
                            fillOpacity: 0.2
                        })
                    }),
                        layer.on('mouseout', function (e) {
                            layer.setStyle({
                                weight: 2,
                                fillColor: '',
                                fillOpacity: 0
                            })
                        })
                };
            }
        },
        created() {
            this.getDatas();
        }
    };
</script>

<style lang="scss">
    #map {
        height: calc(100% - 80px);
        width: 100%;
        position: absolute !important;
    }

    .logo {
        text-align: center;
    }

    .modalAlign{
        text-align: center;
    }
    .logo_region {
        background: #fff;
        /*height: 200px;*/
        padding: 0 0.5em;
        border: 1px solid #aaa;
        border-radius: 0.1em;
    }

    img {
        height: 80px;
    }

    #modalInfo {
        z-index: 10000;
    }

    #modal-content {
        text-align: left;
    }
</style>
