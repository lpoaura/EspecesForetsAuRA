import '@babel/polyfill'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/vue-meta'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'leaflet/dist/leaflet.css'

// import BBadge from 'bootstrap-vue/es/components/badge/badge'
// import BButton from 'bootstrap-vue/es/components/button/button'
// Vue.component('b-badge', BBadge)
// Vue.component('b-btn', BButton)


Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')