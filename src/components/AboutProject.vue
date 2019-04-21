<template>
    <b-modal id="about-modal" ok-variant="danger" ok-title="Fermer" ok-only size="xl" scrollable
             title="A propos du projet">
        <div id="modal-content">
            <b-tabs content-class="mt-3">
                <b-tab title="Le projet" active>
                    <h2>Valorisation des connaissances sur les espèces forestières et forêts patrimoniales pour une
                        meilleure prise en compte dans la gestion forestière</h2>
                    <p>Cette action est réalisée dans le cadre du programme d'actions de la LPO en faveur de la
                        biodiversité en Auvergne-Rhône-Alpes, piloté par la LPO Drôme et avec le soutien financier de la
                        région
                        Auvergne-Rhône-Alpes.</p>
                    <p align="center"><a href="http://www.auvergnerhonealpes.fr/"><img id="logo_region"
                                                                                       src="@/assets/logo_region_aura.svg"></a>
                    </p>
                    <h2>Rappel des objectifs</h2>
                    <h3>Objectifs du plan d’actions Forêts des LPO de Auvergne-Rhône-Alpes</h3>
                    <ul>
                        <li>Identifier les forêts à enjeux en croisant les facteurs écologiques, économiques et
                            sociaux
                        </li>
                        <li>Identifier et étudier les forêts méconnues sur le plan naturaliste</li>
                        <li>Valoriser les connaissances naturalistes actuelles sur la biodiversité en forêt</li>
                        <li>Mobiliser le grand public sur le rôle écologique des forêts et leur protection</li>
                    </ul>
                    <h3>Objectifs de cette action de vulgarisation des données naturalistes en milieux forestiers</h3>
                    <ul>
                        <li>Localisation des secteurs à faible pression de prospection</li>
                        <li>Localisation des secteurs à enjeux :</li>
                        <ul>
                            <li>Nombre d’espèces présentes élevé</li>
                            <li>Présence d’espèces patrimoniales</li>
                            <li>Exploitation forestière présente ou à venir (présence de Charte forestière
                                territoriale...)
                            </li>
                        </ul>
                        <li>Vulgarisation de ces cartes auprès des partenaires notamment forestiers</li>
                    </ul>
                    <h2>Méthode</h2>
                    <p>L’ensemble des données, localisées en milieux forestiers (habitats forestiers selon Corine Land
                        Cover), des 12 départements rhônalpins ont été extraites des sites Visionature départementaux et
                        utilisées pour la réalisation de ces cartes.</p>
                    <p>Ce jeu de données a été homogénéisé et traité afin d’obtenir des informations à l’échelle des
                        départements sur un maillage composé de carrés de 1 km x 1 km.</p>
                    <p>Les cartes sont réalisées pour les quatre classes suivantes : mammifère, oiseau, amphibien et
                        reptile.</p>
                    <p>Une première analyse des données a permis de réaliser des cartes sur toutes les données
                        disponibles
                        par classes afin de connaître la pression de prospection et la diversité spécifique connue.
                    </p>
                    <p>Une deuxième analyse s’est intéressée aux enjeux connus sur les espèces forestières patrimoniales
                        en
                        Auvergne-Rhône-Alpes (prise en compte de leur statut sur la liste rouge régionale) dont la
                        préservation est
                        notamment liée à la gestion forestière.</p>
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
                                <b-link><code href="https://vuejs.org/" target="_blank">PostgreSQL</code></b-link> et son extension spatiale <b-link><code>PostGIS</code></b-link></b-link>
                            </li>
                            <li>Le client SQL
                                <b-link href="https://vuejs.org/" target="_blank"><code>DataGrip</code></b-link>
                                de l'éditeur JetBrains
                            </li>
                            <li>La transformation des tables <code>PostgreSQL/PostGIS</code> en flux web au format geojson est assurée par un script php
                                dont le code source est
                                <b-link href="https://framagit.org/fred.perso/getgeojsondatasfrompostgis/tree/master/getdatas" target="_blank">ici</b-link>
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
                    <div>
                        <b-card bg-variant="light">Les données sources de cette synthèse sont
                            issues des
                            <b-link href="https://fauneauvergnerhonealpes.org/observations/" target="_blank">portails
                                faune de la LPO Auvergne-Rhône-Alpes
                            </b-link>
                            .
                        </b-card>
                    </div>
                </b-tab>

                </b-tab>
            </b-tabs>
        </div>
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