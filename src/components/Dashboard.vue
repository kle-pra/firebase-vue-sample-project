<template>
  <div class="jumbotron">
    <div class="row">
      <div class="col-md-4">
        <Messages></Messages>
      </div>
      <div class="col-md-8">
        <h4>Welcome to Dash area</h4>
        <p>You can see current status and adjust settings here.</p>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import Messages from '@/components/Messages.vue'

export default {
  components: {
    Messages,
  }
};
</script>

