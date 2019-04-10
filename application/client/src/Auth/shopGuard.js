import store from "../store";

export default (to, from, next) => {
  if (store.getters.user) {
    store.dispatch("getShop", { id: to.params.id });
    if (store.getters.shop.owner._id == store.getters.user._id)
      next({ path: to });
  } else {
    next({
      path: "/shop"
    });
  }
};
