<template>
  <div id="tweet">
    <p class="username" @click="selectUser(tweet.userId)">
      {{ tweet.username }}
    </p>
    <p class="date">{{ tweet.createdAt }}</p>
    <div v-if="isuser">
      <i @click="editToShow()" id="myBtn" class="far fa-edit"></i>
      <i @click="Delete(tweet.tweetId)" class="fas fa-times"></i>
    </div>
    <div id="tweetModal" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <span @click="closeModal()" class="close">&times;</span>
        <p>Edit your tweet</p>
        <textarea v-model="content"></textarea>
        <button @click="edit(tweet.tweetId, content)">Edit</button>
        <h3 v-if="err">the tweet has a limit of 200 characters</h3>
      </div>
    </div>

    <p class="content">{{ tweet.content }}</p>
    <div>
      <i id="like" @click="like_unlike(tweet.tweetId)" class="far fa-heart"></i
      ><span id="likes"> {{likedUsers.length}}</span>
    </div>
    <p v-if="!viewComments" @click="viewComments = true">view comments</p>
    <p v-if="viewComments" @click="viewComments = false">hide comments</p>

    <tweetComments v-if="viewComments" :tweetId= tweet.tweetId />
  </div>
</template>

<script>
import tweetComments from "./comments";
import axios from "axios";
import cookies from "vue-cookies";

export default {
  name: "tweet-display",
  components: {
    tweetComments
  },
  props: {
    Tweet: {
      type: Object,
      required: true
    }
  },
  mounted() {
    if (this.user.userId == this.tweet.userId) this.isuser = true;
    axios.request({
        url:"https://tweeterest.ml/api/tweet-likes",
        method:"GET",
        params:{
            tweetId:this.tweet.tweetId
        },
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
          }


    }).then((response)=>{
        this.likedUsers = response.data;


    }).catch(()=>{})

    this.likedUsers.forEach(user => {
        if(user.userId==this.user.userId){
            document.getElementById("like").classList.remove("far");
            document.getElementById("like").classList.add("fas");
            this.liked=true
        }

        
    });
  },
  data() {
    return {
      tweet: this.Tweet,
      isuser: false,
      liked: false,
      content: "",
      viewComments: false,
      err: false,
      likedUsers:[]
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
      document.getElementById("tweetModal").style.display = "block";
    },
    closeModal() {
      document.getElementById("tweetModal").style.display = "none";
    },
    edit(tweetId, content) {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweets",
          method: "PATCH",
          data: {
            loginToken: cookies.get("token"),
            tweetId: tweetId,
            content: content
          },
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
          }
        })
        .then(response => {
          this.tweet = response.data;
          this.err = false;
          document.getElementById("tweetModal").style.display = "none";
        })
        .catch(() => {
          this.err = true;
        });
    },
    Delete(tweetId) {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweets",
          method: "DELETE",
          data: {
            loginToken: cookies.get("token"),
            tweetId: tweetId
          },
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
          }
        })
        .then(() => {})
        .catch(() => {});
    },
    like_unlike(tweetId) {
        if(!this.liked){
            axios.request({
                url:"https://tweeterest.ml/api/tweet-likes",
                method:"POST",
                data:{
                    loginToken:cookies.get("token"),
                    tweetId:tweetId
                },
                 headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
          }
            }).then(()=>{
                document.getElementById("like").classList.remove("far");
                document.getElementById("like").classList.add("fas");
                this.liked=true;
                this.likedUsers.push(this.user)
            }).catch(()=>{})
        }
        else{
             axios.request({
                url:"https://tweeterest.ml/api/tweet-likes",
                method:"DELETE",
                data:{
                    loginToken:cookies.get("token"),
                    tweetId:tweetId
                },
                 headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
          }
            }).then(()=>{
                document.getElementById("like").classList.remove("fas");
                document.getElementById("like").classList.add("far");
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

#tweet {
  display: grid;
  align-items: center;
  grid-template-columns: 3fr 2fr 1fr;
  width: 100%;
  border-top: solid 1px #92b4a7;
  .username {
    font-weight: bold;
    font-size: 24px;

    &:hover {
      color: #00cecb;
      transition: all 0.1s ease-in;
    }
  }
  .date {
    color: #92b4a7;
    font-size: 18px;
  }

  #like {
    color: rgb(167, 16, 16);
  }

  .content {
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
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
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
  textarea {
    width: 80%;
  }
  button {
    margin-top: 2vh;
    background-color: white;
    height: 6vh;
    width: 20vw;
    background-color: #00cecb;
    color: white;

    border: 1px solid #00cecb;

    &:hover {
      border: 1px solid #00cecb;
      background-color: white;
      color: #00cecb;
      transition: all 0.2s ease-in;
      box-shadow: 2px 2px #92b4a7;
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