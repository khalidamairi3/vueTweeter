<template>
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
    <div id="initilals" v-if="user.username"><h1>{{ user.username[0]}}</h1></div>

    <div id="details">
      <p id="username">{{ user.username }}</p>
      <button  class="follow" @click="follow(user)" v-if="!isfollowed" :disabled="disable">Follow</button>
    <button class="unfollow" @click="unfollow(user)" v-if="isfollowed" :disabled="disable">Unfollow</button>
      <p id="email">{{ user.email }}</p>
      <p id="bio">{{ user.bio }}</p>
    </div>
    

    
    <p v-if="tweets.length==0"> There is no tweets to show </p>
    <tweetDisplay v-for="tweet in tweets" :key="tweet.id" :Tweet="tweet" />

    <h2 v-if="err">Somthing went Wrong while downloading the tweets</h2>
    <navBar/>
  </div>
</template>

<script>
import navBar from "../components/nav" 
import axios from "axios";
import tweetDisplay from "../components/tweet";
import cookies from "vue-cookies";
const delay = ms => new Promise(res => setTimeout(res, ms));
export default {
  name: "user-profile",
  components: {
    tweetDisplay,
    navBar
  },
  async mounted() {
    if (this.myUser.userId == undefined && cookies.get("token") != undefined) {
      this.$store.dispatch("restart");
      await delay(800);
      
    } else if (cookies.get("token") == undefined) 
    this.$router.push("/signin");
    this.getUserDetails();
    this.getTweets();
    
   
  },
  data() {
    return {
      tweets: [],
      err: false,
      userErr:false,
      disable:false,
      user: {}
    };
  },
  computed: {
    userId() {
      return this.$store.state.selectedUser;
    },
    myUser(){
      return this.$store.state.user
    },
    isfollowed() {
      return this.$store.getters.checkFollowing;
    }
  },
  methods: {
    getUserDetails(){
      axios.request({
      url: "https://tweeterest.ml/api/users",
      method: "GET",
      params: {
        userId: this.userId
      },
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
      }
    }).then((response)=>{
        this.user=response.data[0];
        this.userErr=false;
        
    }).catch(()=>{
      this.userErr=true;
    });
    },
    getTweets(){
       axios
      .request({
        url: "https://tweeterest.ml/api/tweets",
        method: "GET",
        params: {
          userId: this.userId
        },
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
        }
      })
      .then(response => {
        this.tweets = this.tweets.concat(response.data);
        this.err = false;
      })
      .catch(() => {
        this.err = true;
      });
    },
    follow(user) {
      this.disable=true;
      axios
        .request({
          url: "https://tweeterest.ml/api/follows",
          method: "POST",
          data: {
            loginToken: cookies.get("token"),
            followId: user.userId
          },
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
          }
        })
        .then(()=> {
          this.$store.commit("addFollowing", user);
          this.disable=false;
        })
        .catch(() => { 
          alert("Somthing went wrong in following this user");
          this.disable=false;
        });
    },
    unfollow(user) {
      this.disable=true;
      axios
        .request({
          url: "https://tweeterest.ml/api/follows",
          method: "DELETE",
          data: {
            loginToken: cookies.get("token"),
            followId: user.userId
          },
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
          }
        })
        .then(() => {
          this.$store.commit("removeFollowing", user);
          this.disable=false;
        })
        .catch(() => {
          alert("Somthing went wrong in unfollowing this user");
          this.disable=false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>