<template>
  <div id="chats-view">
    <navBar />
    <div id="chats">
      <img
        src="https://media1.s-nbcnews.com/i/newscms/2020_32/3402979/200807-signal-app-mn-1410_7e271015d9092f1300a2fc906422ee16.jpg"
        alt=""
      />
      <h4 style="text-align: center" v-if="chats.length == 0">
        you have no chats yet
      </h4>
      <chatItem v-for="chat in chats" :key="chat.chatId" :chat="chat" />
    </div>

    <addsPage />
  </div>
</template>

<script>
import addsPage from "../components/adds";
import cookies from "vue-cookies";
import navBar from "../components/nav";
import chatItem from "../components/chat";
export default {
  name: "chats-view",
  components: {
    addsPage,
    navBar,
    chatItem,
  },
  mounted() {
    if (this.user.userId == undefined && cookies.get("token") != undefined) {
      this.$store.dispatch("restart");
      this.tweetsReady = true;
    } else if (cookies.get("token") == undefined) {
      this.$router.push("/signin");
    } else {
      this.$store.dispatch("getNotifications");
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    chats() {
      return this.$store.state.chats;
    },
  },
};
</script>

<style lang="scss" scoped>
#chats {
  img {
    width: 100%;
    max-height: 35vh;
    object-fit: fill;
  }
}
</style>