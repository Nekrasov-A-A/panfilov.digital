import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bookmarksData: [
      { name: 'codewars', urlPath: 'https://www.codewars.com/dashboard' },
      { name: 'codewars2', urlPath: 'https://www.codewars.com/dashboard1' },
      { name: 'codewars3', urlPath: 'https://www.codewars.com/dashboard2' },
    ],
  },
  getters: {
    getBookmarks: s => [...s.bookmarksData].reverse(),
    getIdByUrlPath: s => urlPath => s.bookmarksData.findIndex(el => el.urlPath === urlPath),
  },
  mutations: {
    findIndexBookmarkAndRemove(state, payload) {
      const currentIndex = state.bookmarksData.findIndex(el => el.urlPath === payload);
      state.bookmarksData.splice(currentIndex, 1);
    },
    putDataOfItem(state, payload) {
      state.bookmarksData[payload.index].name = payload.name;
      state.bookmarksData[payload.index].urlPath = payload.urlPath;
    },
    setNewBookmark(state, payload) {
      state.bookmarksData.push(payload);
    },
  },
  actions: {
    deleteBookmark({ commit }, payload) {
      commit('findIndexBookmarkAndRemove', payload);
    },
    addBookmark({ commit }, payload) {
      commit('setNewBookmark', payload);
    },
    putBookmarkData({ commit }, payload) {
      commit('putDataOfItem', payload);
    },
  },
  modules: {},
});
