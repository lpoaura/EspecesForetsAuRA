<template>
    <div>
        <b-navbar toggleable="lg">
            <b-navbar-brand :to="{ name: 'home'}">
                <img id="logo" alt="Vue logo" src="@/assets/logo.png">
            </b-navbar-brand>
            <span class="navbar-text d-none d-md-block"> Espèce de vertébrés forestiers à enjeux <i v-if='deptName'>({{deptName}})</i> </span>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <b-input-group>
                            <b-form-select
                                    v-model="selected"
                                    v-on:change="select()"
                                    :options="options"
                                    placeholder="Département"
                            ></b-form-select>
                            <b-input-group-append>
                                <b-btn variant="outline-success" :to="{ name: 'home'}">Accueil</b-btn>
                                <b-btn variant="outline-info" v-b-modal.about-modal>Le projet</b-btn>
                                <b-btn variant="outline-primary" v-b-modal.partners-modal>Partenaires contributeurs</b-btn>
                            </b-input-group-append>
                        </b-input-group>
                    </b-nav-form>
                    <!-- Modal Component -->
                    <about-project></about-project>
                    <partners></partners>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>


<script>
    import AboutProject from "./AboutProject";
    import Partners from "./Partners";

    export default {
        name: "TobBar",
        components: {AboutProject, Partners},
        data() {
            return {
                selected: null,
                deptName: null,
                options: [
                    {value: null, text: "Choisissez un département"},
                    {value: "01", text: "Ain"},
                    {value: "03", text: "Allier"},
                    {value: "07", text: "Ardèche"},
                    {value: "15", text: "Cantal"},
                    {value: "26", text: "Drôme"},
                    {value: "38", text: "Isère"},
                    {value: "42", text: "Loire"},
                    {value: "43", text: "Haute-Loire"},
                    {value: "63", text: "Puy-de-Dôme"},
                    {value: "69", text: "Rhône"},
                    {value: "73", text: "Savoie"},
                    {value: "74", text: "Haute-Savoie"}
                ]
            };
        },
        metaInfo() {
            return {
                meta: [
                    {charset: 'utf-8'},
                    {name: 'author', content: 'LPO Auvergne-Rhône-Alpes'},
                ]
            }
        },
        methods: {
            select() {
                //if you want to send any data into server before redirection then you can do it here
                if (this.selected == null) {
                    this.$router.push("/");
                } else {
                    this.$router.push({
                        name: "LocalMap",
                        params: {dept: this.selected}
                    });
                }
            },
            getDeptName() {
                const dept = this.$route.params.dept;
                if (dept) {
                    for (var i = 0; i < this.options.length; i++) {
                        var option = this.options[i];
                        if (option.value == dept) {
                            this.deptName = option.text;
                        }
                    }
                }
            },
            getSelected() {
                const dept = this.$route.params.dept;
                if (dept) {
                    this.selected = dept;
                }
            }
        },
        watch: {
            "$route.params.dept"() {
                this.getDeptName();
                this.getSelected();
            }
        }
    };
</script>


<style lang="scss">
    #logo {
        height: 50px;
    }
</style>
