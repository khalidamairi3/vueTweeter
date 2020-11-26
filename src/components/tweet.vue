<template>
  <div data-aos="fade-down" v-bind:class="{ deleted: deleted , tweet: !deleted }"
  >
    <p class="username" @click="selectUser(tweet.userId)">
      {{ tweet.username }}
    </p>
    <p class="date">{{ tweet.createdAt }}</p>
    <div v-if="isuser">
      <i @click="editToShow(tweet.tweetId)" id="myBtn" class="far fa-edit"></i>
      <i @click="Delete(tweet.tweetId)" class="fas fa-times"></i>
    </div>
  
    <div :id="'tweetModal'+tweet.tweetId" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <span @click="closeModal(tweet.tweetId)" class="close">&times;</span>
        <p>Edit your tweet</p>
        <textarea v-model="content"></textarea>
        <button @click="edit(tweet.tweetId, content)">Edit</button>
        <h3 v-if="err">the tweet has a limit of 200 characters</h3>
      </div>
    </div>

    <p class="content">{{ tweet.content }}</p>
    <div>
      <i
        @click="like_unlike(tweet.tweetId)"
        class="fa-heart"
        v-bind:class="{ fas: liked, far: !liked }"
      ></i
      ><span id="likes"> {{ likedUsers.length }}</span>
    </div>
    <p class="view" v-if="!viewComments" @click="viewComments = true">
      view comments
    </p>
    <p class="view" v-if="viewComments" @click="viewComments = false">
      hide comments
    </p>

    <tweetComments v-if="viewComments" :tweetId="tweet.tweetId" />
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
     this.$modal.show('example')
    if (this.user.userId == this.tweet.userId) this.isuser = true;
    this.checkLiked();
  },
  data() {
    return {
      tweet: this.Tweet,
      isuser: false,
      liked: false,
      content: "",
      viewComments: false,
      err: false,
      deleted: false,
      editDisable: false,
      deleteDisable: false,
      likeDisable: false,
      likedUsers: []
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    checkLiked() {
      axios
        .request({
          url: "http://127.0.0.1:5000/api/tweet-likes",
          method: "GET",
          params: {
            tweetId: this.tweet.tweetId
          },
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
          }
        })
        .then(response => {
          this.likedUsers = response.data;
          let currrentUser = this.user;
          this.likedUsers.forEach(user => {
            if (user.username == currrentUser.username) {
              this.liked = true;
            }
          });
        })
        .catch(() => {
          alert("Something went wrong in loading likes ");
        });
    },
    selectUser(userId) {
      if (this.user.userId == userId) {
        this.$router.push("/profile");
        return;
      }
      this.$store.commit("userToShow", userId);
      cookies.set("selectedUser", userId);
      this.$router.push("/userprofile");
    },
    editToShow(id) {
      document.getElementById("tweetModal"+id).style.display = "block";
    },
    closeModal(id) {
      document.getElementById("tweetModal"+id).style.display = "none";
    },
    calculateDate() {
      let now = new Date();
      let date = new Date(this.Tweet.createdAt);
      if (now.getMonth() == date.getMonth()) {
        let days = now.getDate() - date.getDate() +1;
        let hours = now.getHours() - date.getHours() + 6 ;
        let mins = now.getMinutes() - date.getMinutes();
        if (days != 0) {
          return days + " days ago";
        } else if (hours != 0) {
          return hours + " hours ago ";
        } else if (mins != 0) {
          return mins + " minutes ago";
        } else {
          return "seconds ago";
        }
      }
      return date.toLocaleString();
    },
    edit(tweetId, content) {
      if (this.editDisable) {
        return;
      }
      this.editDisable = true;
      axios
        .request({
          url: "http://127.0.0.1:5000/api/tweets",
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
          this.tweet.content = response.data.content;
          this.editDisable = false;
          this.err = false;
          document.getElementById("tweetModal"+this.Tweet.tweetId).style.display = "none";
        })
        .catch(() => {
          this.editDisable = false;
          this.err = true;
        });
    },
    Delete(tweetId) {
      if (this.deleteDisable) {
        return;
      }
      this.deleteDisable = true;
      axios
        .request({
          url: "http://127.0.0.1:5000/api/tweets",
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
        .then(() => {
          this.deleteDisable = false;
          this.deleted = true;
        })
        .catch(() => {
          this.deleteDisable = false;
          alert("Something went wrong with deleting tweet");
        });
    },
    like_unlike(tweetId) {
      if (this.likeDisable) {
        return;
      }
      this.likeDisable = true;
      if (!this.liked) {
        axios
          .request({
            url: "http://127.0.0.1:5000/api/tweet-likes",
            method: "POST",
            data: {
              loginToken: cookies.get("token"),
              tweetId: tweetId
            },
            headers: {
              "Content-Type": "application/json",
              "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
            }
          })
          .then(() => {
            this.likeDisable = false;
            this.liked = true;
            this.likedUsers.push(this.user);
          })
          .catch(() => {
            this.likeDisable = false;
            alert("Something went wrong");
          });
      } else {
        axios
          .request({
            url: "http://127.0.0.1:5000/api/tweet-likes",
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
          .then(() => {
            this.likeDisable = false;
            let currrentUser = this.user;
            this.liked = false;
            this.likedUsers = this.likedUsers.filter(function(user) {
              return user.userId != currrentUser.userId;
            });
          })
          .catch(() => {
            this.likeDisable = false;
            alert("Something went wrong");
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tweet {
  z-index: 1;
  display: grid;
  align-items: center;
  grid-template-columns: 3fr 2fr 1fr;
  width: 100%;
  border-top: solid 1px #92b4a7;
  .username {
    font-weight: bold;
    font-size: 24px;

    &:hover {
      color: #1da1f2;
      transition: all 0.1s ease-in;
    }
  }

  .view {
    grid-column: span 2;
  }
}

/* Modal Content/Box */
</style>