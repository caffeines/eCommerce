import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify, {
  theme: {
    primary: colors.blue - grey.base,
    secondary: colors.teal.base,
    accent: colors.light - blue.base,
    error: colors.red.base,
    warning: colors.yellow.base,
    info: colors.indigo.base,
    success: colors.green.base
  }
});
