<template>
    <h1>這是後台</h1>
<nav>
    <RouterLink to="/admin/products">產品頁面</RouterLink> |
    <RouterLink to="/admin/order">訂單頁面</RouterLink>|
    <RouterLink to="/">回到前台</RouterLink>
</nav>
<RouterView></RouterView>
  </template>

<script>
export default {
}
</script>

  <style scoped>
  </style>
