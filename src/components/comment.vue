<template>
  <div id="comment">
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
        <button @click="updateComment(comment.commentId, content)">Edit</button>
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
    axios.request({
      url:"https://tweeterest.ml/api/comment-likes",
      method: "GET",
      params:{
        commentId:this.comment.commentID
      },
           headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
          }
    }).then((response)=>{
      this.likedUsers=response.data;
    }).catch(()=>{});
        let currrentUser = this.user
        let flag = 0;
       this.likedUsers.forEach(user => {
        if(user.userId==currrentUser.userId){
            flag = 1
        }})
        if (flag == 1){
          this.liked =true;
        }
    
  },
  data() {
    return {
      
      content: "",
      likedUsers:[],
      liked:false,
      err: false
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    selectUser(userId) {
      this.$store.commit("userToShow", userId);
    },
    editToShow() {
      document.getElementById("commentModal").style.display = "block";
    },
    closeModal() {
      document.getElementById("commentModal").style.display = "none";
    },
    
    updateComment(id, content) {
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
          this.err = false;
        }).catch(() => {
          this.err = true;
        });
    },
    Delete(id) {
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
          this.comment={};
        })
        .catch(() => {});
    },
    like_unlike(commentId) {
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
            }).then(()=>{
                this.liked=true;
                this.likedUsers.push(this.user)
            }).catch(()=>{})
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
                let currrentUser = this.user
                this.liked=false
                this.likedUsers=this.likedUsers.filter(function(user){
                    return user.userId!=currrentUser.userId;

                })
            }).catch((error)=>{
                console.log(error);
            })
        }
    }
  }
};
</script>

<style lang="scss" scoped>
@import url("https://use.fontawesome.com/releases/v5.15.0/css/all.css");
@import url("https://use.fontawesome.com/releases/v5.15.0/css/v4-shims.css");

#comment{
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

</style>