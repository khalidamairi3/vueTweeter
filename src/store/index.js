import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user:{},
    followingUsers:[],
    followersUsers : [],
    selectedUser:0,
  },
  mutations: {
    setUser : function(state,user){
      state.user=user;
    },
    updateFollowing:function(state,data){
      state.followingUsers=data;
    },
    userToShow(state,user){
      state.selectedUser = user;
    }
  },
  actions: {
    getFollowing(context){
      axios.request({
        url:"https://tweeterest.ml/api/follows",
        method: "GET",
        data:{
          userId : context.state.user.userId,
        },
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
        }
      }).then((response)=>{
        this.commit("updateFollowing",response.data);
      })


    }
  },
  modules: {}
});
