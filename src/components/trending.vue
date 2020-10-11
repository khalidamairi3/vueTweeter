<template>
  <div>
    <p v-if="tweets.length == 0">There is no tweets to show</p>
    <tweetDisplay v-for="tweet in tweets" :key="tweet.tweetId" :Tweet="tweet" />
  </div>
</template>

<script>
import axios from "axios";
import tweetDisplay from "./tweet";
export default {
  name: "trending-page",
  components: {
    tweetDisplay
  },
  mounted() {
    this.getTrendingTweets();
  },
  data() {
    return {
      tweets: []
    };
  },
  methods: {
    getTrendingTweets() {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweets",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
          }
        })
        .then(response => {
          this.tweets = response.data;
          for (let i = 0; i < this.tweets.length; i++) {
            axios
              .request({
                url: "https://tweeterest.ml/api/tweet-likes",
                method: "GET",
                params: {
                  tweetId: this.tweets[i].tweetId
                },
                headers: {
                  "Content-Type": "application/json",
                  "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
                }
              })
              .then(response => {
                this.tweets[i].likes = response.data.length;

                if (i == this.tweets.length - 1) {
                  this.tweets.sort((a, b) => {
                    return b.likes - a.likes;
                  });
                }
              })
              .catch(() => {
                alert("Somthing went Wrong");
              });
          }
        })
        .catch(() => {
          alert("Somthing went Wrong");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>