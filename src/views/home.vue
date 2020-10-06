<template>
    <div>
        <createTweet />
        <homeTweets/>

    </div>
</template>

<script>
import createTweet from "../components/createTweet";
import homeTweets from "../components/homeTweets";
    export default {
        name : "home-page",
        components:{
            homeTweets,
            createTweet
        }

    }
</script>

<style lang="scss" scoped>

</style>