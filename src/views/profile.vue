<template>
  <div id="profile">
    <div id="cover">
      <img
        src="https://besthqwallpapers.com/img/original/111844/twitter-turquoise-logo-4k-turquoise-brickwall-twitter-logo-brands.jpg"
        alt="porfile cover photo"
      />
    </div>
    <div id="initilals"><h1>{{ user.username[0]}}</h1></div>

    <div id="details">
      <p id="username">{{ user.username }}</p>
      <button @click="edit">Edit</button>
      <p id="email">{{ user.email }}</p>
      <p id="bio">{{ user.bio }}</p>
    </div>
    <div id="options">
      <button @click="selectTweet"  v-bind:class=" { selection: tweetsSelection } ">Tweets</button>
      <button @click="selectFolowers" v-bind:class=" { selection: followersSelection } ">Followers</button>
      <button @click="selectFolowing" v-bind:class=" { selection: followingSelection } ">Follwing</button> 
    </div>

    <div v-if="tweetsSelection">
      <tweetDisplay  v-for="tweet in tweets" :key="tweet.id" :Tweet="tweet" />
      <h2 v-if="err">Something Went Wrong</h2>
    </div>
    <usersPage v-if="followersSelection"  :users= followers />
    <usersPage v-if="followingSelection"  :users= following />
    <navBar />

    
    
  </div>
</template>

<script>
import navBar from "../components/nav" 
import usersPage from "../components/users"
import tweetDisplay from "../components/tweet";
import axios from "axios";

export default {
  name: "profile-page",
  components: {
    tweetDisplay,
    usersPage,
    navBar
  },
  mounted() {
    axios
      .request({
        url: "https://tweeterest.ml/api/tweets",
        method: "GET",
        params: {
          userId: this.user.userId
        },
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
        }
      })
      .then(resonse => {
        this.tweets = resonse.data;
        this.err = false;
      })
      .catch(() => {
        this.err = true;
      });
  },
  data() {
    return {
      tweets: [],
      tweetsSelection : true,
      followersSelection : false,
      followingSelection : false,
      err: false
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    following(){
      return this.$store.state.followingUsers;
    },
     followers(){
      return this.$store.state.followersUsers;
    }
  },
  methods: {
    edit() {
      this.$router.push("/editProfile");
    },
    selectTweet(){
      this.tweetsSelection = true;
      this.followersSelection=false;
      this.followingSelection=false;
    },
    selectFolowers(){
      this.tweetsSelection = false;
      this.followersSelection=true;
      this.followingSelection=false;
    },
    selectFolowing(){
      this.tweetsSelection = false;
      this.followersSelection=false;
      this.followingSelection=true;
    }

  }
};
</script>

<style lang="scss" scoped>
#profile {
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
    button {
      border-radius: 50px;
      height: 5vh;
      width: 80%;
      font-size: 14px;
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

  #options {
    width: 100%;
    border-top: 2px solid #e1e8ed;
    button {
    font-family: "Dosis", sans-serif;
    font-size: 16px;
    width: 30%;
    background-color: white;
    border: 0px;
    
  }
  }
  
}
.selection {
      color: #1da1f2;
      border-bottom: 2px solid #1da1f2;
    }
</style>