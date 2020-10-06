<template>
  <div id="comments">
      <commentDisplay v-for="comment in comments" :key="comment.commentId" :comment = comment />
       <div id="addComment">
          <textarea :id="'commentText'+tweetId" v-model="content" placeholder="add a comment">  Add a comment </textarea> 
          <i @click="postComment(tweetId,content)" id="toComment"  class="fas fa-2x fa-chevron-circle-right"></i>
        </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies"
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
      comments: [],
      content:""
    };
  },
  mounted() {
    axios.request({
      url: "https://tweeterest.ml/api/comments",
      method: "GET",
      params: {
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
  },
  methods: {
    postComment(id,content) {
      

      axios.request({
        url:"https://tweeterest.ml/api/comments",
        method:"POST",
        data:{
          loginToken : cookies.get("token"),
          tweetId:id,
          content:content
        },
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
        }

      }).then((response)=>{
        this.comments.push(response.data);
        document.getElementById("commentText"+id).value="";
      }).catch(()=>{})
      
    }
  },
};
</script>

<style lang="scss" scoped>

#comments{
     grid-column: span 3;
    width: 100%;
    background-color: #F5F8FA;
    textarea{
       
        width: 95%;
        background-color:#F5F8FA;
        border-radius: 15px 15px 15px 15px;
       
    }
    #toComment{
        color: #26547C;

        
    }
}
#addComment{
    margin-top: 2vh;
    width: 100%;
    display: grid;
    align-items: center;
    grid-template-columns: 8.5fr 1.5fr;

}

</style>