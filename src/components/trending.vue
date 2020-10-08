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
        // console.log(this.tweets.length);

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

              if(i==this.tweets.length-1){
               
                 this.sortTweets();
                 
              }
              
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
  },
  methods: {
      sortTweets() {
     
           this.tweets=this.tweets.sort((a,b)=>{
               return b.likes - a.likes;
          
      })}
  },
};
</script>

<style lang="scss" scoped>
</style>