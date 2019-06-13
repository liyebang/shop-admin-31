import Vue from 'vue';
//引入插件
import Vuex from 'vuex';
//注册插件
Vue.use(Vuex)

//调用方法创建一个仓库  
const store = new Vuex.Store({
    //数据位置
    state:{
        user: JSON.parse(localStorage.getItem('user')) || {}
    },
    //设置仓库数据的方法
    mutations:{
        // state是默认的参数，所有mutations下的方法第一个参数都是state
        // state指向上面的仓库数据
        setUser(state,data){
            // state.user = data;

            //保存到本地
            localStorage.setItem('user',JSON.stringify(data))
        }
    }
})

export default store