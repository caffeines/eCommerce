// @ts-nocheck
import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Signin from "./views/Signin.vue";
import userGuard from "./Auth/userGuard";
import shopGuard from "./Auth/shopGuard";
import Profile from "./views/Profile";
import ProductView from "./views/SingleProductView";
Vue.use(Router);

export default new Router({
  mode: "history",
  hashbang: false,
  base: process.env.BASE_URL,
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
      path: "/dashboard/:dashboardRouteId",
      name: "dashboard",
      component: () => import("./views/Dashboard.vue"),
      beforeEnter: shopGuard,
      props: true
    },
    {
      path: "/shop/",
      name: "shop",
      component: () => import("./views/Allshop.vue")
    },
    {
      path: "/shop/:shopRouteId",
      name: "shopView",
      component: () => import("./views/ShopView.vue"),
      props: true
    },
    {
      path: "/product/:productRouteId",
      name: "productView",
      component: ProductView,
      props: true
    },
    {
      path: "/category",
      name: "category",
      component: () => import("./views/Category.vue")
    },
    {
      path: "/category/:categoryId",
      name: "categoryView",
      component: () => import("./views/ProductByCategory.vue"),
      props: true
    },
    {
      path: "/cart",
      name: "cartView",
      component: () => import("./views/Cart.vue")
    },
    {
      path: "/*",
      name: "error",
      component: () => import("./views/Error.vue")
    }
  ]
});
