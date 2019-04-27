<template>
  <div>
    <l-map id="map" :zoom="zoom" :center="center" :bounds="bounds" :maxBounds="bounds">
      <l-tile-layer :url="tileLayer.url" :attribution="tileLayer.attribution"/>
      <l-geo-json :geojson="geojsonDept" :options="options" :optionsStyle="styleDept"/>
      <l-control class="logo_region" :position="logoPosition">
        <p>
          <small>Avec le soutien financier de</small>
        </p>
        <img src="@/assets/logo_region_aura.svg">
      </l-control>
    </l-map>
    <b-modal v-model="openModal" ref="modalInfo" hide-footer title="Bienvenue">
      <div class="d-block text-center">
        <h3>Portail de synthèse des espèces de vertébrés forestiers à enjeux en Auvergne-Rhône-Alpes!</h3>
        <p>Cliquez sur l'un des départements pour explorer les données de son territoire</p>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Fermer</b-button>
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
      { charset: 'utf-8' },
      { name: 'description', content: 'Biodiversité, Portail de synthèse des espèces de vertébrés forestiers à enjeux en Auvergne-Rhône-Alpes'},
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
        .catch(function(error) {
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
        layer.on("click", function(e) {
          self.$router.push({
            name: "LocalMap",
            params: { dept: feature.properties.code_dept }
          });
          console.log("DEPT", feature.properties.code_dept);
        });
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
