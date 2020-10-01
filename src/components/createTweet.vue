<template>
  <div>
    <textarea
      placeholder="write your tweet"
      cols="30"
      rows="10"
      v-model="content"
    ></textarea>
    <button @click="tweet(content)">tweet</button>
    <h2 v-if="err"> tweet has a limit of 200 characters</h2>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "create-tweet",
  data() {
    return {
      content: "",
      err: false
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    tweet(content) {
      axios.request({
        url: "https://tweeterest.ml/api/tweets",
        method: "POST",
        data: {
          loginToken: cookies.get("token"),
          content: content
        },
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
        }
      }).then(()=>{
          this.err=false
          this.$router.push("/");

      }).catch(()=>{
          this.err = true;
      });
    }
  }
};
</script>

<style lang="sass" scoped>

</style>