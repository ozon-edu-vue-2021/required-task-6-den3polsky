import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import InfinityScrollPage from "@/components/pages/InfinityScrollPage.vue"
import SimpleTabelPage from "@/components/pages/SimpleTabelPage.vue"
import VirtualTabelPage from "@/components/pages/VirtualTabelPage.vue";

const routes = [
    {
      path: "/",
      component: SimpleTabelPage,
    },

    {
      path: "/infinity",
      component: InfinityScrollPage,
    },

    {
        path: "/virtual",
        component: VirtualTabelPage,
    }
]


const router = new VueRouter({ 
  routes,
});

export default router;
