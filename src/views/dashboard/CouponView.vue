<template>
  <h1>這是優惠券頁面</h1>
</template>

<script>

const { VITE_API_URL, VITE_API_PATH } = import.meta.env

export default {
  data () {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      isLoading: false,
      isNew: false
    }
  },
  methods: {
    getCoupons () {
      this.isLoading = true
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/coupons`
      this.$http.get(url, this.tempProduct).then((response) => {
        this.coupons = response.data.coupons
        this.isLoading = false
        console.log(response)
      }).catch((error) => {
        this.isLoading = false
        alert(error.response.data.message)
      })
    }
  },
  mounted () {
    this.getCoupons()
  }
}
</script>
