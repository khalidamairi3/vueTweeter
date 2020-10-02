<template>
  <div>
    <h1 @click="slectUser(tweet.userId)">{{ tweet.username }}</h1>
    <h2>{{ tweet.createdAt }}</h2>
    <h3>{{ tweet.content }}</h3>

    <div v-if="isuser">
      <button v-if="!toEdit" @click="toEdit = true">Edit</button>
      <button @click="Delete(tweet.tweetId)">Delete</button>
    </div>
    <div v-if="toEdit">
      <textarea
        cols="30"
        rows="10"
        v-model="content"
      ></textarea>
      <button @click="edit(tweet.tweetId, content)">Edit</button>
      <h3 v-if="err"> the tweet has a limit of 200 characters </h3>
    </div>
    <p v-if="!viewComments" @click="viewComments = true"> view comments</p>
    <p v-if="viewComments" @click="viewComments = false"> hide comments</p>
    <tweetComments v-if="viewComments"/>
    
  </div>
</template>

<script>
import tweetComments from "./comments"
import axios from "axios";
import cooikes from "vue-cookies";

export default {
  name: "tweet-display",
  components: {
      tweetComments,
  },
  props: {
    Tweet: {
      type: Object,
      required: true
    }
  },
  mounted() {
    if (this.user.userId == this.tweet.userId) 
    this.isuser = true;
  },
  data() {
    return {
      tweet:this.Tweet,
      isuser: false,
      toEdit: false,
      content: "",
      viewComments:false,
      err:false
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    selectUser(userId) {
      this.$store.commit("userToShow", userId);
    },
    edit(tweetId, content) {
      axios.request({
        url: "https://tweeterest.ml/api/tweets",
        method: "PATCH",
        data: {
          loginToken: cooikes.get("token"),
          tweetId: tweetId,
          content: content
        },
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
        }
      }).then((response)=>{
          this.tweet=response.data
          this.err = false;
          this.toEdit =false;
      }).catch(()=>{
          this.err =true;
      });
    },
    Delete(tweetId){

        axios.request({
            url:"https://tweeterest.ml/api/tweets",
            method:"DELETE",
            data:{
                loginToken: cooikes.get("token"),
                tweetId:tweetId
            },
             headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
          }
        }).then(()=>{

        }).catch(()=>{})
    }
  }
};
</script>

<style scoped>
</style>