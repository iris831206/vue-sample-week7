import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
import axios from 'axios'
const { VITE_API_URL, VITE_API_PATH } = import.meta.env

export default defineStore('cartStore', {
  state: () => {
    return {
      carts: [],
      total: 0,
      final_total: 0
    }
  },
  actions: {
    getCart () {
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/cart`
      axios.get(url)
        .then((response) => {
          this.carts = response.data.data.carts
          this.final_total = response.data.data.final_total
          this.total = response.data.data.total
        }).catch((error) => {
          Swal.fire({
            icon: 'error',
            title: error.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    addToCart (id, qty = 1) {
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/cart`
      const cart = {
        product_id: id,
        qty
      }
      axios.post(url, { data: cart }).then((response) => {
        Swal.fire({
          icon: 'success',
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500
        })
        this.getCart()
      }).catch((error) => {
        Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500
        })
      })
    }
  }
  // getters: {
  //   cartList: () => {
  //     return {
  //       carts: [],
  //       total: 0,
  //       final_total: 0
  //     }
  //   }
  // }
})
