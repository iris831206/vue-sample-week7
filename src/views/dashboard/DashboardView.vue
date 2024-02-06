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
import axios from 'axios'
const { VITE_API_URL } = import.meta.env

export default {
  methods: {
    checkLogin () {
      // 驗證登入
      const url = `${VITE_API_URL}/api/user/check`
      axios.post(url)
        .then((res) => {
          console.log('驗證成功:', res.data.success)
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

  <style scoped>
  </style>
