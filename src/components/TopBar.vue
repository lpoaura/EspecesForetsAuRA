<template>
    <div>
        <b-navbar toggleable="lg">
            <b-navbar-brand href="#"><img id="logo" alt="Vue logo" src="@/assets/logo.png"></b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>


                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <b-input-group>
                            <b-form-select v-model="selected" :options="options" placeholder="Département"></b-form-select>
                            <b-input-group-append>
                                <b-button :to="{ name: 'LocalMap', params: { dept: selected }}" variant="info">Voir</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-nav-form>
                    <b-nav-item v-b-modal.about-modal>A propos</b-nav-item>
                    <!-- Modal Component -->
                    <b-modal id="about-modal" size="xl" scrollable title="A propos du projet">
                        <about-project></about-project>
                    </b-modal>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>



<script>
    import AboutProject from './AboutProject';
    export default {
        name:'TobBar',
        components: {AboutProject},
        data() {
            return {
                selected: null,
                options: [
                    { value: null, text: 'Choisissez un départements' },
                    {value: '01', text: 'Ain'},
                    {value: '03', text: 'Allier'},
                    {value: '07', text: 'Ardèche'},
                    {value: '15', text: 'Cantal'},
                    {value: '26', text: 'Drôme'},
                    {value: '38', text: 'Isère'},
                    {value: '42', text: 'Loire'},
                    {value: '43', text: 'Haute-Loire'},
                    {value: '69', text: 'Rhône'},
                    {value: '73', text: 'Savoie'},
                    {value: '74', text: 'Haute-Savoie'},
                ]
            }
        }
    }
</script>


<style lang="scss">
    #logo {
        height: 50px;
    }
</style>
