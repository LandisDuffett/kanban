<template>
  <div class="home text-primary mt-5">
    <img class="rounded mb-3" :src="user.picture" alt />
    <h1>Welcome to Kanban, {{user.name}}</h1>
  </div>
</template>


<script>
export default {
  name: "home",
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {},
  components: {},
};
</script>


<style scoped>
</style>