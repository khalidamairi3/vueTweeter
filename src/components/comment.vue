<template>
  <div class="comment" v-bind:class="{deleted:deleted}" >
    <p class="username" @click="selectUser(comment.userId)">
      {{ comment.username }}
    </p>
    <p class="date">{{ comment.createdAt }}</p>
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
    .date{
        
        color: #92B4A7;
        font-size: 15px;
    }

    .fa-heart{
        color: rgb(167, 16, 16);
    }
    
    .content{
        font-size: 18px;
        grid-column: span 3;

    }
  
}

.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }
  
  /* Modal Content/Box */
  .modal-content {
    display: grid;
    justify-content: center;
    align-content: center;
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
    letter-spacing: 0.5vw;
    textarea{
        width: 80%;
    }
    button{
        margin-top: 2vh;
        background-color: white;
        height: 6vh;
        width: 20vw;
        background-color: #00CECB;
        color: white;
       
        border: 1px solid  #00CECB ;
        

        &:hover{
            border: 1px solid  #00CECB ;
            background-color:white;
            color: #00CECB;
            transition: all 0.2s ease-in;
            box-shadow: 2px 2px #92B4A7;
            

        }

    }
  }
  
  /* The Close Button */
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  .deleted{
    display: none;
  }

</style>