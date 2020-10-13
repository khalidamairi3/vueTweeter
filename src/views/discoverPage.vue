<template>
  <div id="discoverPage">
      <navBar />
      <div>
          <div id="cover">
      <img
        src="https://assets.materialup.com/uploads/f05e85d3-6423-4bbd-a956-eec379f9729b/preview-image.jpg"
        alt="discover cover photo"
      />
    </div>
    <div id="options">
      <button
        @click="selectTweet"
        v-bind:class="{ selection: tweetsSelection }"
      >
        Tweets
      </button>
      <button
        @click="selectTrending"
        v-bind:class="{ selection: trendingSelection }"
      >
        Ternding
      </button>
      <button @click="selectUser" v-bind:class="{ selection: usersSelection }">
        Users
      </button>
    </div>
    <dicoverComponent v-if="tweetsSelection" />
    <trendingPage v-if="trendingSelection" />
    <usersPage v-if="usersSelection" :users="otherUsers" />

      </div>
    <addsPage />
    
  </div>
</template>

<script>
import addsPage from "../components/adds"
import cookies from "vue-cookies";
import navBar from "../components/nav";
import trendingPage from "../components/trending";
import usersPage from "../components/users";
import dicoverComponent from "../components/discover";
export default {
  name: "dicover-page",
  components: {
    dicoverComponent,
    trendingPage,
    usersPage,
    navBar,
    addsPage

  },
  mounted() {
    if (this.user.userId == undefined && cookies.get("token") != undefined) {
      this.$store.dispatch("restart");
    } else if (cookies.get("token") == undefined) {
      this.$router.push("/signin");
    }
  },
  data() {
    return {
      tweetsSelection: true,
      trendingSelection: false,
      usersSelection: false
    };
  },
  computed: {
    otherUsers() {
      return this.$store.getters.notFollowing;
    },
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    selectTweet() {
      this.tweetsSelection = true;
      (this.trendingSelection = false), (this.usersSelection = false);
    },
    selectTrending() {
      this.tweetsSelection = false;
      (this.trendingSelection = true), (this.usersSelection = false);
    },
    selectUser() {
      this.tweetsSelection = false;
      (this.trendingSelection = false), (this.usersSelection = true);
    }
  }
};
</script>

<style lang="scss" scoped>
#discoverPage {
  width: 100%;

}
@media only screen and (min-width: 600px) {
    #options{
        position: relative;
        bottom: 0;
    }
}

</style>