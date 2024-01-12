<template>
  <div class="home-body">
    <Sidebar />
    <Container />
  </div>
</template>

<script setup lang="ts">
import Container from "./Container/index.vue";
import Sidebar from "./Sidebar.vue";
</script>

<style scoped>
.home-body {
  min-height: 50vh;
  display: flex;
  padding: 0 5rem;
  justify-content: start;
}
</style>
