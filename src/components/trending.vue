<template>
  <div>
    <tweetDisplay v-for="tweet in tweets" :key="tweet.tweetId" :Tweet="tweet" />
  </div>
</template>

<script>
import axios from "axios";
// import cookies from "vue-cookies"
import tweetDisplay from "./tweet";
export default {
  name: "trending-page",
  components: {
    tweetDisplay
  },
  mounted() {
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
              console.log(this.tweets[i]);
              if(i==this.tweets.length){
                  this.tweets.sort((a,b)=>{
                      return (a.likes < b.likes) ? 1 : -1;
                  });
              }
              console.log(this.tweets);
            })
            .catch(() => {});
        }
      })
      .catch(() => {});
  },
  data() {
    return {
      tweets: []
    };
  }
};
</script>

<style lang="scss" scoped>
</style>