<template>
    <div id="loader">
        <div class="loader1"></div>
        <div class="loader2"></div>
        <div class="loader3"></div>
    </div>
</template>

<script>
    export default {
        name: "SpinLoader"
    }
</script>

<style scoped>
    .loader1 {
        border: 1px solid transparent;/* Light grey */
        border-top: 3px solid #3498db; /* Blue */
        border-radius: 50%;
        position: absolute !important;
        left: 50%;
        top: 50%;
        margin-top: -60px;
        margin-left: -60px;
        width: 120px;
        height: 120px;
        animation: spin 3s linear infinite;
        z-index: 999;
    }

    .loader2 {
        border: 1px solid transparent; /* Light grey */
        border-top: 3px solid #3498db; /* Blue */
        border-radius: 50%;
        position: absolute !important;
        left: 50%;
        top: 50%;
        margin-top: -50px;
        margin-left: -50px;
        width: 100px;
        height: 100px;
        animation: spin 1s linear infinite;
        animation-direction: reverse;
        z-index: 999;
    }

    .loader3 {
        border: 1px solid transparent; /* Light grey */
        border-top: 3px solid #3498db; /* Blue */
        border-radius: 50%;
        position: absolute !important;
        left: 50%;
        top: 50%;
        margin-top: -40px;
        margin-left: -40px;
        width: 80px;
        height: 80px;
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
</style>
