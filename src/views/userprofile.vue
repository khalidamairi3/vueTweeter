// this componet to show other users' profile
<template>
  <div id="userProfile">
    <navBar />
    <div>
      <div id="cover">
        <img
          src="https://besthqwallpapers.com/img/original/111844/twitter-turquoise-logo-4k-turquoise-brickwall-twitter-logo-brands.jpg"
          alt="porfile cover photo"
        />
      </div>
      <p v-if="userErr">
        Something went wong while loading user Info
      </p>

      <div id="details">
        <div>
          <p id="username">{{ user.username }}</p>
            <p id="email">{{ user.email }}</p>
        <p id="bio">{{ user.bio }}</p>
        </div>
        
        <div >
          <button style="margin: 3vh 0vh"
          class="follow"
          @click="follow(user)"
          v-if="!isfollowed"
          :disabled="disable"
        >
        Follow
        </button>
        <button
          class="unfollow"
          @click="unfollow(user)"
          v-if="isfollowed"
          :disabled="disable"
        >
          Unfollow
        </button>

        <button
          class="follow"
          @click="openChat()"
          
        >
        Message
        </button>


        </div>
        

       
      </div>

      <div class="userDisplay">
        <p v-if="tweets.length == 0">There is no tweets to show</p>
        <tweetDisplay v-for="tweet in tweets" :key="tweet.id" :Tweet="tweet" />

        <h2 v-if="err">Somthing went Wrong while downloading the tweets</h2>
      </div>
    </div>
    <addsPage />
  </div>
</template>

<script>
import addsPage from "../components/adds";
import navBar from "../components/nav";
import axios from "axios";
import tweetDisplay from "../components/tweet";
import cookies from "vue-cookies";
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
export default {
  name: "user-profile",
  components: {
    tweetDisplay,
    navBar,
    addsPage,
  },
  async mounted() {
    // in case of refresh restore the data in vuex and wait for sometime so changes can be reflected in the component
    if (this.myUser.userId == undefined && cookies.get("token") != undefined) {
      this.$store.dispatch("restart");
      await delay(800);
    }
    // if the user is not logged in
    else if (cookies.get("token") == undefined) {
      this.$router.push("/signin");
    }
    this.getUserDetails();
    this.getTweets();
    this.$store.dispatch("getNotifications");
  },
  data() {
    return {
      tweets: [],
      err: false,
      userErr: false,
      disable: false,
      user: {},
    };
  },
  computed: {
    // the user Id of the user to e shown
    userId() {
      return this.$store.state.selectedUser;
    },
    myUser() {
      return this.$store.state.user;
    },
    isfollowed() {
      return this.$store.getters.checkFollowing;
    },
    userChat(){
      return this.$store.getters.chatForUser;
    }
  },
  methods: {
    openChat(){
      if(this.userChat != false){
      cookies.set("selectedChat",this.userChat.chatId);
      this.$store.commit("chatToShow", this.userChat.chatId);
      this.$router.push("/messages")
      
      }
      else{
        console.log("hi");
        axios.request({
          url:"http://127.0.0.1:5000/api/chats",
          method: "POST",
          data:{
            loginToken:cookies.get("token"),
            messagerId: this.userId
          }
        }).then((response=>{

        cookies.set("selectedChat",response.data.chatId);
        this.$store.commit("chatToShow", response.data.chatId);
        this.$store.dispatch("getChats")
        this.$router.push("/messages")




        })).catch(()=>{})
        






      }


    },
    getUserDetails() {
      axios
        .request({
          url: "http://127.0.0.1:5000/api/users",
          method: "GET",
          params: {
            userId: this.userId,
          },
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67",
          },
        })
        .then((response) => {
          this.user = response.data[0];
          this.userErr = false;
        })
        .catch(() => {
          this.userErr = true;
        });
    },
    getTweets() {
      axios
        .request({
          url: "http://127.0.0.1:5000/api/tweets",
          method: "GET",
          params: {
            userId: this.userId,
          },
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67",
          },
        })
        .then((response) => {
          this.tweets = this.tweets.concat(response.data);
          this.err = false;
        })
        .catch(() => {
          this.err = true;
        });
    },
    follow(user) {
      this.disable = true;
      axios
        .request({
          url: "http://127.0.0.1:5000/api/follows",
          method: "POST",
          data: {
            loginToken: cookies.get("token"),
            followId: user.userId,
          },
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67",
          },
        })
        .then(() => {
          this.$store.commit("addFollowing", user);
          this.disable = false;
        })
        .catch(() => {
          alert("Somthing went wrong in following this user");
          this.disable = false;
        });
    },
    unfollow(user) {
      this.disable = true;
      axios
        .request({
          url: "http://127.0.0.1:5000/api/follows",
          method: "DELETE",
          data: {
            loginToken: cookies.get("token"),
            followId: user.userId,
          },
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67",
          },
        })
        .then(() => {
          this.$store.commit("removeFollowing", user);
          this.disable = false;
        })
        .catch(() => {
          alert("Somthing went wrong in unfollowing this user");
          this.disable = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#options{
  display: grid;
  grid-row: span2;
  row-gap: 5vh;
}
</style>