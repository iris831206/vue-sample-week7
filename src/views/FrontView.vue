<template>
    <h1>這是前台</h1>
<nav>
    <RouterLink to="/">Home</RouterLink> |
    <RouterLink to="/about">About</RouterLink> |
    <RouterLink to="/products">產品頁面</RouterLink> |
    <RouterLink to="/cart">購物車頁面</RouterLink> |
    <RouterLink to="/admin/products">後台產品頁面</RouterLink> |
    <RouterLink to="/login">後台登入頁面</RouterLink>
</nav>
<RouterView></RouterView>
  </template>

<script>
export default {
}
</script>

  <style scoped>
  </style>
