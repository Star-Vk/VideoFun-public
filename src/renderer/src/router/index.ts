import { createRouter, createWebHistory } from 'vue-router'

import HomePage from "@renderer/pages/Sidebar-MainPage.vue";
import SidebarUser from '@renderer/pages/Sidebar-User.vue';
import SidebarCollection from '@renderer/pages/Sidebar-Collection.vue';
import SidebarSetting from '@renderer/pages/Sidebar-Setting.vue';
import SearchExhibition from '@renderer/pages/Search-Exhibition.vue';


const routes = [
  { path: '/home', component: HomePage },
  { path: '/User', component: SidebarUser },
  { path: '/Collection', component: SidebarCollection },
  { path: '/Setting', component: SidebarSetting },
  { path: '/search',name:"search", component: SearchExhibition },
  { path: '/', redirect: '/home' },

]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})