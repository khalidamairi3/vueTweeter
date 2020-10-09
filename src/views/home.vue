<template>
    <div id="home">
        <createTweet />
        <homeTweets/>
        <navBar />

    </div>
</template>

<script>
import navBar from "../components/nav"
import createTweet from "../components/createTweet";
import homeTweets from "../components/homeTweets";
    export default {
        name : "home-page",
        components:{
            homeTweets,
            createTweet,
            navBar
        }

    }
</script>

<style lang="scss" scoped>
#home{
    width: 100%;
}

</style>