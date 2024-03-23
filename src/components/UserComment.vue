<template>
  <swiper :loop="true" :spaceBetween="30" :centeredSlides="true" :autoplay="{
    delay: 3500,
    disableOnInteraction: false,
  }" :pagination="{
    clickable: true,
  }" :navigation="true" :modules="modules" class="mySwiper">
    <swiper-slide>
      <div class="row justify-content-center py-5">
        <div class="col-md-8 d-flex">
          <img
            src="https://storage.googleapis.com/vue-course-api.appspot.com/iris831206/1711166571685.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=d89qe7RNtRla7QP%2B5Cg4hk5jphQsZZRXmBnd6jAnov%2FIsHhxnP11QZzvqkDSYilFToHVjhh%2FRZkTbKbmgjOFRCIreUUUD2yVpY3T8ZfEAFzXzfzACLVdf3bnKyFFwM7CDkLJS5CkLsgjcnchFlkzSxlP%2FmBhjStWkRmNaZqF1lJkzdkX0DWmR4KlPwO13tIlaotrbztpUOhdaose01YOwKe%2FhXyPONqpSjDKO1tg%2FOYVZL7eWxRrJ9XihIcO3tZJjUs1LzfNHQO26RqvmExG9vsuvIri29vFJDleZKHBMN6OKktrpmKsUBfbbl34KwaUqrtK39GFYE9aTzXXPjBRgQ%3D%3D"
            alt="" class="rounded-circle me-5" style="width: 160px; height: 160px; object-fit: cover;">
          <div class="d-flex flex-column">
            <p class="h5 text-start">
              “每次我使用這款香皂時，我都感到非常驚艷和滿足，讓我不禁想要與他人分享。它的泡沫豐富而綿密，能輕易洗淨雜質和污垢，在使用後也不會感到乾燥或緊繃，而是讓我的肌膚感覺柔軟、滋潤和清新。”</p>
            <p class="mt-auto text-end">──來自愛用者 Amily</p>
          </div>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="row justify-content-center py-5">
        <div class="col-md-8 d-flex">
          <img
            src="https://storage.googleapis.com/vue-course-api.appspot.com/iris831206/1711166565954.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=WhUMdLiITv19ZQ5tXrLhv8pGyUNCxKyCZlufWCqdfc9nMxgN47AA8TKke6YZbDH54TJ0E10DrQWKQLFeBgd8PSv05xhYbCgyiHcN0iOGkdq9qo9zCSZ2SMdXpNvW0hUV5OqMzLEzuebPy0qDg12Hqb8EIyAXFUL524cwhcRTY2a0ZcuT8SVNuyclCLkXOtMbomYpFGxwJnaUw17%2Be3D9OiXHGAxqlz3YPyiRQ2Ap1SU40bGUmzszLwRmt3jNIps6%2Bm%2Br5Xp8ZWCUvDFgUGfMAwGVl5ClBzGJHX%2Bvm7ww%2F0atBqY4563oFFvdp7gYUSMKBBe6CWHkWCTNb6I2r1onhg%3D%3D"
            alt="" class="rounded-circle me-5" style="width: 160px; height: 160px; object-fit: cover;">
          <div class="d-flex flex-column">
            <p class="h5 text-start">
              “除了溫和護膚的效果，這款香皂的香氣也令人愉悅。它散發出天然而清新的氣息，讓我沐浴時彷彿置身於大自然中。每次使用後，我都感到身心俱體地放松和愉悅。”</p>
            <p class="mt-auto text-end">──來自愛用者 Betty</p>
          </div>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="row justify-content-center py-5">
        <div class="col-md-8 d-flex">
          <img
            src="https://storage.googleapis.com/vue-course-api.appspot.com/iris831206/1711166713268.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Ar5drBOGUBr5sjg64wxYyY7rYq6MNo0AHotivo%2F9RxNqMNRgnIM9ETV%2F63stA2Q5%2BSYY3kWP5OVGCG2uUlJB5m7rQ4zgveXC%2BmXAp%2Bof7atf0tZYVLd3B4ian%2Bvb2nyHxLPIeb8DMZGvE%2BJU%2Br6AdEhBTZplCVGKqSmo6sr5g7418PxL0M4IDOMUaP%2FgdpiQY42KVtlCuYpVMw9C8lf%2F%2By1aKBuAy%2FV0YvPvsEzbJFoHocIVsHitOY6uH668nJxOLp%2BSP0w1Y%2Fm09dazG28rpoV%2BMwvZSF6r8W%2Fv2p4hBAitpyiQW4KYWWLtP84DBxNcUDlOWK%2BcHJ0muTxXY3Aylg%3D%3D"
            alt="" class="rounded-circle me-5" style="width: 160px; height: 160px; object-fit: cover;">
          <div class="d-flex flex-column">
            <p class="h5 text-start">
              “最令我驚訝的是，這款香皂對於敏感肌膚非常友善。以往，我經常遇到使用其他品牌香皂時引發的刺痛和紅腫問題，但這款香皂沒有出現任何不適反應。它的溫和配方非常適合敏感性肌膚的人使用。”</p>
            <p class="mt-auto text-end">──來自愛用者 Alex</p>
          </div>
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
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  setup () {
    return {
      modules: [Autoplay, Pagination, Navigation]
    }
  }
}
</script>
<style>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;

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
