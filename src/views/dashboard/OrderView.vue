<template>
    <h1>這是訂單頁面</h1>

  </template>

<script>
const { VITE_API_URL, VITE_API_PATH } = import.meta.env

export default {
  data () {
    return {
      orders: {},
      isNew: false,
      pagination: {},
      isLoading: false,
      tempOrder: {},
      currentPage: 1
    }
  },
  methods: {
    getOrders (currentPage = 1) {
      this.currentPage = currentPage
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/orders?page=${currentPage}`
      this.isLoading = true
      this.$http.get(url, this.tempProduct).then((response) => {
        this.orders = response.data.orders
        this.pagination = response.data.pagination
        this.isLoading = false
        console.log(response)
      }).catch((error) => {
        this.isLoading = false
        alert(error.response.data.message)
      })
    }
  },
  mounted () {
    this.getOrders()
  }
}
</script>

  <style scoped>
  </style>
