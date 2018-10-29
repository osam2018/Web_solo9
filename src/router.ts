import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {layout: 'single'},
      component: Home,
    },
    {
      path: '/player',
      name: 'player',
      component: () => import(/* webpackChunkName: "player" */ './views/Player.vue'),
    },
    {
      path: '/playlist',
      name: 'playlist',
      component: () => import(/* webpackChunkName: "playlist" */ './views/PlayList.vue'),
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import(/* webpackChunkName: "upload" */ './views/Upload.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "search" */ './views/Search.vue'),
    },
    {
      path: '/chart',
      name: 'chart',
      component: () => import(/* webpackChunkName: "chart" */ './views/Chart.vue'),
    },
  ],
});
