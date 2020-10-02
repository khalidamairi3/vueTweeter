<template>
  <div>
    <deleteProfile />

    <editProfile />
    <h1>{{ user.username }}</h1>
    <h1>{{ user.email }}</h1>
    <h1>{{ user.bio }}</h1>
    <tweetDisplay v-for="tweet in tweets" :key="tweet.id" :Tweet = tweet />
    <h2 v-if="err"> Something Went Wrong</h2>
  </div>
</template>

<script>
import editProfile from "../components/editProfile";
import deleteProfile from "../components/deleteProfile";
import tweetDisplay from "../components/tweet";
import axios from "axios";
export default {
  name: "profile-page",
  components: {
    editProfile,
    deleteProfile,
    tweetDisplay
  },
  mounted() {
    axios.request({
      url: "https://tweeterest.ml/api/tweets",
      method: "GET",
      params: {
        userId: this.user.userId
      },
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
      }
    }).then((resonse)=>{
      this.tweets =resonse.data
      this.err = false
    }).catch(()=>{
      this.err = true;
    });
  },
  data() {
    return {
      tweets: [],
      err:false
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>

<style lang="sass" scoped>

</style>