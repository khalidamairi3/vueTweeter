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
  width: 80%;
  height: fit-content;
  max-width: 600px;
  margin: 5vh 0;
  display: grid;
  justify-items: center;
  align-items: center;
}
</style>