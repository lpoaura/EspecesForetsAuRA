<template>
    <b-modal id="about-modal" ok-only ok-title="Fermer" ok-variant="danger" scrollable size="xl"
             title="A propos du projet">
        <b-card id="modal-content" no-body>
            <b-tabs fill pills card>
                <b-tab active title="Le projet">
                    <h2>
                        Valorisation des connaissances sur les espèces forestières pour une meilleure prise en compte
                        dans la gestion forestière</h2>
                    <p>Cette action, réalisée par la LPO Auvergne-Rhône-Alpes et soutenue financièrement par la DRAAF et
                        la Région Auvergne-Rhône-Alpes a pour objectif de porter à connaissances des gestionnaires
                        forestiers les informations sur la présence d’espèces sensibles à la gestion forestière et de
                        diffuser des recommandations d’intervention.</p>

                    <p align="center">
                        <a href="http://www.auvergnerhonealpes.fr/"><img id="logo_region"
                                                                         src="@/assets/logo_region_aura.svg"></a>&nbsp;&nbsp;
                        &nbsp;
                        <a href="http://draaf.auvergne-rhone-alpes.agriculture.gouv.fr/"><img id="logo_region"
                                                                                              src="@/assets/logo_draaf.png"></a>
                    </p>
                    <h2>Méthode</h2>
                    <p>Ce portail cartographique présente à l’échelle de mailles kilométriques, la présence avérée et
                        probable d’espèces forestières à enjeux patrimoniales.</p>
                    <p>Les espèces sélectionnées ont été choisies en fonction de leur statut sur les listes rouges
                        régionales et de leur sensibilité à la gestion forestière.</p>
                    <p>L’ensemble des données, localisées en milieux forestiers (habitats forestiers selon la BD Forêt®
                        de l’IGN ), de l’ensemble de la région ont été extraites des bases de données naturalistes (LPO,
                        Chauve-Souris Auvergne, Groupe Mammalogique d’Auvergne, CPIE) et utilisées pour la réalisation
                        de ces cartes.</p>
                    <p>Pour chaque maille, deux informations sont présentées&nbsp;:</p>
                    <ul>
                        <li>les espèces observées&nbsp;;</li>
                        <li>les espèces probablement présentes. Cette probabilité a été calculée via une méthode
                            statistique (<code>Biomod2</code>) en mettant en
                            relation des données environnementales et les données de présence de l’espèce. Il s’agit des
                            espèces listées entre parenthèses.
                        </li>
                    </ul>
                    <br/>

                </b-tab>
                <b-tab title="Qui?">
                    <h3>Contact régional</h3>
                    <b>LPO Auvergne-Rhône-Alpes</b> : Julien GIRARD-CLAUDON
                    <h3>Organisation, animation et rédaction</h3>
                    <b>LPO Auvergne-Rhône-Alpes</b> : Arthur VERNET
                    <h3>Analyses statistiques des données</h3>
                    <b>LPO Auvergne-Rhône-Alpes</b> : Arthur VERNET
                    <h3>Préparation des données pour la mise en ligne</h3>
                    <b>LPO Auvergne-Rhône-Alpes</b> : Lana PETROD
                    <h3>Conception web et mise en ligne</h3>
                    <b>LPO Auvergne-Rhône-Alpes</b> : Frédéric CLOITRE
                </b-tab>
                <b-tab title="Informations sur l'appli">
                    <div>
                        <h3>Cette carte a été développée par la LPO Auvergne-Rhône-Alpes à l'aide des outils</h3>
                        <h4>Analyses statistiques des données</h4>
                        A venir
                        <h4>Préparation et diffusion des données</h4>
                        <ul>
                            <li>Un serveur de bases de données
                                <b-link><code href="https://vuejs.org/" target="_blank">PostgreSQL</code></b-link>
                                et son extension spatiale
                                <b-link><code>PostGIS</code></b-link>
                                </b-link>
                            </li>
                            <li>Le client SQL
                                <b-link href="https://vuejs.org/" target="_blank"><code>DataGrip</code></b-link>
                                de l'éditeur JetBrains
                            </li>
                            <li>La transformation des tables <code>PostgreSQL/PostGIS</code> en flux web au format
                                geojson est assurée par un script php
                                dont le code source est
                                <b-link href="https://framagit.org/fred.perso/getgeojsondatasfrompostgis/tree/master/getdatas"
                                        target="_blank">ici
                                </b-link>
                            </li>
                        </ul>
                        <h4>Application web</h4>
                        <ul>
                            <li>Le framework JavaScript open-source
                                <b-link href="https://vuejs.org/" target="_blank"><code>Vue.js</code></b-link>
                                pour construire l'interface utilisateur.
                            <li>La librairie javascript
                                <b-link href="https://leafletjs.com/" target="_blank"><code>Leaflet.js</code></b-link>
                                , une bibliothèque opensource de cartographie interactive intégrée dans vuejs grâce à la
                                librairie
                                <b-link href="https://korigan.github.io/Vue2Leaflet/#/" target="_blank"><code>vue2-leaflet</code>
                                </b-link>
                            </li>
                            <li>
                                <b-link href="https://getbootstrap.com/" target="_blank"><code>Bootstrap</code></b-link>
                                , Bootstrap est une collection d'outils utiles à la création du design web grâce à la
                                librairie
                                <b-link href="https://bootstrap-vue.js.org/" target="_blank">
                                    <code>bootstrap-vuejs</code></b-link>
                            </li>
                            <li>L'environnement de développement
                                <b-link href="https://code.visualstudio.com/" target="_blank"><code>VisualStudio
                                    Code</code></b-link>
                                un IDE polyvalent libre développé par Microsoft
                            </li>
                        </ul>
                    </div>
                    <b-card
                            border-variant="info"
                            header="Sources des données"
                            header-border-variant="info"
                            header-text-variant="info"
                            align="center"
                    >
                        <b-card-text align="justify">
                            L’ensemble des données naturalistes régionales sont issues des bases de données des
                            associations naturalistes (LPO,
                            Chauves-souris Auvergne, Groupe Mammalogique d’Auvergne, CPIE).
                            <div class="text-center">
                                <a href="http://auvergne-rhone-alpes.lpo.fr/" target="_blank">
                                    <img class="imgTable" src="@/assets/logo_lpo.png" alt="logo LpoAuRA"></a>&nbsp;
                                <a href="http://cpie-clermont-domes.org/presentation-du-centre-de-ressources-du-cpie-clermont-domes/observatoire-des-amphibiens/"
                                   target="_blank">
                                    <img class="imgTable" src="@/assets/logo_urcpie.jpg" alt="logo OAA"></a>&nbsp;
                                <a href="http://www.chauve-souris-auvergne.fr/" target="_blank">
                                    <img class="imgTable" src="@/assets/logo_csa.jpg" alt="logo CSA"></a>&nbsp;
                                <a href="http://mammiferes.org/" target="_blank">
                                    <img class="imgTable" src="@/assets/logo_gma.jpg" alt="logo GMA"></a>&nbsp;
                                <a href="http://urcpie-aura.org/" target="_blank">
                                    <img class="imgTable" src="@/assets/logo_ora.png" alt="logo URCPIE"></a>
                            </div>
                        </b-card-text>
                    </b-card>
                </b-tab>
            </b-tabs>
        </b-card>
    </b-modal>
</template>

<style lang="scss">
    #logo_region {
        max-height: 200px;
    }

    #modal-content {
        text-align: left;
    }

</style>
