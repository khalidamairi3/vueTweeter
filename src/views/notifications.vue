<template>
  <div id="notifications">
    <navBar />
    <div>
      <h1 id="notification-header">Notifications</h1>
      <h4 style="text-align:center" v-if="notifications.length ==0"> You have no notifications yet</h4>
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
          url: "https://tweeeter.ml/api/notifications",
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
#notifications{
  width: 100%;
}
#notification-header {
  width: 100%;
  border-bottom: 1px solid;
}
</style>