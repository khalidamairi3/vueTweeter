<template>
    <div id="chat">
        <h4 v-if="chat.userId != currentUser "> {{ chat.username }} </h4>
        <h4 v-if="chat.messagerId != currentUser "> {{ chat.messager_username }} </h4>
            <p @click="selectChat(chat.chatId)"> click here to view messages </p>
    </div>
</template>

<script>
import cookies from "vue-cookies"
    export default {
        name:"chat-item",
        props: {
            chat: {
                type: Object,
                required : true
            },
        },
        data() {
            return {
                currentUser: cookies.get("userId")
            }
        },
        methods: {
            selectChat(chatId) {
                this.$store.commit("chatToShow", chatId);
                cookies.set("selectedChat", chatId);
                this.$router.push("/messages");
                
            }
        },
        
    }
</script>

<style lang="scss" scoped>
#chat{

    border-top: 1px solid #aab8c2;
    height: fit-content;

}

p{
    &:hover{
        color:  #1da1f2;
        cursor: pointer;
    }

}

</style>