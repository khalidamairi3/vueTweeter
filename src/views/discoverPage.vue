<template>
    <div id="discoverPage">
        <dicoverComponent/>

    </div>
</template>

<script>
import dicoverComponent from "../components/discover"
    export default {
        name: "dicover-page",
        components: {
            dicoverComponent,
        },

    }
</script>

<style lang="scss" scoped>

#discoverPage{
    width: 100%;
}

</style>