<template>
  <div id="comments">
    <p v-if="comments.length == 0">There is no comments to show</p>
    <commentDisplay
      v-for="comment in comments"
      :key="comment.commentId"
      :comment="comment"
    />
    <div id="addComment">
      <textarea v-model="content" placeholder="add a comment">
  Add a comment </textarea
      >
      <i
        @click="postComment(tweetId, content)"
        id="toComment"
        class="fas fa-2x fa-chevron-circle-right"
      ></i>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import commentDisplay from "./comment.vue";
export default {
  name: "tweet-comments",
  components: {
    commentDisplay
  },
  props: {
    tweetId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      comments: [],
      content: "",
      disable: ""
    };
  },
  mounted() {
    this.getComments();
  },
  methods: {
    getComments() {
      axios
        .request({
          url: "https://tweeterest.ml/api/comments",
          method: "GET",
          params: {
            tweetId: this.tweetId
          },
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
          }
        })
        .then(response => {
          this.comments = response.data;
        })
        .catch(() => {
          alert("Something went Wrong");
        });
    },
    postComment(id, content) {
      if (this.disable) {
        return;
      }
      this.disable = true;
      axios
        .request({
          url: "https://tweeterest.ml/api/comments",
          method: "POST",
          data: {
            loginToken: cookies.get("token"),
            tweetId: id,
            content: content
          },
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
          }
        })
        .then(response => {
          this.disable = false;
          this.comments.push(response.data);
        })
        .catch(() => {
          this.disable = false;
          alert("Something went wrong");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#comments {
  grid-column: span 3;
  width: 100%;
  background-color: #f5f8fa;
  textarea {
    width: 95%;
    background-color: #f5f8fa;
    border-radius: 15px 15px 15px 15px;
  }
  #toComment {
    color: #26547c;
  }
}
#addComment {
  margin-top: 2vh;
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 8.5fr 1.5fr;
}
</style>