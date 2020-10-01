<template>
  <div>
    
    <deleteProfile/>
    
    <editProfile />
    <h1>{{ user.username}}</h1>
    <h1> {{ user.email}}</h1>
    <h1>{{user.bio}}</h1>
  </div>
</template>

<script>
import editProfile from "../components/editProfile";
import deleteProfile from "../components/deleteProfile"
export default {
  name: "profile-page",
  components: {
    editProfile,
    deleteProfile
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  
  
};
</script>

<style lang="sass" scoped>

</style>