import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";

Vue.use(Vuetify, {
  iconfont: "md",
  theme: {
    primary: "#34aa8e",
    secondary: "#3f51b5",
    accent: "#03a9f4",
    error: "#f44336",
    info: "#00acc1",
    success: "#4CAF50",
    warning: "#FB8C00"
  }
});
