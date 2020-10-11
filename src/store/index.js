import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import cookies from "vue-cookies"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    followingUsers: [],
    followersUsers: [],
    allUsers: [],
    selectedUser: 0,
  },
  mutations: {
    setUser: function (state, user) {
      state.user = user;
    },
    updateFollowing: function (state, data) {
      state.followingUsers = data;
    },
    updateFollowers: function (state, data) {
      state.followersUsers = data;
    },
    updateUsers: function (state, data) {
      state.allUsers = data;
    },
    userToShow(state, userId) {
      state.selectedUser = userId;

    },
    addFollowing(state, user) {
      state.followingUsers.push(user)
    },
    removeFollowing(state, user) {
      state.followingUsers = state.followingUsers.filter(function (user_f) {
        return user_f != user;
      })
    },
    reset(state) {
      state.user = {};
      state.followingUsers = [];
      state.followersUsers = [];
      state.allUsers = [];
      state.selectedUser = 0;

    }
  },
  actions: {
    getFollowing(context) {
      axios.request({
        url: "https://tweeterest.ml/api/follows",
        method: "GET",
        params: {
          userId: context.state.user.userId,
        },
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
        }
      }).then((response) => {
        this.commit("updateFollowing", response.data);
      }).catch(() => {
        alert("Somthing went wrong");
      })


    },
    getFollowers(context) {
      axios.request({
        url: "https://tweeterest.ml/api/follows",
        method: "GET",
        params: {
          userId: context.state.user.userId,
        },
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
        }
      }).then((response) => {
        this.commit("updateFollowers", response.data);
      }).catch(() => {
        alert("Somthing went wrong");
      })


    },

    getAllusers() {
      axios.request({
        url: "https://tweeterest.ml/api/users",
        method: "GET",
        headers: {
          "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
        }
      }).then((response) => {
        this.commit("updateUsers", response.data);
      }).catch(() => {
        alert("Somthing went wrong");
      })


    },
    restart() {
      axios.request({
        url: "https://tweeterest.ml/api/users",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
        },
        params: {
          userId: cookies.get("userId")
        }

      }).then((response) => {
        this.commit("setUser", response.data[0]);
        this.dispatch("getFollowing");
        this.dispatch("getFollowers");
        this.dispatch("getAllusers");
        if (cookies.get("selectedUser") != undefined)
          this.commit("userToShow", cookies.get("selectedUser"));

      }).catch(() => {
        alert("Somthing went wrong");
      })
    }
  },
  getters: {
    getOtherUsers: function (state) {
      return state.allUsers.filter(function (user) {
        return user.userId != state.user.userId;

      })
    },
    checkFollowing: function (state) {
      for (let i = 0; i < state.followingUsers.length; i++) {
        if (state.followingUsers[i].userId == state.selectedUser) {
          return true;
        }
      }
      return false;
    },
    notFollowing: function (state) {
      let users = state.allUsers.filter(function (user) {
        for (let i = 0; i < state.followingUsers.length; i++) {
          if (user.userId == state.followingUsers[i].userId) {
            return false;
          }
        }
        return true;

      })
      return users.filter(function (user) {
        return user.userId != state.user.userId;
      })

    }

  },

  modules: {}
});
