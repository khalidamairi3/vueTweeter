<template>
  <div>
      <commentDisplay v-for="comment in comments" :key="comment.commentId" :comment = comment />
  </div>
</template>

<script>
import axios from "axios";
import commentDisplay from "./comment.vue";
export default {
  name: "tweet-comments",
  components: {
      commentDisplay,
  },
  props: {
    tweetId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      comments: []
    };
  },
  mounted() {
    axios.request({
      url: "https://tweeterest.ml/api/comments",
      method: "GET",
      data: {
        tweetId: this.tweetId
      },
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
      }
    }).then((response)=>{
        this.comments = response.data

    }).catch(()=>{

    });
  }
};
</script>

<style lang="sass" scoped>

</style>