export const signinSet = state => {
  state.entry = false;
};
export const signupSet = state => {
  state.entry = true;
};
export const setAuthError = (state, payload) => {
  state.authError = payload;
};
export const setUser = (state, payload) => {
  state.user = payload;
};
export const setLoading = (state, payload) => {
  state.loading = payload;
};
export const clearUser = state => {
  state.user = null;
};
