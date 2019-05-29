<template>
    <div id="app">
        <top-bar></top-bar>
        <router-view/>
        <footer></footer>

    </div>
</template>
<script>
    import TopBar from './components/TopBar'

    export default {
        name: 'App',
        components: {TopBar}
    }
</script>

<style lang="scss">

    @import 'custom.scss';

    #app {
        font-family: Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
        a {
            font-weight: bold;
            color: #2c3e50;
            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
