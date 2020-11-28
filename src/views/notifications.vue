<template>
  <div id="notifications">
    <navBar />
    <div>
      <h1 id="notification-header">Notifications</h1>
      <notificationItem
        v-for="notification in notifications"
        :key="notification.notificationId"
        :notification="notification"
      />
    </div>

    <addsPage />
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import addsPage from "../components/adds";
import notificationItem from "../components/notification";
import navBar from "../components/nav";
export default {
  name: "notifications-view",
  components: {
    navBar,
    addsPage,
    notificationItem,
  },
  computed: {
    notifications() {
      return this.$store.state.notifications;
    },
  },
  mounted() {
    this.readnotifications();
  },
  methods: {
    readnotifications() {
      axios
        .request({
          url: "http://127.0.0.1:5000/api/notifications",
          method: "PATCH",
          data: {
            userId: cookies.get("userId"),
          },
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "ZbUbhpzNbCXwE9Cbn4nK9zYQT1aNxPuRXkYLjJB7pqa67",
          },
        })
        .then(() => {})
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
#notification-header {
  width: 100%;
  border-bottom: 1px solid;
}
</style>