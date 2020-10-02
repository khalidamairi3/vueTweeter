<template>
  <div>
    <h1>{{ user.username }}</h1>
    <h1>{{ user.email }}</h1>
    <h1>{{ user.bio }}</h1>

    <button @click="follow(user)" v-if="!isfollowed">follow</button>
    <button @click="unfollow(user)" v-if="isfollowed">unfollow</button>

    <tweetDisplay v-for="tweet in tweets" :key="tweet.id" :Tweet="tweet" />

    <h2 v-if="err">Somthing went Wrong while downloading the tweets</h2>
  </div>
</template>

<script>
import axios from "axios";
import tweetDisplay from "../components/tweet";
import cookies from "vue-cookies";

export default {
  name: "user-profile",
  components: {
    tweetDisplay
  },
  mounted() {
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
        
    }).catch(()=>{});
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
      .then(() => {
        this.err = true;
      });
  },
  data() {
    return {
      tweets: [],
      err: false,
      user: {}
    };
  },
  computed: {
    userId() {
      return this.$store.state.selectedUser;
    },
    isfollowed() {
      return this.$store.getters.checkFollowing;
    }
  },
  methods: {
    follow(user) {
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
        })
        .catch(() => {});
    },
    unfollow(user) {
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
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
</style>