import{_ as p,l as c,g as i,o as v,c as h,b as e,h as t,i as n,H as m,F as g,d as r}from"./index-COv797LT.js";var k={VITE_API_URL:"https://vue3-course-api.hexschool.io/v2",VITE_API_PATH:"iris831206",BASE_URL:"/vue-sample-week6/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_API_URL:d}=k,b={methods:{logout(){const s=`${d}/logout`;this.$http.post(s).then(a=>{alert(a.data.message),this.$router.push("/login")}).catch(a=>{alert(a.response.data.message)})},checkLogin(){const s=`${d}/api/user/check`;c.post(s).then(a=>{}).catch(a=>{alert(a.response.data.message),this.$router.push("/login")})}},mounted(){const s=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");c.defaults.headers.common.Authorization=s,this.checkLogin()}},f=e("h1",null,"這是後台",-1),x={class:"navbar navbar-expand-lg navbar-dark bg-dark"},V={class:"container-fluid"},$=e("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNavAltMarkup","aria-controls":"navbarNavAltMarkup","aria-expanded":"false","aria-label":"Toggle navigation"},[e("span",{class:"navbar-toggler-icon"})],-1),A={class:"collapse navbar-collapse",id:"navbarNavAltMarkup"},R={class:"navbar-nav"},E={class:"navbar-nav ms-auto"};function L(s,a,T,w,I,l){const o=i("RouterLink"),u=i("RouterView");return v(),h(g,null,[f,e("nav",x,[e("div",V,[t(o,{to:"/admin/products",class:"navbar-brand"},{default:n(()=>[r("HOME")]),_:1}),$,e("div",A,[e("div",R,[t(o,{to:"/admin/products",class:"nav-link"},{default:n(()=>[r("產品頁面")]),_:1}),t(o,{to:"/admin/order",class:"nav-link"},{default:n(()=>[r("訂單頁面")]),_:1}),t(o,{to:"/admin/coupon",class:"nav-link"},{default:n(()=>[r("優惠券頁面")]),_:1}),t(o,{to:"/admin/blog",class:"nav-link"},{default:n(()=>[r("貼文頁面")]),_:1}),t(o,{to:"/",class:"nav-link"},{default:n(()=>[r("回到前台")]),_:1})]),e("div",E,[e("a",{href:"#",onClick:a[0]||(a[0]=m((..._)=>l.logout&&l.logout(..._),["prevent"])),class:"nav-link me-3"},"登出")])])])]),t(u)],64)}const N=p(b,[["render",L]]);export{N as default};
