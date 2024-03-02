import { defineStore } from 'pinia'
import axios from 'axios'
const { VITE_API_URL, VITE_API_PATH } = import.meta.env

export default defineStore('cartStore', {
  state: () => ({
    carts: [],
    final_total: 0,
    total: 0
  }),
  actions: {
    getCart () {
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/cart`
      axios.get(url)
        .then((response) => {
          this.carts = response.data.data.carts
          this.final_total = response.data.data.final_total
          this.total = response.data.data.total
          // console.log(response)
        }).catch((error) => {
          alert(error.response.data.message)
        })
    }
  }
})
