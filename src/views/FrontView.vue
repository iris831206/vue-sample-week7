<template>
  <!-- <h1>這是前台</h1> -->
  <FrontNavbar />
  <RouterView></RouterView>
</template>

<script>
import FrontNavbar from '@/components/FrontNavbar.vue'

export default {
  components: {
    FrontNavbar
  }
}
</script>

<style scoped></style>
