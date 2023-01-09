import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  data(){
    return{
      user:{
        username:"",
        password:""
      }
    }
  },
  methods:{
    login(){
      const url = 'https://vue3-course-api.hexschool.io/v2/admin/signin'
      axios.post( url , this.user)
        .then(res=>{
          const { token ,expired} = res.data
          document.cookie = `myToken=${token}; expires=${new Date(expired)};`
          location.href ="product.html"
        })
        .catch(err => console.log(err.response))
    }
  }
}).mount('#app')