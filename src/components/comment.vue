<template>
  <div>
    <h2>{{ comment.username }}</h2>
    <h2>{{ comment.createdAt }}</h2>
    <h2>{{ comment.content }}</h2>

    <div v-if="user.userId == comment.userId">
      <button @click="edit">Edit</button>
      <button @click="Delete(comment.commentId)">Delete</button>
    </div>
    <div v-if="editComment">
      <textarea cols="30" rows="10" v-model="content"></textarea>
      <button @click="updateComment(comment.commentId, content)">
        Update
      </button>
      <h4 v-if="err"> the comment is too long </h4>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "comment-display",
  props: {
    commment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editComment: false,
      content: "",
      err:false
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    edit() {
      this.editComment = true;
    },
    updateComment(id, content) {
      axios.request({
        url: "https://tweeterest.ml/api/comments",
        method: "PATCH",
        data: {
          loginTonken: cookies.get("token"),
          commmentId: id,
          content: content
        },
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
        }
      }).then((response)=>{
          this.commment = response.data;
          this.editComment = false;
          this.err=false
      }).catch(()=>{
          this.err =true

      });
    },
    Delete (id){

        axios.request({
        url: "https://tweeterest.ml/api/comments",
        method: "DELETE",
        data: {
          loginTonken: cookies.get("token"),
          commmentId: id,
        },
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
        }
      }).then(()=>{
          
      }).catch(()=>{
          

      });

    }
  }
};
</script>

<style lang="sass" scoped>

</style>