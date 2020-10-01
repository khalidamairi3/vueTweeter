<template>
    <div>
        <h1 @click="slectUser(user)"> {{ tweet.username }} </h1>
        <h2> {{ tweet.createdAt}}</h2>
        <h3> {{ tweet.content }}</h3>

    </div>
</template>

<script>
    export default {
        name:"tweet-display",
        props:{
            tweet : {
                type : Object,
                required : true,
            }
        },
        methods: {
            selectUser(user) {

                this.$store.commit("userToShow",user);
                
            }
        },
    }
</script>

<style scoped>

</style>