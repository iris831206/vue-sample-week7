import { defineStore } from 'pinia'
import axios from 'axios'
const { VITE_API_URL, VITE_API_PATH } = import.meta.env

export default defineStore('productStore', {
  state: () => {
    return {
      products: [],
      isLoading: false,
      status: {
        loadingItem: ''
      }
    }
  },
  actions: {
    getData () {
      // 取得產品資料
      this.isLoading = true
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/products/all`
      axios.get(url)
        .then((res) => {
          this.products = res.data.products
          this.isLoading = false
        })
        .catch((err) => {
          this.isLoading = false
          alert(err.response.data.message)
        })
    }
  }
})
