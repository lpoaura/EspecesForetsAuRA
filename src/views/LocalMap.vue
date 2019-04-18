<template>
    <div id="bloc">
        <div>
            <div class="datas">
                <h1>Données</h1>
                <p><b>Nombre de données</b> {{nb_data}}</p>
                <p><b>Nombre d'espèces</b> {{nb_sp}}</p>
                <p><b>Chiros</b> {{chiro}}</p>
            </div>
            <l-map id="map" :zoom="zoom" :center="center" :bounds="bounds">
                <l-tile-layer :url="url" :attribution="attribution"/>
                <l-geo-json v-if="show" :geojson="geojson" :options="options" :options-style="styleFunction"/>
            </l-map>
        </div>

    </div>
    </div>
</template>

<script>
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
                zoom: 6,
                center: [48, -1.219482],
                displayData: false,
                chiro: null,
                nb_data: null,
                nb_sp: null,
                geojson: null,
                bounds: null,
                featureUpdates: null,
                fillColor: "blue",
                url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
                attribution:
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }
        },
        computed: {
            options() {
                return {
                    onEachFeature: this.onEachFeatureFunction
                };
            },
            styleFunction() {
                const fillColor = this.fillColor; // important! need touch fillColor in computed for re-calculate when change fillColor
                return () => {
                    return {
                        weight: 2,
                        color: "white",
                        opacity: 1,
                        fillColor: fillColor,
                        fillOpacity: 0.1
                    };
                };
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
                        self.chiro = feature.properties.list_chiro;
                        self.nb_sp = feature.properties.nb_sp
                    })
                }
            }
            /*onEachFeatureFunction() {
                if (!this.enableTooltip) {
                    return () => {
                    };
                }
                return (feature, layer) => {
                    layer.bindPopup(
                        '<h3 class="bluetxt" align="center">Synthèse de la maille</h3><br /><strong class="orangetxt">Nombre de données : </strong>' +
                        (feature.properties['nb_data'] ? Autolinker.link(String(feature.properties[
                            'nb_data'])) : 'Aucune') +
                        '<br/><strong class="orangetxt">Nombre d\'espèces à enjeux : </strong>' + (feature.properties['nb_sp'] !==
                        null ? Autolinker.link(String(feature.properties['nb_sp'])) : 'Aucune') +
                        '<br/><a href="docs/Preconisations_de_gestion_chiropteres.pdf" class="button tiny" target="_blank"><i class="fi-page-pdf"></i>&nbsp;Chauves-souris</a>&nbsp;' +
                        (feature.properties['list_chiro'] ? Autolinker.link(String(
                            feature.properties['list_chiro'])) : '<i class="greytxt">Absence de données</i>') +
                        '<br/><a href="docs/Preconisations_de_gestion_chat_forestier.pdf" class="button tiny" target="_blank" title="Télécharger la fiche de préconisations pour ce groupe"><i class="fi-page-pdf"></i>&nbsp;Chat forestier</a>&nbsp;' +
                        (feature
                            .properties['pres_chatforest'] ? Autolinker.link(String(feature.properties[
                            'pres_chatforest'])) : '<i class="greytxt">Absence de données</i>') +
                        '<br/><a href="docs/Preconisations_de_gestion_castor.pdf" class="button tiny" target="_blank" title="Télécharger la fiche de préconisations pour ce groupe"><i class="fi-page-pdf"></i>&nbsp;Castor d\'Europe</a>&nbsp;' +
                        (feature.properties[
                            'pres_castor'] ? Autolinker.link(String(feature.properties['pres_castor'])) :
                            '<i class="greytxt">Absence de données</i>') +
                        '<br/><a href="docs/Preconisations_de_gestion_amphibiens.pdf" class="button tiny" target="_blank" title="Télécharger la fiche de préconisations pour ce groupe"><i class="fi-page-pdf"></i>&nbsp;Amphibiens</a>&nbsp;' +
                        (feature.properties[
                            'list_amphib'] ? Autolinker.link(String(feature.properties['list_amphib'])) :
                            '<i class="greytxt">Absence de données</i>') +
                        '<br/><a href="docs/Preconisations_de_gestion_rapaces_ardeides.pdf" class="button tiny" target="_blank" title="Télécharger la fiche de préconisations pour ce groupe"><i class="fi-page-pdf"></i>&nbsp;Rapaces et Ardéidés</a>&nbsp;' +
                        (
                            feature.properties['list_rap_ard'] ? Autolinker.link(String(feature.properties[
                                'list_rap_ard'])) : '<i class="greytxt">Absence de données</i>') +
                        '<br/><a href="docs/Preconisations_de_gestion_tetraonides.pdf" class="button tiny" target="_blank" title="Télécharger la fiche de préconisations pour ce groupe"><i class="fi-page-pdf"></i>&nbsp;Tétraonidés</a>&nbsp;' +
                        (feature.properties[
                            'list_tetrao'] ? Autolinker.link(String(feature.properties['list_tetrao'])) :
                            '<i class="greytxt">Absence de données</i>') +
                        '<br/><a href="docs/Preconisations_de_gestion_pics.pdf" class="button tiny" target="_blank" title="Télécharger la fiche de préconisations pour ce groupe"><i class="fi-page-pdf"></i>&nbsp;Pics</a>&nbsp;' +
                        (feature.properties[
                            'list_pics'] ? Autolinker.link(String(feature.properties['list_pics'])) :
                            '<i class="greytxt">Absence de données</i>') +
                        '<br/><a href="docs/Preconisations_de_gestion_vieilles_foret.pdf" class="button tiny" target="_blank" title="Télécharger la fiche de préconisations pour ce groupe"><i class="fi-page-pdf"></i>&nbsp;Espèces de vieilles forêts</a>&nbsp;' +
                        (feature.properties['list_esp_vieil_foret'] ? Autolinker.link(String(feature.properties[
                            'list_esp_vieil_foret'])) : '<i class="greytxt">Absence de données</i>') +
                        '<br/><a href="docs/Preconisations_de_gestion_semi_ouverts.pdf" class="button tiny" target="_blank" title="Télécharger la fiche de préconisations pour ce groupe"><i class="fi-page-pdf"></i>&nbsp;Espèces de milieux semi-ouverts</a>&nbsp;' +
                        (feature.properties['list_esp_semi_ouv'] ? Autolinker.link(String(feature.properties[
                            'list_esp_semi_ouv'])) : '<i class="greytxt">Absence de données</i>') +
                        '<br/><a href="docs/Preconisations_de_gestion_chouettes.pdf" class="button tiny" target="_blank" title="Télécharger la fiche de préconisations pour ce groupe"><i class="fi-page-pdf"></i>&nbsp;Chouettes</a>&nbsp;' +
                        (feature.properties[
                            'list_chouettes'] ? Autolinker.link(String(feature.properties['list_chouettes'])) :
                            '<i class="greytxt">Absence de données</i>') +
                        '<br/><a href="docs/Preconisations_de_gestion_prebois.pdf" class="button tiny" target="_blank" title="Télécharger la fiche de préconisations pour ce groupe"><i class="fi-page-pdf"></i>&nbsp;Espèces de prébois</a>&nbsp;' +
                        (feature.properties[
                            'list_prebois'] ? Autolinker.link(String(feature.properties['list_prebois'])) :
                            '<i class="greytxt">Absence de données</i>'),
                        {
                            permanent: false,
                            sticky: true
                        }
                    );
                };
            }*/
        },
        created() {
            this.loading = true;
            axios
                .get(
                    "https://data.fauneauvergnerhonealpes.org/getdatas/getData.php?geotable=webgis.draaf_esp_foret&geomfield=geom&fields=nb_data,nb_sp,pres_castor,list_chiro,pres_chatforest,list_amphib,list_rap_ard,list_tetrao,list_pics,list_esp_vieil_foret,list_esp_semi_ouv,list_chouettes,list_prebois&parameters=dept+ilike+%27" +
                    this.$route.params.dept +
                    "%27",
                    {crossdomain: true}
                )
                .then(response => {
                    this.geojson = response.data;
                    console.log("DATAS", response.data);
                    this.loading = false;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };
</script>


<style lang="scss">
    #bloc {
        margin: 0;
        padding: 0;
    }

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

    .spinner {
        position: fixed;
        z-index: 99; /* make higher than whatever is on the page */
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        background: red;
        width: 100px;
        height: 100px;
    }

    strong.bluetxt {
        color: #1779ba;
        /*line-height: normal !important;*/
    }

    .orangetxt {
        color: #FF9933;
    }

    .label {
        font: 10px/1.25 "Helvetica Neue", Arial, Helvetica, sans-serif;
        /*line-height: normal;*/
    }

    h2 {
        margin: 0 0 5px;
        color: #1779ba;
        font-size: 1.5rem;
    }

    h3 {
        margin: 0 0 0px;
        color: #1779ba;
        font-size: 1rem;
    }

    /*.a hover {
      background-color: yellow;
    }*/
    .button.tiny {
        border-radius: 2px;
        background: #1779ba;
        box-shadow: none;
        text-decoration: none;
        border-width: 1px;
        border-color: #1779ba;
        padding-top: 1px;
        padding-bottom: 1px;
        padding-left: 2px;
        padding-right: 2px;
        margin-top: 2px;
        margin-bottom: 2px;
        font: 12px/1.5 "Helvetica Neue", Arial, Helvetica, sans-serif;
        color: white;
    }


    .button.tiny:hover {
        border-radius: 2px;
        box-shadow: none;
        text-decoration: none;
        border-style: solid;
        text-decoration: none;
        border-width: 1px;
        border-color: #1779ba;
        background-color: white;
        padding-top: 1px;
        padding-bottom: 1px;
        padding-left: 2px;
        padding-right: 2px;
        margin-top: 2px;
        margin-bottom: 2px;
        font: 12px/1.5 "Helvetica Neue", Arial, Helvetica, sans-serif;
        color: #1779ba;
    }

    .button {
        border-radius: 10px;
        background: #1779ba;
        box-shadow: none;
        border-style: solid;
        text-decoration: none;
        border-width: 1px;
        border-color: #1779ba;
        padding-top: 1px;
        padding-bottom: 1px;
        padding-left: 5px;
        padding-right: 5px;
        margin-top: 2px;
        margin-bottom: 2px;
        color: white;
        font-size: 1.5rem;
    }

    a.button {
        color: white
    }

    .button:hover {
        border-radius: 10px;
        box-shadow: none;
        border-style: solid;
        text-decoration: none;
        border-width: 1px;
        border-color: #1779ba;
        background-color: white;
        padding-top: 1px;
        padding-bottom: 1px;
        padding-left: 5px;
        padding-right: 5px;
        margin-top: 2px;
        margin-bottom: 2px;
        color: #1779ba;
        font-size: 1.5rem;
    }

    .leaflet-popup a {
        color: white;
    }

    i.greytxt {
        color: #aaa;
    }

    .datas {
        border-left: 1px solid teal;
        width: 100%;
        position: relative;
        background: white;
    }

    .map {
        height: 100%;
        width: 100%;
        position: absolute !important;
    }

</style>
