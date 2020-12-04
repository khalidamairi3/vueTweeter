<template>
  <div data-aos="fade-down" v-bind:class="{deleted:deleted , reply:!deleted}" >
    <p class="username" @click="selectUser(comment.userId)">
      {{ comment.username }}
    </p>
    <p class="date">{{ calculateDate()}}</p>
    <div v-if="user.userId == comment.userId">
      <i @click="editToShow(comment.commentCommentId)" :id=" 'myBtn' " class="far fa-edit"></i>
      <i @click="Delete(comment.commentId)" class="fas fa-times"></i>
    </div>
    <div :id=" 'commentModal'+comment.commentCommentId " class="modal">
      <!-- Modal content >-- -->
      <div class="modal-content">
        <span @click="closeModal( comment.commenCommenttId)" class="close">&times;</span>
        <p>Edit your Reply</p>
        <textarea  v-model="content"></textarea>
        <button :disabled="editDisable" @click="updateComment(comment.commentCommentId, content)">Edit</button>
        <h3 v-if="err">the relpy has a limit of 200 characters</h3>
      </div>
    </div>

    <p class="content">{{ currentComment.content }}</p>
    <div>
          <i @click="like_unlike(comment.commentCommentId)" class="fa-heart"  v-bind:class="{ fas: liked, far: !liked }"></i><span class="likes">  {{likedUsers.length}}</span>
      </div>
    
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "nested-comment",
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.checkliked();
    
      
    
  },
  data() {
    return {
      currentComment:this.comment,
      content: "",
      likedUsers:[],
      liked:false,
      deleted:false,
      deleteDisable:false,
      editDisable:false,
      likeDisable:false,
      err: false
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    checkliked(){
      axios.request({
      url:"https://tweeeter.ml/api/comment-likes",
      method: "GET",
      params:{
        commentId:this.comment.commentCommentId
      },
           headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
          }
    }).then((response)=>{
      this.likedUsers=response.data;
             let currrentUser = this.user
        this.likedUsers.forEach(user => {
      if (user.username== currrentUser.username) {
        this.liked = true;
      }
    });
    }).catch(()=>{
      alert("Something went Wrong");
    });
    },
    selectUser(userId) {
      if(this.user.userId==userId){
        this.$router.push("/profile");
        return 
      }
      cookies.set("selectedUser",userId)
      this.$store.commit("userToShow", userId);
      this.$router.push("/userprofile")
    },
    editToShow(id) {
      document.getElementById("commentModal"+id).style.display = "block";
    },
    closeModal(id) {
      document.getElementById("commentModal"+id).style.display = "none";
    },
    calculateDate(){
      let date =new Date (this.comment.createdAt);
      return date.toLocaleString();
    },
    updateComment(id, content) {
      console.log(id + content);
      this.editDisable=true;
      axios.request({
          url: "https://tweeeter.ml/api/comments",
          method: "PATCH",
          data: {
            loginToken: cookies.get("token"),
            commentId: id,
            content: content
          },
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
          }
        }).then((response) => {
          console.log(response.data);
          this.closeModal(this.comment.commentId);
          this.currentComment.content = response.data.content;
          this.editDisable=false;
          this.err = false;
        }).catch(() => {
          this.editDisable=false;
          this.err = true;
        });
    },
    
    Delete(id) {
      if(this.deleteDisable){
        return
      }
      this.deleteDisable=true
      axios.request({
          url: "https://tweeeter.ml/api/comments",
          method: "DELETE",
          data: {
            loginToken: cookies.get("token"),
            commentId: id
          },
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
          }
        })
        .then(() => {
          this.deleteDisable=false;
          this.deleted=true;
        })
        .catch(() => {
          this.deleteDisable=false;
          alert("this comment couldn,t be deleted");
        });
    },
    like_unlike(commentId) {
      if(this.likeDisable){
        return 
      }
      this.likeDisable=true;
        if(!this.liked){
            axios.request({
                url:"https://tweeeter.ml/api/comment-likes",
                method:"POST",
                data:{
                    loginToken:cookies.get("token"),
                    commentId:commentId
                },
                 headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
          }
            }).then((response)=>{
                this.likeDisable=false;
                this.liked=true;
                this.likedUsers.push(response.data)
            }).catch(()=>{
              this.likeDisable=false;
              alert("Somthing Went Wrong");
            })
        }
        else{
             axios.request({
                url:"https://tweeeter.ml/api/comment-likes",
                method:"DELETE",
                data:{
                    loginToken:cookies.get("token"),
                    commentId:commentId
                },
                 headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
          }
            }).then(()=>{
                this.likeDisable=false;
                let currrentUser = this.user
                this.liked=false
                this.likedUsers=this.likedUsers.filter(function(user){
                    return user.userId!=currrentUser.userId;

                })
               
            }).catch(()=>{
                this.likeDisable=false;
                alert("Somthing went wrong ")
            })
        }
    }
  }
};
</script>

<style lang="scss" scoped>

.reply{
    display: grid;
    align-items: center;
    grid-template-columns: 3fr 2fr 1fr;
    width: 100%;
    min-height: 30vh;
    border-top: solid 1px #92B4A7;
    .username{
        font-weight: bold;
        font-size: 18px;

        &:hover{
            color: #1da1f2;
            transition: all 0.1s ease-in;
        }

    }

  
}

  
  

</style>