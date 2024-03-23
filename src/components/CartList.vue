<template>
  <!-- Offcanvas 元件 -->
  <div class="offcanvas offcanvas-end" ref="offcanvasRight" tabindex="-1" id="offcanvasRight"
    aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasRightLabel">購物車列表</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <!-- Offcanvas 內容 -->
      <div class="table-responsive">
        <table class="table table-hover align-middle text-center">
          <thead>
            <tr>
              <th></th>
              <th>品名</th>
              <th>數量</th>
              <th>小計</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <template v-if="carts && carts.length > 0">
              <tr v-for="item in carts" :key="item.id">
                <td style="width: 150px">
                  <img :src="item.product.imageUrl" class="card-img-top rounded-0" style="object-fit:cover" alt="...">
                </td>
                <td style="width: 150px">
                  {{ item.product.title }}
                  <div class="text-success" v-if="item.coupon">已套用優惠</div>
                </td>
                <td>
                  <div class="input-group input-group-sm">
                    <select v-model="item.qty" @change="updateCart(item)">
                      <option v-for="item in 9" :key="item" :value="item">{{ item }}</option>
                    </select>

                    <div class="input-group-text">/ {{ item.product.unit }}</div>
                  </div>
                </td>
                <td style="width: 80px">
                  <small v-if="item.coupon" class="text-success">折扣價</small>
                  {{ item.final_total }}
                </td>
                <td>
                  <button type="button" class="btn btn-outline-danger btn-sm" :disabled="status.loadingItem === item.id"
                    @click="removeCartItem(item.id)">
                    <i class="bi bi-x"></i>
                  </button>
                </td>
              </tr>
            </template>

            <template v-else>
              <tr>
                <td colspan="5" class="text-center">目前沒有品項</td>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <button type="button" class="btn btn-outline-danger btn-sm mt-3" v-if="carts && carts.length > 0"
              @click="openDelCartModal">
              清除購物車
            </button>
            <tr class="text-end">
              <td colspan="5">總計 $ {{ total }} 元</td>
            </tr>
            <tr v-if="final_total !== total">
              <td colspan="5" class="text-end text-success">折扣價 {{ final_total }} 元</td>
            </tr>
          </tfoot>
        </table>
        <div class="input-group mb-3 input-group-sm" v-if="carts && carts.length > 0">
          <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼" />
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
              套用優惠碼
            </button>
          </div>
        </div>
      </div>
      <div class="d-grid gap-2 mx-auto" v-if="carts.length !== 0">
        <button class="btn btn-primary" type="button" @click="goOrder">結帳</button>
      </div>
    </div>
  </div>
  <!--delCouponModal-->
  <div class="modal fade" id="delModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true" ref="delCartModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">
            <span>清除購物車</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          是否刪除全部品項 (刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消
          </button>
          <button type="button" class="btn btn-danger" @click="deleteAllCarts">確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
  <!--delCouponModal-->

</template>

<script>
import Swal from 'sweetalert2'
import { Offcanvas, Modal } from 'bootstrap'
import { mapActions, mapState } from 'pinia'
import cartStore from '@/stores/cartStore'
const { VITE_API_URL, VITE_API_PATH } = import.meta.env

export default {
  data () {
    return {
      cartList: null,
      products: [],
      product: {},
      status: {
        loadingItem: ''
      },
      cart: {},
      isLoading: false,
      coupon_code: '',
      delCartModal: null
    }
  },
  methods: {
    ...mapActions(cartStore, ['getCart']),
    openModal () {
      this.cartList.show()
    },
    openDelCartModal () {
      this.delCartModal.show()
    },
    goOrder () {
      this.$router.push('cart')
      this.cartList.hide()
    },
    getProducts () {
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/products`
      this.isLoading = true
      this.$http.get(url).then((response) => {
        this.products = response.data.products
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
    getProduct (id) {
      this.$router.push(`product/${id}`)
    },
    ...mapActions(cartStore, ['addToCart']),
    // addToCart (id, qty = 1) {
    //   this.isLoading = true
    //   const url = `${VITE_API_URL}/api/${VITE_API_PATH}/cart`
    //   this.status.loadingItem = id
    //   const cart = {
    //     product_id: id,
    //     qty
    //   }

    //   this.$http.post(url, { data: cart }).then((response) => {
    //     this.status.loadingItem = ''
    //     this.isLoading = false
    //     this.getCart()
    //   }).catch((error) => {
    //     this.isLoading = false
    //     alert(error.response.data.message)
    //   })
    // },
    deleteAllCarts () {
      this.isLoading = true
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/carts`
      this.$http.delete(url).then((response) => {
        this.delCartModal.hide()
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
    ...mapActions(cartStore, ['getCart']),
    // getCart () {
    //   const url = `${VITE_API_URL}/api/${VITE_API_PATH}/cart`
    //   this.isLoading = true
    //   this.$http.get(url).then((response) => {
    //     this.cart = response.data.data
    //     this.isLoading = false
    //   }).catch((error) => {
    //     this.isLoading = false
    //     alert(error.response.data.message)
    //   })
    // },
    removeCartItem (id) {
      this.status.loadingItem = id
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/cart/${id}`
      this.isLoading = true
      this.$http.delete(url).then((response) => {
        Swal.fire({
          icon: 'success',
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500
        })
        this.status.loadingItem = ''
        this.isLoading = false
        this.getCart()
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
    updateCart (data) {
      this.isLoading = true
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/cart/${data.id}`
      const cart = {
        product_id: data.product_id,
        qty: data.qty
      }
      this.$http.put(url, { data: cart }).then((response) => {
        Swal.fire({
          icon: 'success',
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500
        })
        this.isLoading = false
        this.getCart()
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
    this.cartList = new Offcanvas(this.$refs.offcanvasRight)
    this.delCartModal = new Modal(this.$refs.delCartModal)
  }
}
</script>
