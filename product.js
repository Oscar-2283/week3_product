import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

let myModal = '';
let deleteModal = '';
createApp({
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'test8283',
      products: [],
      is_new: true,
      temp: {
        imagesUrl: [],
      },
    };
  },
  methods: {
    checkAdmin() {
      axios
        .post(`${this.url}/api/user/check`)
        .then(() => {
          this.getProduct();
        })
        .catch((err) => {
          alert(err.response.data.message);
          location.href = 'login.html';
        });
    },
    openModal(state, item) {
      switch (state) {
        case 'new':
          this.temp = {};
          myModal.show();
          this.is_new = true;
          break;
        case 'edit':
          this.temp = { ...item };
          this.is_new = false;
          myModal.show();
          break;
        case 'delete':
          this.temp = { ...item };
          deleteModal.show();
          break;
      }
    },
    closeModal() {
      myModal.hide();
    },
    getProduct() {
      axios
        .get(`${this.url}/api/${this.path}/admin/products`)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => console.log(err.response));
    },
    addProduct(is_new) {
      if (is_new) {
        axios
          .post(`${this.url}/api/${this.path}/admin/product`, {
            data: this.temp,
          })
          .then((res) => {
            alert(res.data.message);
            myModal.hide();
            this.getProduct();
          })
          .catch((err) => console.dir(err));
      } else {
        axios
          .put(`${this.url}/api/${this.path}/admin/product/${this.temp.id}`, {
            data: this.temp,
          })
          .then((res) => {
            alert(res.data.message);
            myModal.hide();
            this.getProduct();
          })
          .catch((err) => console.dir(err));
      }
    },
    deleteProduct(id) {
      axios
        .delete(`${this.url}/api/${this.path}/admin/product/${id}`)
        .then((res) => {
          alert(res.data.message);
          deleteModal.hide();
          this.getProduct();
        })
        .catch((err) => console.dir(err));
    },
    createImages() {
      this.temp.imagesUrl = [];
      this.temp.imagesUrl.push('');
    },
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    axios.defaults.headers.common['Authorization'] = token;
    this.checkAdmin();
    myModal = new bootstrap.Modal(document.querySelector('#productModal'));
    deleteModal = new bootstrap.Modal(
      document.querySelector('#delProductModal')
    );
  },
}).mount('#app');
