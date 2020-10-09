<template>
  <div id="profileEdit">
       <deleteProfile />
    <editProfile />
    <navBar />

  </div>
</template>

<script>
import navBar from "../components/nav" 
import editProfile from "../components/editProfile";
import deleteProfile from "../components/deleteProfile";
export default {
    name:"edit-profile",
  components: {
    editProfile,
    deleteProfile,
    navBar
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