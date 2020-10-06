<template>
  <div>
       <deleteProfile />
    <editProfile />

  </div>
</template>

<script>
import editProfile from "../components/editProfile";
import deleteProfile from "../components/deleteProfile";
export default {
    name:"edit-profile",
  components: {
    editProfile,
    deleteProfile
  }
};
</script>

<style lang="scss" scoped>
</style>