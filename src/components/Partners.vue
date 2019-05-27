<template>
    <b-modal id="partners-modal" ok-only ok-title="Fermer" ok-variant="danger" scrollable size="md"
             title="Partenaires contributeurs">
        <div id="modal-content" class="text-center">
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
    </b-modal>
</template>

<style lang="scss">
    #logo_region {
        max-height: 200px;
    }

    #modal-content {
        text-align: left;
    }

    .imgTable {
        height: 75px;
    }

    /*.text-center {*/
    /*    text-align: center;*/
    /*}*/

</style>
