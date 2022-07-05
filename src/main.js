import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/index.less";
import Vant from "vant";
// vant 样式依赖于less
import "vant/lib/index.less";

import "amfe-flexible";
import Icon from "@/components/Icon.vue";

import request from "@/utils/request";
request.get("/v1_0/channels").then((res) => {
  console.log(res.data.data.channels);
});
Vue.use(Vant);
Vue.config.productionTip = false;
Vue.component("Icon", Icon);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
