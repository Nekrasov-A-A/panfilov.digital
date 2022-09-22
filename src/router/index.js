import Vue from 'vue';
import Router from 'vue-router';
import BookmarksMain from '../view/BookbarksMain';
import BookmarksActive from '../view/BookmarksActive';


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: BookmarksMain,
    },
    {
      path: '/:action',
      name: 'action',
      props: true,
      component: BookmarksActive,
    },
  ],
});
