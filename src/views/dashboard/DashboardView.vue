<template>
  <h1>這是後台</h1>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <RouterLink to="/admin/products" class="navbar-brand">HOME</RouterLink>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <RouterLink to="/admin/products" class="nav-link">產品頁面</RouterLink>
          <RouterLink to="/admin/order" class="nav-link">訂單頁面</RouterLink>
          <RouterLink to="/admin/coupon" class="nav-link">優惠券頁面</RouterLink>
          <RouterLink to="/admin/blog" class="nav-link">貼文頁面</RouterLink>
          <RouterLink to="/" class="nav-link">回到前台</RouterLink>
        </div>
        <div class="navbar-nav ms-auto">
          <a href="#" @click.prevent="logout" class="nav-link me-3">登出</a>
        </div>
      </div>
    </div>
  </nav>
  <RouterView></RouterView>
</template>

<script>
import axios from 'axios'
const { VITE_API_URL } = import.meta.env

export default {
  methods: {
    logout () {
      const api = `${VITE_API_URL}/logout`
      this.$http.post(api)
        .then((response) => {
          alert(response.data.message)
          this.$router.push('/login')
        }).catch((error) => {
          alert(error.response.data.message)
        })
    },
    checkLogin () {
      // 驗證登入
      const url = `${VITE_API_URL}/api/user/check`
      axios.post(url)
        .then((res) => {
          // console.log('驗證成功:', res.data.success)
        })
        .catch((err) => {
          alert(err.response.data.message)
          this.$router.push('/login')
        })
    }
  },
  mounted () {
    // 將token存到cookie以進行驗證
    const myCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    axios.defaults.headers.common.Authorization = myCookie
    this.checkLogin()
  }
}
</script>

<style scoped></style>
