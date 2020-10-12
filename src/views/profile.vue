<template>
  <div id="profile">
    <div id="cover">
      <img
        src="https://besthqwallpapers.com/img/original/111844/twitter-turquoise-logo-4k-turquoise-brickwall-twitter-logo-brands.jpg"
        alt="porfile cover photo"
      />
    </div>
    <div id="initilals">
      <h1 v-if="user.username != undefined">{{ user.username[0] }}</h1>
    </div>

    <div id="details">
      <p id="username">{{ user.username }}</p>
      <button @click="edit">Edit</button>
      <p id="email">{{ user.email }}</p>
      <p id="bio">{{ user.bio }}</p>
    </div>
    <div id="options">
      <button
        @click="selectTweet"
        v-bind:class="{ selection: tweetsSelection }"
      >
        Tweets
      </button>
      <button
        @click="selectFolowers"
        v-bind:class="{ selection: followersSelection }"
      >
        Followers
      </button>
      <button
        @click="selectFolowing"
        v-bind:class="{ selection: followingSelection }"
      >
        Follwing
      </button>
    </div>

    <div v-if="tweetsSelection">
      <p v-if="tweets.length==0"> Thee is no tweets to show</p>
      <tweetDisplay v-for="tweet in tweets" :key="tweet.id" :Tweet="tweet" />
      <h2 v-if="err">Something Went Wrong</h2>
    </div>
    <usersPage v-if="followersSelection" :users="followers" />
    <usersPage v-if="followingSelection" :users="following" />
    <navBar />
  </div>
</template>

<script>
import cookies from "vue-cookies";
import navBar from "../components/nav";
import usersPage from "../components/users";
import tweetDisplay from "../components/tweet";
import axios from "axios";
const delay = ms => new Promise(res => setTimeout(res, ms));

export default {
  name: "profile-page",
  components: {
    tweetDisplay,
    usersPage,
    navBar
  },
  async mounted() {
    if (this.user.userId == undefined && cookies.get("token") != undefined) {
      this.$store.dispatch("restart");
      await delay(500);
    } else if (cookies.get("token") == undefined) {
      this.$router.push("/signin");
    }
    this.getTweets();
  },
  data() {
    return {
      tweets: [],
      tweetsSelection: true,
      followersSelection: false,
      followingSelection: false,
      err: false
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    following() {
      return this.$store.state.followingUsers;
    },
    followers() {
      return this.$store.state.followersUsers;
    }
  },
  methods: {
    getTweets() {
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
    edit() {
      this.$router.push("/editProfile");
    },
    selectTweet() {
      this.tweetsSelection = true;
      this.followersSelection = false;
      this.followingSelection = false;
    },
    selectFolowers() {
      this.tweetsSelection = false;
      this.followersSelection = true;
      this.followingSelection = false;
    },
    selectFolowing() {
      this.tweetsSelection = false;
      this.followersSelection = false;
      this.followingSelection = true;
    }
  }
};
</script>

<style lang="scss" scoped>
#profile {

  
}

</style>