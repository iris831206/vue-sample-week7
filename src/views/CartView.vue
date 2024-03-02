<template>
    <VueLoading :active="isLoading" :z-index="1060" />

  <div class="container">
    <div class="mt-4">
      <!-- 產品列表 -->
      <table class="table align-middle">
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th>功能</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td style="width: 200px">
              <div style="
                  height: 100px;
                  background-size: cover;
                  background-position: center;
                  " :style="{ backgroundImage: `url(${item.imageUrl})` }"></div>
            </td>
            <td>
              <a href="#" class="text-dark">{{ item.title }}</a>
            </td>
            <td>
              <div class="h5" v-if="!item.price">
                {{ item.origin_price }} 元
              </div>
              <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
              <div class="h5" v-if="item.price">
                現在只要 {{ item.price }} 元
              </div>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <button type="button" class="btn btn-outline-secondary"
                  :disabled="status.loadingItem === item.id || !item.is_enabled" @click="getProduct(item.id)">
                  <span class="spinner-border spinner-grow-sm" v-if="status.loadingItem === item.id"></span>
                  查看更多
                </button>
                <button type="button" class="btn btn-outline-danger" @click="addToCart(item.id)"
                  :disabled="status.loadingItem === item.id || !item.is_enabled">
                  <span class="spinner-border spinner-grow-sm" v-if="status.loadingItem === item.id"></span>
                  加到購物車
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 購物車列表 -->
      <div class="text-end">
        <button class="btn btn-outline-danger" type="button" @click="openDelCartModal">
          清空購物車
        </button>
      </div>
      <table class="table align-middle">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 135px">數量</th>
            <th>小計</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="carts && carts.length > 0">
            <tr v-for="item in carts" :key="item.id">
              <td>
                <button type="button" class="btn btn-outline-danger btn-sm" :disabled="status.loadingItem === item.id"
                  @click="removeCartItem(item.id)">
                  <i class="bi bi-x"></i>
                </button>
              </td>
              <td>
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">已套用優惠券</div>
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <input type="number" class="form-control" min="1" v-model.number="item.qty"
                    @blur="updateCart(item)" />
                  <div class="input-group-text">/ {{ item.product.unit }}</div>
                </div>
              </td>
              <td class="text-end">
                <small v-if="final_total !== total" class="text-success">折扣價：</small>
                {{ item.final_total }}
              </td>
            </tr>
          </template>

          <template v-else>
            <tr>
              <td colspan="4" class="text-center">目前沒有品項</td>
            </tr>
          </template>
        </tbody>

        <tfoot>
          <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">{{ total }}</td>
          </tr>
          <tr v-if="final_total !== total">
            <td colspan="3" class="text-end text-success">折扣價</td>
            <td class="text-end text-success">
              {{ final_total }}
            </td>
          </tr>
        </tfoot>
      </table>
      <div class="input-group mb-3 input-group-sm">
        <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
            套用優惠碼
          </button>
        </div>
      </div>
    </div>

    <div class="my-5 row justify-content-center">
      <VeeForm ref="form" class="col-md-6" v-slot="{ errors }" @submit="createOrder">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <VeeField id="email" name="email" type="email" class="form-control" :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email" rules="email|required" v-model="form.user.email" />
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
          <VeeField id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址" rules="required" v-model="form.user.address" />
          <ErrorMessage name="地址" class="invalid-feedback" />
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea name="" id="message" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-danger">送出訂單</button>
        </div>
      </VeeForm>
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
import cartStore from '@/stores/cartStore'
import { mapActions, mapState } from 'pinia'
import { Modal } from 'bootstrap'
const { VITE_API_URL, VITE_API_PATH } = import.meta.env

export default {
  data () {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: ''
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      cart: {},
      isLoading: false,
      coupon_code: '',
      delCartModal: null
    }
  },
  methods: {
    openDelCartModal () {
      this.delCartModal.show()
    },
    getProducts () {
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/products`
      this.isLoading = true
      this.$http.get(url).then((response) => {
        this.products = response.data.products
        this.isLoading = false
      }).catch((error) => {
        this.isLoading = false
        alert(error.response.data.message)
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
        alert(error.response.data.message)
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
        alert(response.data.message)
        this.status.loadingItem = ''
        this.isLoading = false
        this.getCart()
      }).catch((error) => {
        this.isLoading = false
        alert(error.response.data.message)
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
        alert(response.data.message)
        this.isLoading = false
        this.getCart()
      }).catch((error) => {
        this.isLoading = false
        alert(error.response.data.message)
      })
    },
    addCouponCode () {
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/coupon`
      const coupon = {
        code: this.coupon_code
      }
      this.isLoading = true
      this.$http.post(url, { data: coupon }).then((response) => {
        alert(response.data.message)
        this.getCart()
        this.isLoading = false
      }).catch((error) => {
        this.isLoading = false
        alert(error.response.data.message)
      })
    },
    createOrder () {
      this.isLoading = true
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/order`
      const order = this.form
      this.$http.post(url, { data: order }).then((response) => {
        this.$router.push(`checkout/${response.data.orderId}`)
        this.$refs.form.resetForm()
        this.isLoading = false
      }).catch((error) => {
        this.isLoading = false
        alert(error.response.data.message)
      })
    }
  },
  computed: {
    ...mapState(cartStore, ['carts', 'total', 'final_total'])
  },
  mounted () {
    this.delCartModal = new Modal(this.$refs.delCartModal)
    this.getProducts()
    this.getCart()
  }
}
</script>
