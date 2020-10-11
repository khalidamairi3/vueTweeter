<template>
  <div>
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
div {
  width: 100%;
  height: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
}
</style>