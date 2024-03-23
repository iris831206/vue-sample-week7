<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand">Sunlight</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <RouterLink to="/products" class="nav-link">產品</RouterLink>
          <RouterLink to="/cart" class="nav-link">購物車</RouterLink>
          <!-- <RouterLink to="/blog" class="nav-link">貼文</RouterLink>
          <RouterLink to="/admin/products" class="nav-link">後台產品頁面</RouterLink> -->

        </div>
        <div class="navbar-nav ms-auto">
          <!-- Offcanvas 按鈕 -->
          <p class="nav-link btn btn-primary position-relative me-5 mb-0" @click="openCartList" style="width:50px">
            <i class="fas fa-shopping-cart"></i>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {{ carts.length }}
            </span>
            <span class="visually-hidden"></span>
          </p>
          <!-- Offcanvas 按鈕 -->
        </div>
      </div>
    </div>
  </nav>
  <div class="d-flex align-items-center justify-content-center" style="min-height: 400px;
   background-image: url('https://storage.googleapis.com/vue-course-api.appspot.com/iris831206/1711164877939.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=mAHFNagHoim9ObPMIvIQVo8Cfm115RBuRHN4FqfO42HfeQoWynJHLsIq9eTyLg4cMFdSyVDaH10pl97Rp2inMtM3J9X4i0Cr%2BgKcWrnO2QH76rZwbwEfU2qgV9zS6wDdwVmXg4zFjhEmXtjusbmQrGLdvKscMz1iH76CwEkSIxnvw9jEv89ZJMlWKHots%2FkCYnqxDZa2D%2FGsLqbJRx%2FcEo5DnxMUy6%2BLlyjB6YqrzZoGiLpeICcRqFHfqXSKtqmQt7LWzJ2RQmGCVfZ61p1cJuTzNTrJFPs8ke93l1MqaV6uSSK1WUI57rDsVSh7p53ptTf%2FFcrDLULrk28ai7j5kw%3D%3D');
   background-size: cover; background-position: center;">
    <div class="row justify-content-center my-auto">
      <div class="text-center">
        <h2 class="fw-bold">日安手作</h2>
        <RouterLink to="/products" v-if="topIndex_show" class="btn btn-dark rounded-0 mt-2" z-index="1060">
          選購商品
        </RouterLink>
      </div>
    </div>
  </div>

  <!-- Offcanvas -->
  <CartList ref="offcanvasRight">
  </CartList>
  <!-- Offcanvas -->

</template>

<script>
import { mapActions, mapState } from 'pinia'
import cartStore from '@/stores/cartStore'
import CartList from '@/components/CartList.vue'

export default {
  data () {
    return {
      topIndex_show: true,
      cartList: null
    }
  },
  methods: {
    ...mapActions(cartStore, ['getCart']),
    openCartList () {
      this.$refs.offcanvasRight.openModal()
    }
  },
  computed: {
    ...mapState(cartStore, ['carts'])
  },
  watch: {
    $route: function (item) {
      this.topIndex_show = item.path !== '/products'
    }
  },
  components: {
    CartList
  },
  mounted () {
    this.getCart()
  }
}
</script>
