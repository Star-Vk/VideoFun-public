import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import mitt from 'mitt'
import { pinia } from './type'

//https://mod-api.xinpianchang.com/mod/api/v2/media/yM1l43vlAO2wod2V?appKey=61a2f329348b3bf77&extend=userInfo%2CuserStatus
//obj.props.pageProps.detail.media_id
//obj.props.pageProps.detail.video


export const mitter = mitt();

createApp(App)
.use(pinia)
.use(router)
.mount('#app')
