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
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <template v-for="article in articles" :key="article.id">
        <div class="col" v-if="article.isPublic">
          <div class="card">
            <img :src="article.imageUrl" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">{{ article.title }}</h5>
              <div v-html="article.description"></div>
            </div>
            <div class="card-footer">
              <RouterLink :to="`/article/${article.id}`" v-if="article.isPublic" class="btn btn-outline-primary">
                文章頁面
              </RouterLink>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
const { VITE_API_URL, VITE_API_PATH } = import.meta.env

export default {
  data () {
    return {
      articles: [],
      isLoading: false,
      isNew: false,
      tempArticle: {}
    }
  },
  methods: {
    getArticles (page = 1) {
      const api = `${VITE_API_URL}/api/${VITE_API_PATH}/articles?page=${page}`
      this.isLoading = true
      this.$http.get(api).then((response) => {
        this.articles = response.data.articles
        this.pagination = response.data.pagination
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
  mounted () {
    this.getArticles()
  }
}
</script>

<style scoped></style>
