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
          url: "http://127.0.0.1:5000/api/tweets",
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
  
  width: 90%;
  display: grid;
  margin-left:5%;
  textarea {
    background-color: #f5f8fa;
    background-image: url("data:image/jpeg;base64,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");
    background-position: center;
    background-size: 28%;
    font-size: 18px;

  }
  button {
    width: 25%;
    position: relative;
    bottom: 3vh;
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