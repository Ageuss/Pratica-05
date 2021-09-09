import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import ShowFuncs from "../Pages/ShowFuncs.vue";
import EditFunc from "../Pages/EditFunc.vue";
import FilterCargos from "../Pages/FilterCargos.vue"
import FilterQtd from "../Pages/FilterQtd.vue"
import UniqueFunc from "../Pages/UniqueFunc.vue"


const routes = [
  {
    path: '/employee',
    component: ShowFuncs
  },
  {
    path: '/',
    component: ShowFuncs
  },
  {
    path: '/edit/:id',
    component: EditFunc
  },
  {
    path: '/qtd/:qtd',
    component: FilterQtd
  },
  {
    path: '/employee/:id',
    component: UniqueFunc
  },
  {
    path: '/office/:office',
    component: FilterCargos
  }
];


const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;