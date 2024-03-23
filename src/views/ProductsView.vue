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

  <div class="container mt-md-5 mt-3 mb-7">
    <div class="row">
      <div class="col-md-3">
        <div class="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3 sticky-top"
          id="accordionExample">
          <div class="card border-0">
            <div
              class="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
              id="headingOne" data-bs-toggle="collapse" data-bs-target="#collapseOne">
              <div class="d-flex justify-content-between align-items-center pe-1">
                <h4 class="mb-0">
                  商品種類
                </h4>
                <i class="fas fa-chevron-down"></i>
              </div>
            </div>
            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div class="card-body py-0">
                <ul class="list-unstyled">
                  <li>
                    <RouterLink :to="`/products`" class="py-2 d-block text-muted text-decoration-none">
                      全部
                    </RouterLink>
                  </li>
                  <li v-for="item in categories" :key="item">
                    <RouterLink :to="`/products?category=${item}`" class="py-2 d-block text-muted text-decoration-none">
                      {{ item }}
                    </RouterLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <div class="row">
          <div class="col-lg-4 mb-5" v-for="(item) in products" v-bind:key="item.id">
            <div class="card border-0 mb- position-relative position-relative mx-2 h-100">
              <img :src="item.imageUrl" class="card-img-top rounded-0" :alt="item.title" style="object-fit:cover">
              <!-- <router-link to="" class="text-dark">
                <i class="far fa-heart position-absolute" style="right: 16px; top: 16px"></i>
              </router-link> -->
              <div class="card-body p-0">
                <div class="mt-3">
                  <div class="card-text text-muted mb-0">
                    <h4 class="mb-0">{{ item.title }}</h4>
                    <span class="badge bg-success">{{ item.category }}</span>
                    <p class="mb-0">{{ item.description }}</p>
                  </div>
                </div>
              </div>
              <div class="card-text mb-2 d-flex justify-content-end align-items-end ">
                <div v-if="item.origin_price === item.price">
                  <p class="mb-0 h5">${{ item.price }} 元</p>
                </div>
                <div v-else>
                  <p class="mb-0 text-secondary"><del>${{ item.origin_price }} 元</del></p>
                  <p class="mb-0 h5">${{ item.price }} 元</p>
                </div>
              </div>
              <div class="card-footer bg-transparent border-dark">
                <div class="d-grid gap-2 d-lg-block d-lg-flex justify-content-lg-between">
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
              </div>

            </div>
          </div>

        </div>
        <nav class="d-flex justify-content-center">
          <!-- pagination -->
          <PaginationComponents :pages="pagination" @emitPages="getData" />
        </nav>
      </div>
    </div>
  </div>

</template>

<script>
import PaginationComponents from '@/components/PaginationComponents.vue'
import cartStore from '@/stores/cartStore'
import { mapActions } from 'pinia'
import Swal from 'sweetalert2'
import axios from 'axios'
const { VITE_API_URL, VITE_API_PATH } = import.meta.env

export default {
  data () {
    return {
      products: [],
      isLoading: false,
      status: {
        loadingItem: ''
      },
      pagination: {},
      currentPage: 1,
      categories: ['香氛', '保濕', '潔淨']
    }
  },
  methods: {
    getData (page = 1) {
      this.currentPage = page
      const { category = '' } = this.$route.query
      // 取得產品資料
      this.isLoading = true
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/products?category=${category}&page=${page}` // 注意這裡的修改
      axios.get(url)
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.isLoading = false
        })
        .catch((err) => {
          this.isLoading = false
          Swal.fire({
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    getProduct (id) {
      this.$router.push(`product/${id}`)
    },
    ...mapActions(cartStore, ['addToCart'])

  },
  components: {
    PaginationComponents
  },
  watch: {
    '$route.query': {
      handler () {
        this.getData()
      },
      deep: true
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style scoped></style>
