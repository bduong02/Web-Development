// Bryan Duong
// Home.vue

<template>
  <div>
    <h1>Home Page</h1>
    <router-link to="/create-challenge">
      <button>Create a New Challenge</button>
    </router-link>
    <router-link to="/list-challenges">
      <button>View Challenges</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Home'
};
</script>

<style scoped>

</style>