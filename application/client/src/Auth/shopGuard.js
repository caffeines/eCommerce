import store from ".././store";

export default (to, from, next) => {
  if (store.getters.user) {
    store.dispatch("getShop", { id: to.params.id });
    console.log("Enter", to.params.id);
    if (store.getters.shop.owner._id == store.getters.user._id) next();
  } else {
    console.log(from, to.params.id);
    next({
      path: "/shop"
    });
  }
};
