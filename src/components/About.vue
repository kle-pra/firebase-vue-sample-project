<template>
  <div class="jumbotron">
    This is a (public) about page, which shows extra stuff if logged in.
    <br />
    <br />
    <br />
    <span v-if="isLoggedIn">Hi, {{username}}</span>

    <span v-if="!isLoggedIn">You are not logged in. Login or create an account.</span>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.user;
    },
    username() {
      return this.$store.state.user.displayName;
    }
  }
};
</script>

