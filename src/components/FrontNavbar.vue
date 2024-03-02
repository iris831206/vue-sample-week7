<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">HOME</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <RouterLink to="/products" class="nav-link">產品</RouterLink>
          <RouterLink to="/cart" class="nav-link">購物車</RouterLink>
          <RouterLink to="/blog" class="nav-link">貼文</RouterLink>
          <RouterLink to="/admin/products" class="nav-link">後台產品頁面</RouterLink>

        </div>
        <div class="navbar-nav ms-auto">
          <RouterLink to="/cart" class="nav-link me-3"><i class="fas fa-shopping-cart"></i></RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
const { VITE_API_URL } = import.meta.env

export default {
  methods: {
    logout () {
      const api = `${VITE_API_URL}/logout`
      this.$http.post(api)
        .then((response) => {
          alert(response.data.message)
          this.$router.push('/')
        }).catch((error) => {
          alert(error.response.data.message)
        })
    }
  }
}
</script>
