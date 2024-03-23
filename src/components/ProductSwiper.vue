<template>
  <swiper :slidesPerView="3" :spaceBetween="30" :loop="true" :pagination="{
    clickable: true,
  }" :modules="modules" class="mySwiper">
    <swiper-slide v-for="item in products" :key="item.id">
      <div class="card border-0 mb-4 position-relative position-relative" @click="getProduct(item.id)">
        <img :src="item.imageUrl" class="card-img-top rounded-0" :alt="item.title">
        <div class="card-body p-0">
          <h5 class="text-dark mt-3 text-decoration-none">{{ item.title }}</h5>
          <p class="card-text mb-0"> $ {{ item.price }} 元</p>
          <p class="text-muted mt-3"></p>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'

// import required modules
import { Pagination } from 'swiper/modules'
import productStore from '@/stores/productStore'
import { mapActions, mapState } from 'pinia'

export default {
  methods: {
    ...mapActions(productStore, ['getData']),
    getProduct (id) {
      // 導航到產品詳情頁面
      this.$router.push({ path: `/product/${id}` }).then(() => {
        // 在導航完成後，重新載入頁面
        window.location.reload()
      })
    }
  },
  computed: {
    ...mapState(productStore, ['products'])
  },
  mounted () {
    this.getData()
  },
  components: {
    Swiper,
    SwiperSlide
  },
  setup () {
    return {
      modules: [Pagination]
    }
  }
}
</script>

<style>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide:hover {
  border: 3px solid #ccc;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
