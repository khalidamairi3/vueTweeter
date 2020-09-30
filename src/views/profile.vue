<template>
  <div>
      <deleteProfile/>
    
    <editProfile />
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
  
  
};
</script>

<style lang="sass" scoped>

</style>