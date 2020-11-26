<template>
  <div id="HomeTweets">
    <h2 v-if="tweets.length == 0">you have no tweets to display</h2>
    <tweetDisplay v-for="tweet in tweets" :key="tweet.tweetId" :Tweet="tweet" />
  </div>
</template>

<script>
import axios from "axios";
import tweetDisplay from "./tweet.vue";
const delay = ms => new Promise(res => setTimeout(res, ms));
export default {
  name: "home-tweets",
  components: {
    tweetDisplay
  },
  data() {
    return {
      tweets: []
    };
  },
  async mounted() {
    await delay(500);
    this.getFollowingTweets();
    this.$root.$on("newTweet", this.addTweet);
  },
  computed: {
    followingUsers() {
      return this.$store.state.followingUsers;
    },
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    addTweet(tweet) {
      this.tweets.unshift(tweet);
    },
    getFollowingTweets() {
      let users = this.followingUsers;

      users = users.concat(this.user);

      for (let i = 0; i < users.length; i++) {
        axios
          .request({
            url: "http://127.0.0.1:5000/api/tweets",
            method: "GET",
            params: {
              userId: users[i].userId
            },
            headers: {
              "Content-Type": "application/json",
              "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
            }
          })
          .then(response => {
            this.tweets = this.tweets.concat(response.data);
            
            if(i==users.length-1){
              this.tweets=this.tweets.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

            }
          })
          .catch(() => {
            alert("Somthing went Wrong");
          });
      }
    }
  }
};
</script>

<style lang="sass" scoped>


</style>