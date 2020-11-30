<template>
  <div id="users">
    <div id="search">
       <label for="search"> Enter username </label>
      <input name="search" type="text" @input="search" v-model="searched">    
    </div>
   
    <h3 v-if="selectedusers.length == 0">There is no users to show in this list</h3>
    <div data-aos="fade-left" data-aos-duration="1000" class="user" v-for="user in selectedusers" :key="user.userId">
      <p @click="selectUser(user.userId)">{{ user.username }}</p>

    </div>
  </div>
</template>

<script>

import cookies from "vue-cookies";
export default {
  name: "users-page",

  props: {
    users: {
      type: Array,
      required: true
    }

  },
  data() {
    return {
      selectedusers: [],
      searched:"",
      usercard:true
    }
  },
  methods: {
    selectUser(userId) {
      this.$store.commit("userToShow", userId);
      cookies.set("selectedUser", userId);
      this.$router.push("/userprofile");
    },
    search(){
      let word = this.searched
      if(word != ""){
        this.selectedusers=this.users.filter(function(user){
         return user.username.includes(word);
      })

      }
      else{
        this.selectedusers=[]
      }
      
    }
  }
};
</script>

<style lang="scss" scoped>
#users {
  width: 100%;
  display: grid;
  justify-items: center;
}
.user {
  width: 100%;
  border-top: 2px solid #aab8c2;
  p {
    font-weight: bolder;
    font-size: 22px;
  }
}
#search{
  margin-top:5vh;
  width: 80%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  input{
    border: 1px solid #1da1f2 ;
  }
}
.shown{
  display: none;
}
</style>