<template>
    <div id="discoverPage">
        <div id="cover">
      <img
        src="https://assets.materialup.com/uploads/f05e85d3-6423-4bbd-a956-eec379f9729b/preview-image.jpg"
        alt="discover cover photo"
      />
    </div>
    <div id="options">
      <button @click="selectTweet"  v-bind:class=" { selection: tweetsSelection } ">Tweets</button>
      <button @click="selectTrending" v-bind:class=" { selection: trendingSelection } ">Ternding</button>
      <button @click="selectUser" v-bind:class=" { selection: usersSelection } ">Users</button> 
    </div>
        <dicoverComponent v-if="tweetsSelection"/>
        <trendingPage v-if="trendingSelection "/>
        <usersPage v-if="usersSelection" :users = otherUsers  /> 
        <navBar />

    </div>
</template>

<script>
import navBar from "../components/nav" 
import trendingPage from "../components/trending";
import usersPage from "../components/users"
import dicoverComponent from "../components/discover";
    export default {
        name: "dicover-page",
        components: {
            dicoverComponent,
            trendingPage,
            usersPage,
            navBar
        },
        data() {
            return {
                tweetsSelection: true,
                trendingSelection:false,
                usersSelection:false
            }
        },
        computed: {
            otherUsers() {
                return this.$store.getters.notFollowing; 
            }
        },
        methods: {
            selectTweet() {
                 this.tweetsSelection= true;
                this.trendingSelection=false,
                this.usersSelection=false
                
            },
              selectTrending() {
                 this.tweetsSelection= false;
                this.trendingSelection=true,
                this.usersSelection=false
                
            },
              selectUser() {
                 this.tweetsSelection= false;
                this.trendingSelection=false,
                this.usersSelection=true
                
            }
        },

    }
</script>

<style lang="scss" scoped>

#discoverPage{
    width: 100%;
    #cover {
    img {
      width: 100%;
      height: 25vh;
      object-fit: cover;
    }

  }
   #options {
    width: 100%;
    border-top: 2px solid #e1e8ed;
    button {
    font-family: "Dosis", sans-serif;
    font-size: 16px;
    width: 30%;
    background-color: white;
    border: 0px;
    
  }
  .selection {
      color: #1da1f2;
      border-bottom: 2px solid #1da1f2;
    }
  }
}


</style>