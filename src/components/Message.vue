<template>
  <li class="list-group-item">
    <small>{{message.sender+": "}}</small>
    {{message.message}}
  </li>
</template>

<script lang="js">
export default {
  props: ['message']
};
</script>
