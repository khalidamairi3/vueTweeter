<template>
  <div id="profileEdit">
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
#profileEdit{
    width: 100%;
    display: grid;
    justify-items: center;
}
</style>