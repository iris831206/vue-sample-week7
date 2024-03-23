<template>
  <VueLoading :active="isLoading">
    <div class="loadingio-spinner-ellipsis-tyhni0y6d0m">
      <div class="ldio-vxrwqxfvut">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </VueLoading>

  <div class="bg-light pt-5 pb-7">
    <div class="container">
      <div class="row justify-content-center flex-md-row flex-column-reverse">
        <div class="col-md-6">
          <div class="position-relative m-4">
            <div class="progress" role="progressbar" aria-label="Progress" aria-valuenow="50" aria-valuemin="0"
              aria-valuemax="100" style="height: 1px;">
              <div class="progress-bar" style="width: 100%;"></div>
            </div>
            <button type="button"
              class="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill"
              style="width: 2rem; height:2rem;">1</button>
            <button type="button"
              class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill"
              style="width: 2rem; height:2rem;">2</button>
            <button type="button"
              class="position-absolute top-0 start-100 translate-middle btn btn-sm btn-primary rounded-pill"
              style="width: 2rem; height:2rem;">3</button>
          </div>
          <div class="bg-white p-4">
            <div class="border p-4 mb-4">
              <h4 class="mb-4">訂單明細</h4>
              <div class="d-flex mt-3" v-for="item in order.products" :key="item.id">
                <img :src=item.product.imageUrl :alt="item.product.title" class="me-2"
                  style="width: 48px; height: 48px; object-fit: cover">
                <div class="w-100">
                  <div class="d-flex justify-content-between fw-bold">
                    <p class="mb-0">{{ item.product.title }}</p>
                    <p class="mb-0">x{{ item.qty }}/{{ item.product.unit }}</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p class="text-muted mb-0"><small>{{ item.product.price }}/{{ item.product.unit }}</small></p>
                    <p class="mb-0">小計 {{ item.final_total }} 元</p>
                  </div>
                </div>
              </div>

              <table class="table mt-4 border-top border-bottom text-muted">
                <tbody>
                  <tr>
                    <th scope="row" class="border-0 px-0 pt-4 font-weight-normal text-end">總計</th>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex justify-content-between mt-4">
                <p class="mb-0 h4 fw-bold">Total</p>
                <p class="mb-0 h4 fw-bold">NT${{ order.total }}</p>
              </div>
            </div>
            <h4 class="fw-bold mb-2">收件資訊</h4>
            <table class="table">
              <tbody>
                <tr>
                  <th width="100">Email</th>
                  <td>{{ order.user.email }}</td>
                </tr>
                <tr>
                  <th>姓名</th>
                  <td>{{ order.user.name }}</td>
                </tr>
                <tr>
                  <th>收件人電話</th>
                  <td>{{ order.user.tel }}</td>
                </tr>
                <tr>
                  <th>收件人地址</th>
                  <td>{{ order.user.address }}</td>
                </tr>
                <tr>

                </tr>
              </tbody>
            </table>
            <p class="text-end text-success fs-5 fw-bold">已完成訂購</p>
          </div>
          <div
            class="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end">
            <RouterLink to="/products" class="text-dark mt-md-0 mt-3 text-decoration-none">
              <i class="fas fa-chevron-left me-2"></i>繼續購物
            </RouterLink>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import cartStore from '@/stores/cartStore'
import { mapActions, mapState } from 'pinia'
import Swal from 'sweetalert2'
const { VITE_API_URL, VITE_API_PATH } = import.meta.env

export default {
  data () {
    return {
      order: {
        user: {}
      },
      orderId: ''
    }
  },
  methods: {
    randomValue () {
      this.value = Math.random() * this.max
    },
    ...mapActions(cartStore, ['addToCart']),
    ...mapActions(cartStore, ['getCart']),
    getOrder () {
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/order/${this.orderId}`
      this.isLoading = true
      this.$http.get(url).then((response) => {
        this.order = response.data.order
        this.isLoading = false
      }).catch((error) => {
        this.isLoading = false
        Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500
        })
      })
    },
    payOrder () {
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/pay/${this.orderId}`
      this.isLoading = true
      this.$http.post(url).then(() => {
        this.isLoading = false
        this.getOrder()
      }).catch((error) => {
        this.isLoading = false
        Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500
        })
      })
    }
  },
  computed: {
    ...mapState(cartStore, ['carts', 'total', 'final_total'])
  },
  mounted () {
    this.orderId = this.$route.params.orderId
    this.getOrder()
  }
}
</script>
