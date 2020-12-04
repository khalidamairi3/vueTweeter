<template>
  <div id="replies">
    <p v-if="comments.length == 0">There is no replies to show</p>
    <nestedComment 
      v-for="comment in comments"
      :key="comment.commentId"
      :comment="comment"
    />
    <div id="addReply">
      <textarea v-model="content" placeholder="add a reply">
  Add a reply </textarea
      >
      <i
        style="cursor:pointer"
        @click="postComment(commentId, content)"
        id="toReply"
        class="fas fa-2x fa-chevron-circle-right"
      ></i>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import nestedComment from "./nestedComment";
export default {
  name: "nested-comments",
  components: {
    nestedComment,
  },
  props: {
    commentId: {
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
          url: "https://tweeeter.ml/api/comments",
          method: "GET",
          params: {
            commentId: this.commentId
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
          url: "https://tweeeter.ml/api/comments",
          method: "POST",
          data: {
            loginToken: cookies.get("token"),
            commentId: id,
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
#replies {
  grid-column: span 3;
  width: 90%;
  justify-self: center;
  background-color: #f5f8fa;
  textarea {
    width: 95%;
    background-color: #f5f8fa;
    border-radius: 15px 15px 15px 15px;
  }
  #toReply {
    color: #1da1f2;
  }
}
#addReply {
  margin-top: 2vh;
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 8.5fr 1.5fr;
}
</style>