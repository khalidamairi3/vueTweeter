<template>
  <div>
    <h1>{{ user.username }}</h1>
    <h1>{{ user.email }}</h1>
    <h1>{{ user.bio }}</h1>

    <tweetDisplay v-for="tweet in tweets" :key="tweet.id" :Tweet = tweet />

    <h2 v-if="err"> Somthing went Wrong while downloading the tweets</h2>


  </div>
</template>

<script>
import axios from "axios";
import tweetDisplay from "../components/tweet";

export default {
  name: "user-profile",
  components: {
      tweetDisplay,
  },
  mounted() {
    axios.request({
      url: "https://tweeterest.ml/api/tweets",
      method: "GET",
      data: {
        userId: this.userId
      },
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
      }
    }).then((response)=>{
        this.tweets=this.tweets.concat(response.data);
        this.err =false
    }).then(()=>{
        this.err=true
    });
  },
  data() {
    return {
      tweets: [],
      err:false
    };
  },
  computed: {
    userId() {
      return this.$store.state.selectedUser;
    }
  }
};
</script>

<style scoped>
</style>