<template>
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <RouterLink to="/cart">購物車</RouterLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ product.title }}
          </li>
        </ol>
      </nav>
      <div class="row justify-content-center">
        <article class="col-8">
          <h2>{{ product.title }}</h2>
          <div>{{ product.content }}</div>
          <div>{{ product.description }}</div>
          <img :src="product.imageUrl" class="img-fluid mb-3" :alt="product.title">
        </article>
        <div class="col-4">
          <div class="h5" v-if="!product.price">{{ product.origin_price }} 元</div>
          <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
          <div class="h5" v-if="product.price">現在只要 {{ product.price }} 元</div>
          <hr>
          <button
            type="button"
            class="btn btn-outline-danger"
            @click="addToCart(product.id)"
          >
            加到購物車
          </button>
        </div>
      </div>
    </div>
  </template>

<script>
const { VITE_API_URL, VITE_API_PATH } = import.meta.env

export default {
  data () {
    return {
      isLoading: false,
      product: {},
      id: ''
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
    addToCart (id, qty = 1) {
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/cart`
      const cart = {
        product_id: id,
        qty
      }
      this.isLoading = true
      this.$http.post(url, { data: cart }).then((response) => {
        this.isLoading = false
        this.$router.push('/cart')
      }).catch((error) => {
        this.isLoading = false
        alert(error.response.data.message)
      })
    }
  },
  mounted () {
    this.id = this.$route.params.productId
    this.getProduct()
  }
}
</script>
