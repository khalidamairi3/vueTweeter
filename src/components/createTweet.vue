<template>
  <div id="createTweet">
    <textarea
      placeholder="write your tweet"
      cols="30"
      rows="5"
      v-model="content"
    ></textarea>
    <button :disabled="disable" @click="tweet(content)">Tweet</button>
    <p v-if="err">tweet has a limit of 200 characters</p>
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
      err: false,
      disable: false
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    tweet(content) {
      this.disable = true;
      axios
        .request({
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
        })
        .then(response => {
          this.disable = false;
          this.err = false;
          this.$root.$emit("newTweet", response.data);
        })
        .catch(() => {
          this.disable = false;
          this.err = true;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#createTweet {
  display: grid;
  textarea {
    background-color: #f5f8fa;
  }
  button {
    width: 25%;
    position: relative;
    margin-top: 1vh;
    left: 75%;
    float: right;
    color: white;
    background-color: #1da1f2;
    border-radius: 15px;
    border: 1px solid #1da1f2;
    &:hover {
      border: 1px solid #1da1f2;
      background-color: white;
      color: #1da1f2;
      transition: all 0.2s ease-in;
      box-shadow: 2px 2px #92b4a7;
    }
  }
}
</style>