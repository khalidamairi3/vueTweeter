<template>
  <div id="messages">
    <navBar />
    <div v-if="chat" id="messages-view">
      <h3 v-if="chat.userId == userId" class="ChatHeader">
        {{ chat.messager_username }}
      </h3>
      <h3 v-if="chat.userId != userId" class="ChatHeader">
        {{ chat.username }}
      </h3>
      <h2 style="text-align:center" v-if="messages.length == 0"> There is no previous messages, Say Hi</h2>
      <messageItem
        v-for="message in messages"
        :key="message.messageId"
        :message="message"
      />
      <div id="addMessage">
        <textarea v-model="content" placeholder="send a messgae">
            Send a message </textarea>
        <i style="cursor:pointer"
          @click="postMessage(chat.chatId, content)"
          id="toMessage"
          class="fas fa-2x fa-chevron-circle-right"
        ></i>
      </div>
    </div>

    <addsPage />
  </div>
</template>

<script>
import addsPage from "../components/adds";
import cookies from "vue-cookies";
import axios from "axios";
import navBar from "../components/nav";
import messageItem from "../components/message";
const wait = ms => new Promise(res => setTimeout(res, ms));
export default {
  name: "messages-view",
  components: {
    navBar,
    messageItem,
    addsPage,
  },
  async mounted() {
      if (this.user.userId == undefined && cookies.get("token") != undefined) {
      this.$store.dispatch("restart");
       await wait(1000)
      this.tweetsReady = true;
    } else if (cookies.get("token") == undefined) {
      this.$router.push("/signin");
    } else {
      this.$store.dispatch("getNotifications");
    }
      let load =true
      while (load==true){
          this.getMessages();
          await wait(300000);
      }
      
          

      
    
  },
  data() {
    return {
      messages: [],
      userId: cookies.get("userId"),
      content: "",
      disable:false,
    };
  },
  computed: {
    chatId() {
      return this.$store.state.selectedChat;
    },
    chat() {
      return this.$store.getters.selectedChatDetails;
    },
     user() {
      return this.$store.state.user;
    },
  },
  methods: {
    getMessages() {
        if(cookies.get("token") != undefined && cookies.get("selectedChat") != undefined && this.$route.name == "messages-page"){
      axios
        .request({
          url: "https://tweeeter.ml/api/messages",
          method: "GET",
          params: {
            chatId: this.chatId,
          },
          headers: {
            "Content-Type": "application/json",
            loginToken: cookies.get("token"),
          },
        })
        .then((response) => {
          this.messages = response.data;
        })
        .catch(() => {
          alert("Somthing went wrong");
        });
        }
    },
    postMessage(chatId,content){
        if (this.disable)
        return
        this.disable=true
        axios
        .request({
          url: "https://tweeeter.ml/api/messages",
          method: "POST",
          data: {
            chatId:chatId,
            message:content,
            loginToken: cookies.get("token"),
          },
          headers: {
            "Content-Type": "application/json",
            
          },
        })
        .then((response) => {
          this.disable = false;
          this.messages.push(response.data);
          this.content="";
          
        })
        .catch(() => {
            this.disable=false
          alert("Somthing went wrong");
        });

    }
  },
};
</script>

<style lang="scss" scoped>
.ChatHeader {
  border-bottom: 1px solid #aab8c2;
}

#messages-view {
  width: 90%;
  height: fit-content;
  display: grid;
}

#addMessage{
  margin-top: 2vh;
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 8.5fr 1.5fr;
}

textarea {
    width: 95%;
    background-color: #f5f8fa;
    border-radius: 15px 15px 15px 15px;
  }
#toMessage {
    color: #1da1f2;
  }
</style>