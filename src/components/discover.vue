<template>
  <div>
    <p v-if="randomtweets.length == 0">There is no tweets to show</p>
    <tweetDisplay
      v-for="tweet in randomtweets"
      :key="tweet.tweetId"
      :Tweet="tweet"
    />
  </div>
</template>

<script>
import axios from "axios";
import tweetDisplay from "./tweet";
const delay = ms => new Promise(res => setTimeout(res, ms));
export default {
  name: "discover-component",
  components: {
    tweetDisplay
  },
  computed: {
    otherUsers() {
      return this.$store.getters.notFollowing;
    }
  },
  async mounted() {
    if (this.otherUsers.length == 0) {
      await delay(600);
    }
    this.getRandomTweets();
  },
  methods: {
    getRandomTweets() {
      for (let i = 0; i < this.otherUsers.length; i++) {
        axios
          .request({
            url: "https://tweeterest.ml/api/tweets",
            method: "GET",
            params: {
              userId: this.otherUsers[i].userId
            },
            headers: {
              "Content-Type": "application/json",
              "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
            }
          })
          .then(response => {
            if (response.data.length > 0)
              this.randomtweets.push(
                response.data[Math.floor(Math.random() * response.data.length)]
              );
          })
          .catch(() => {});
      }
    }
  },
  data() {
    return {
      randomtweets: []
    };
  }
};
</script>

<style lang="sass" scoped>

</style>