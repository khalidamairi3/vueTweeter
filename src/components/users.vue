<template>
  <div id="users">
    <h3 v-if="users.length == 0">There is no users to show in this list</h3>
    <div class="user" v-for="user in users" :key="user.userId">
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
  methods: {
    selectUser(userId) {
      this.$store.commit("userToShow", userId);
      cookies.set("selectedUser", userId);
      this.$router.push("/userprofile");
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
</style>