import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user:{},
    followingUsers:[],
    followersUsers : [],
    allUsers:[],
    selectedUser:0,
  },
  mutations: {
    setUser : function(state,user){
      state.user=user;
    },
    updateFollowing:function(state,data){
      state.followingUsers=data;
    },
    updateUsers:function(state,data){
      state.allUsers=data;
    },
    userToShow(state,userId){
      state.selectedUser = userId;
    },
    addFollowing(state,user){
      state.followingUsers.push(user)
    },
    removeFollowing(state,user){
      state.followingUsers=state.followingUsers.filter(function(user_f){
        return user_f != user;
      })
    }
  },
  actions: {
    getFollowing(context){
      console.log(context.state.user.userId);
      axios.request({
        url:"https://tweeterest.ml/api/follows",
        method: "GET",
        params:{
          userId : context.state.user.userId,
        },
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
        }
      }).then((response)=>{
        this.commit("updateFollowing",response.data);
      }).catch((error)=>{
        console.log(error);
      })


    },
    getAllusers(){
      axios.request({
        url:"https://tweeterest.ml/api/users",
        method: "GET",
        headers: {
          "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67"
        }
      }).then((response)=>{
        this.commit("updateUsers",response.data);
      }).catch((error)=>{
        console.log(error);
      })
      
      
    }
  },
  getters : {
    getOtherUsers: function(state){
      return state.allUsers.filter(function(user){
        return user.userId != state.user.userId ;

      })
    },
    checkFollowing:function(state){
      for(let i=0;i<state.followingUsers;i++){
        if(state.followingUsers[i]==state.selectedUser)
        {
          return true;
        }
      }
      return false;
    }
  },

  modules: {}
});
