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
      <div class="container">

    <div class="row justify-content-between mt-4">
      <div class="col-md-6">
        <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <RouterLink to="/products">產品列表</RouterLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ product.title }}
          </li>
        </ol>
      </nav>
        <div>
          <img
            :src="product.imageUrl"
            alt="" class="img-fluid">
        </div>

      </div>
      <div class="col-md-6 align-self-end">
        <h2 class="text-end mt-2">{{ product.title }}</h2>
        <p class="fw-bold fs-4 text-end mb-5">NT ${{ product.price }} 元</p>
        <p>
          {{ product.description }}
        </p>
        <div class="input-group border mt-3">
          <div class="input-group-prepend">
            <button @click="qty > 1 && (qty--)" :disabled="qty <= 1" class="btn btn-outline-dark rounded-0 border-0 py-3" type="button" id="button-addon1">
              <i class="fas fa-minus"></i>
            </button>
          </div>
          <input readonly min="1" type="number" v-model="qty" class="form-control border-0 text-center my-auto shadow-none" placeholder=""
            aria-label="Example text with button addon" aria-describedby="button-addon1" value="1">
          <div class="input-group-append">
            <button @click="qty++" class="btn btn-outline-dark rounded-0 border-0 py-3" type="button" id="button-addon2">
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <div class="btn btn-dark btn-block rounded-0 py-3" @click="addToCart(product.id,qty)" >加入購物車</div>
        </div>
      </div>

    </div>
    <div class="row justify-content-between mt-4">
      <div>
        <div class="card text-dark bg-light mb-5 p-0">
          <div class="card-header">商品說明</div>
          <div class="card-body">
            <div class="card-text">
            <p class="mb-0">每塊皂的重量約100g，誤差在 5% 以內，保障您的消費權益。</p>
            <p class="mb-0">恰到好處的大小，給您良好的手握感。</p>
            <p class="mb-0">經過 30~90 天的熟成乾燥後才包裝上架，以確保品質。</p>
            <p class="mb-0">成品皂體細密緊緻，不含防腐劑、抗氧化劑，可保存二年。</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  <div class="row justify-content-between mt-4">
      <div class="bg-light">
    <div class="container">
      <h4 class="mt-5 fw-bold">推薦商品</h4>
      <div class="row justify-content-center py-5">
      <ProductSwiper />
    </div>
  </div>
</div>
</div>
  </template>

<script>
import ProductSwiper from '@/components/ProductSwiper.vue'
import cartStore from '@/stores/cartStore'
import { mapActions } from 'pinia'
const { VITE_API_URL, VITE_API_PATH } = import.meta.env

export default {
  data () {
    return {
      isLoading: false,
      product: {},
      id: '',
      qty: 1
    }
  },
  methods: {
    getProduct () {
      const api = `${VITE_API_URL}/api/${VITE_API_PATH}/product/${this.id}`
      this.isLoading = true
      this.$http.get(api).then((response) => {
        this.product = response.data.product
        this.isLoading = false
      })
    },
    ...mapActions(cartStore, ['addToCart'])
  },
  components: {
    ProductSwiper
  },
  mounted () {
    this.id = this.$route.params.productId
    this.getProduct()
  }
}
</script>
