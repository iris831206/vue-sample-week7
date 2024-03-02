<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">HOME</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <RouterLink to="/products" class="nav-link">產品</RouterLink>
          <RouterLink to="/cart" class="nav-link">購物車</RouterLink>
          <RouterLink to="/blog" class="nav-link">貼文</RouterLink>
          <RouterLink to="/admin/products" class="nav-link">後台產品頁面</RouterLink>

        </div>
        <div class="navbar-nav ms-auto">
          <RouterLink to="/cart" class="nav-link btn btn-primary position-relative me-7">
            <i class="fas fa-shopping-cart"></i>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {{ this.carts.length }}
            </span>
            <span class="visually-hidden"></span>
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import cartStore from '@/stores/cartStore'

export default {
  data () {
    return {
    }
  },
  methods: {
    ...mapActions(cartStore, ['getCart'])
  },
  computed: {
    ...mapState(cartStore, ['carts'])
  },
  mounted () {
    this.getCart()
  }
}
</script>
