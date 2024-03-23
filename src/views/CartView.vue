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
            <div class="progress" style="height: 1px;">
              <div class="progress-bar" role="progressbar" style="width: 50%;" aria-valuenow="50" aria-valuemin="0"
                aria-valuemax="100"></div>
            </div>
            <button type="button"
              class="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill"
              style="width: 2rem; height:2rem;">1</button>
            <button type="button"
              class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill"
              style="width: 2rem; height:2rem;">2</button>
            <button type="button"
              class="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill"
              style="width: 2rem; height:2rem;">3</button>
          </div>
          <div class="bg-white p-4">
            <h4 class="fw-bold mb-2">填寫收件資訊</h4>
            <div class="my-5 row justify-content-center">
              <VeeForm ref="form" v-slot="{ errors }" @submit="createOrder">
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <VeeField id="email" name="email" type="email" class="form-control"
                    :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email" rules="email|required"
                    v-model="form.user.email" />
                  <ErrorMessage name="email" class="invalid-feedback" />
                </div>

                <div class="mb-3">
                  <label for="name" class="form-label">收件人姓名</label>
                  <VeeField id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
                    placeholder="請輸入姓名" rules="required" v-model="form.user.name" />
                  <ErrorMessage name="姓名" class="invalid-feedback" />
                </div>

                <div class="mb-3">
                  <label for="tel" class="form-label">收件人電話</label>
                  <VeeField id="tel" name="電話" type="tel" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
                    placeholder="請輸入電話" rules="required|min:8|max:10" v-model="form.user.tel" />
                  <ErrorMessage name="電話" class="invalid-feedback" />
                </div>

                <div class="mb-3">
                  <label for="address" class="form-label">收件人地址</label>
                  <VeeField id="address" name="地址" type="text" class="form-control"
                    :class="{ 'is-invalid': errors['地址'] }" placeholder="請輸入地址" rules="required"
                    v-model="form.user.address" />
                  <ErrorMessage name="地址" class="invalid-feedback" />
                </div>

                <div class="mb-3">
                  <label for="message" class="form-label">留言</label>
                  <textarea name="" id="message" class="form-control" cols="30" rows="10"
                    v-model="form.message"></textarea>
                </div>
                <div class="text-end">
                  <button type="submit" class="btn btn-dark py-3 px-7 rounded-0">送出訂單</button>
                </div>
              </VeeForm>
            </div>
          </div>
          <div
            class="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end">
            <RouterLink to="/products" class="text-dark mt-md-0 mt-3 text-decoration-none">
              <i class="fas fa-chevron-left me-2"></i>繼續購物
            </RouterLink>
          </div>
        </div>
        <div class="col-md-4">
          <div class="border p-4 mb-4">
            <h4 class="mb-4">訂單明細</h4>
            <template v-if="carts && carts.length > 0">
              <div class="d-flex mt-3" v-for="item in carts" :key="item.id">
                <img :src="item.product.imageUrl" :alt="item.product.title" class="me-2"
                  style="width: 48px; height: 48px; object-fit: cover">
                <div class="w-100">
                  <div class="d-flex justify-content-between fw-bold">
                    <p class="mb-0">{{ item.product.title }}</p>
                    <p class="mb-0">x{{ item.qty }}</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p class="text-muted mb-0"><small>NT${{ item.product.price }}/{{ item.product.unit }}</small></p>
                    <template v-if="final_total !== total">
                      <span><del>原價{{ item.total }}</del> 折扣價<span class="text-success fs-5"> {{ item.final_total
                          }}元</span></span>
                    </template>
                    <template v-else>
                      <p class="mb-0">小計 {{ item.total }}</p>
                    </template>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="d-flex mt-3">
                <p class="mb-0">目前沒有品項</p>
              </div>
            </template>
            <table class="table mt-4 border-top border-bottom text-muted">
              <tbody>
                <tr>
                  <th scope="row" class="border-0 px-0 pt-4 font-weight-normal text-end">總計</th>
                </tr>
              </tbody>
            </table>
            <div class="d-flex justify-content-between mt-4">
              <p class="mb-0 h4 fw-bold">Total</p>
              <p class="mb-0 h4 fw-bold" :class="{ 'text-decoration-line-through': final_total !== total }">NT
                ${{ total }} 元</p>
            </div>
            <div class="d-flex justify-content-between mt-4" v-if="final_total !== total">
              <p class="mb-0 h4 fw-bold"> </p>
              <p class="mb-0 h4 fw-bold text-success">折扣價 {{ final_total }} 元</p>
            </div>
          </div>
          <div class="input-group mb-3 input-group-sm" v-if="carts && carts.length > 0">
            <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼" />
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                套用優惠碼
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Swal from 'sweetalert2'
import cartStore from '@/stores/cartStore'
import { mapActions, mapState } from 'pinia'
const { VITE_API_URL, VITE_API_PATH } = import.meta.env

export default {
  data () {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      isLoading: false,
      coupon_code: ''
    }
  },
  methods: {
    ...mapActions(cartStore, ['addToCart']),
    ...mapActions(cartStore, ['getCart']),
    createOrder () {
      this.isLoading = true
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/order`
      const order = this.form
      this.$http.post(url, { data: order }).then((response) => {
        this.$router.push(`checkout/${response.data.orderId}`)
        this.$refs.form.resetForm()
        this.getCart()
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
    addCouponCode () {
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/coupon`
      const coupon = {
        code: this.coupon_code
      }
      this.isLoading = true
      this.$http.post(url, { data: coupon }).then((response) => {
        Swal.fire({
          icon: 'success',
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500
        })
        this.getCart()
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
    }
  },
  computed: {
    ...mapState(cartStore, ['carts', 'total', 'final_total'])
  },
  mounted () {
    this.getCart()
  }
}
</script>
