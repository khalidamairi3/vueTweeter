<template>
  <div class="comment" v-bind:class="{deleted:deleted}" >
    <p class="username" @click="selectUser(comment.userId)">
      {{ comment.username }}
    </p>
    <p class="date">{{ calculateDate()}}</p>
    <div v-if="user.userId == comment.userId">
      <i @click="editToShow()" id="myBtn" class="far fa-edit"></i>
      <i @click="Delete(comment.commentId)" class="fas fa-times"></i>
    </div>
    <div id="commentModal" class="modal">
      <!-- Modal content >-- -->
      <div class="modal-content">
        <span @click="closeModal()" class="close">&times;</span>
        <p>Edit your comment</p>
        <textarea rows="5" v-model="content"></textarea>
        <button :disabled="editDisable" @click="updateComment(comment.commentId, content)">Edit</button>
        <h3 v-if="err">the comment has a limit of 200 characters</h3>
      </div>
    </div>

    <p class="content">{{ comment.content }}</p>
    <div>
          <i @click="like_unlike(comment.commentId)" class="fa-heart"  v-bind:class="{ fas: liked, far: !liked }"></i><span class="likes">  {{likedUsers.length}}</span>
      </div>
    
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "comment-display",
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
      url:"https://tweeterest.ml/api/comment-likes",
      method: "GET",
      params:{
        commentId:this.comment.commentId
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
    editToShow() {
      document.getElementById("commentModal").style.display = "block";
    },
    closeModal() {
      document.getElementById("commentModal").style.display = "none";
    },
    calculateDate(){
      let now = new Date();
      let date =new Date (this.comment.createdAt);
      if(now.getMonth()==date.getMonth()){
          let days = now.getDate()-date.getDate();
          let hours =now.getHours()-date.getHours();
          let mins = now.getMinutes()-date.getMinutes();
          if(days != 0){
            return days + " days ago";
          }
          else if(hours!=0){
            return hours + " hours ago ";
          }
          else if (mins !=0){
            return mins + " minutes ago";
          }
          else {
            return "seconds ago"
          }
      }
      return date.toLocaleString();
    },
    updateComment(id, content) {
      this.editDisable=true;
      axios.request({
          url: "https://tweeterest.ml/api/comments",
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
          this.closeModal();
          this.comment.content = response.data.content;
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
          url: "https://tweeterest.ml/api/comments",
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
                url:"https://tweeterest.ml/api/comment-likes",
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
                url:"https://tweeterest.ml/api/comment-likes",
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

.comment{
    display: grid;
    align-items: center;
    grid-template-columns: 3fr 2fr 1fr;
    width: 100%;
    border-top: solid 1px #92B4A7;
    .username{
        font-weight: bold;
        font-size: 18px;

        &:hover{
            color: #00CECB;
            transition: all 0.1s ease-in;
        }

    }

  
}

  
  

</style>