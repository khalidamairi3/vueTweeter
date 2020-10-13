<template>
  <div id="signup">
    <signup-form />
  </div>
</template>

<script>
import signupForm from "../components/signupForm";

export default {
  name: "signup-page",
  components: {
    signupForm
  }
};
</script>

<style scoped>
#signup{
  width: 100%;
  height: 100vh;
  display: grid;
  justify-items: center;
  align-items: center;
}
</style>