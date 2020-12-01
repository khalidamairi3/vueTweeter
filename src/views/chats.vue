<template>
    <div id="chats-view">
        <navBar />
        <div id="chats">
            <img src="https://media1.s-nbcnews.com/i/newscms/2020_32/3402979/200807-signal-app-mn-1410_7e271015d9092f1300a2fc906422ee16.jpg" alt="">
            <chatItem v-for="chat in chats" :key="chat.chatId" :chat= chat />
        </div>

        <addsPage />

    </div>
</template>

<script>
import addsPage from "../components/adds"
// import cookies from "vue-cookies";
import navBar from "../components/nav";
import chatItem from "../components/chat"
    export default {
        name:"chats-view",
        components: {
            addsPage,
            navBar,
            chatItem
        },
        computed: {
            chats() {
                return this.$store.state.chats; 
            }
        },
    }
</script>

<style lang="scss" scoped>
#chats{
    display: grid;
    grid-template-rows: 1fr 3fr;
    
    img{
        width: 100%;
        max-height: 35vh;
        object-fit: fill;

    }
}

</style>