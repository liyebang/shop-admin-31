import Vue from 'vue';
import App from './App.vue';

//1.1导入组件
import ElementUi from 'element-ui';
import axios from 'axios';
import VueRouter from 'vue-router';

//1.2 element 样式
import 'element-ui/lib/theme-chalk/index.css';


//导入页面组件
import Login from './pages/Login.vue';
import Admin from './pages/Admin.vue';



//2注册组件
Vue.use(ElementUi);

//注册路由
Vue.use(VueRouter);

//配置路由
const routes = [
  { path:'/login', component: Login },
  { path:'/', component: Admin }
]

//路由实例
const router = new VueRouter({ routes });

Vue.config.productionTip = false;

//给Vue的原型绑定axios
Vue.prototype.$axios = axios;

new Vue({
  render: h => h(App),
  //挂载路由
  router
}).$mount('#app')
