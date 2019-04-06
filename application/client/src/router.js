// @ts-nocheck
import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Signin from "./views/Signin.vue";
import userGuard from "./Auth/userGuard";
import Profile from "./views/Profile";
Vue.use(Router);

export default new Router({
  mode: "history",
  //base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/signin",
      name: "signin",
      component: Signin
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("./views/Signin.vue")
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      beforeEnter: userGuard
    },
    {
      path: "/create",
      name: "create",
      component: () => import("./views/Create.vue"),
      beforeEnter: userGuard
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("./views/Dashboard.vue"),
      beforeEnter: userGuard
    },
    {
      path: "/shop/",
      name: "shop",
      component: () => import("./views/Shop.vue")
    },
    {
      path: "/shop/:id",
      name: "shopView",
      component: () => import("./views/ShopView.vue")
    },

    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
