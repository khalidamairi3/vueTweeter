<template>
  <div id="profileEdit">
    <deleteProfile />
    <editProfile />
    <navBar />
  </div>
</template>

<script>
import cookies from "vue-cookies";
import navBar from "../components/nav";
import editProfile from "../components/editProfile";
import deleteProfile from "../components/deleteProfile";
export default {
  name: "edit-profile",
  components: {
    editProfile,
    deleteProfile,
    navBar
  },
  mounted() {
    if (this.user.userId == undefined && cookies.get("token") != undefined) {
      this.$store.dispatch("restart");
    } else if (cookies.get("token") == undefined) 
    this.$router.push("/signin");
  },
  computed: {
      user() {
          return this.$store.state.user; 
      }
  },
};
</script>

<style lang="scss" scoped>
#profileEdit {
  width: 100%;
  display: grid;
  justify-items: center;
}
</style>