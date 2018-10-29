import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  state: {
    current_music: '',
    current_playlist: '',
    music: {},
    playlist: {'기본 재생목록': []},
  },
  mutations: {
    setCurrentMusic(state: any, payload) {
      state.current_music = payload;
    },
    setCurrentPlayList(state: any, payload) {
      state.current_playlist = payload;
    },
    setMusic(state: any, payload) {
      state.music = payload;
    },
    setPlayList(state: any, payload) {
      state.playlist = payload;
    },
  },
  actions: {
    setCurrentMusic(context, payload) {
      context.commit('setCurrentMusic', payload);
    },
    setCurrentPlayList(context, payload) {
      context.commit('setCurrentPlayList', payload);
    },
    addMusic(context, payload) {
      const original = context.state.music;
      original[`${payload.type}-${payload.id}`] = payload;
      context.commit('setMusic', original);
    },
    addPlayList(context, payload) {
      const original = context.state.playlist;
      original[payload.name] = [];
      context.commit('setPlayList', original);
    },
    addPlayListItem(context, payload) {
      const original = context.state.playlist;
      original[payload.name].push(payload.data);
      context.commit('setPlayList', original);
    },
    setPlayListItem(context, payload) {
      const original = context.state.playlist;
      original[payload.name] = payload.data;
      context.commit('setPlayList', original);
    },
    removePlayList(context, payload) {
      const original = context.state.playlist;
      delete original[payload.name];
      context.commit('setPlayList', original);
    },
  },
  plugins: [vuexLocal.plugin],
});
