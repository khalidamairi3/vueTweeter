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
#cover {
    img {
      width: 100%;
      height: 25vh;
      object-fit: cover;
    }
  }
  #initilals {
    position: relative;
    bottom: 5.5vh;
    width: 10vh;
    height: 10vh;
    border: 1px solid #e1e8ed;
    text-align: center;
    // padding-top: 10%;
    z-index: 5;
    background-color: #e1e8ed;
    border-radius: 200px 200px 200px 200px;
    margin-left: 41%;
    h1 {
      font-size: 24px;
      letter-spacing: 0.5vw;
    }
  }
  #details {
    position: relative;
    bottom: 10vh;
    display: grid;
    grid-template-columns: 3fr 1fr;
    #username {
      margin-left: 3vw;
      font-weight: bolder;
    }
    #email,
    #bio {
      grid-column: span 2;
      margin-left: 3vw;
    }
    .unfollow{
       border: 1px solid  #1da1f2;
      color: white;
      background-color:  #1da1f2;
      &:hover {
        background-color: #e1e8ed;
        color: #1da1f2;
        transition: all 0.2s ease-in;
      }
      

    }
    button {
      border-radius: 50px;
      height: 5vh;
      width: 80%;
      font-size: 14px;
      text-align: center;
      font-weight: bold;
      border: 1px solid #e1e8ed;
      color: #657786;
      background-color: white;
      &:hover {
        background-color: #1da1f2;
        color: white;
        transition: all 0.2s ease-in;
      }
    }
    }
</style>