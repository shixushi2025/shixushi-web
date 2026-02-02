import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";


import Home from '@/pages/Home.vue';
import ChinaTimeline from '@/pages/ChinaTimeline.vue';
import WorldTimeline from '@/pages/WorldTimeline.vue';
import EraList from '@/pages/EraList.vue';
import EraDetail from '@/pages/EraDetail.vue';
import EventDetail from '@/pages/EventDetail.vue';
import PeopleList from '@/pages/PeopleList.vue';
import PersonDetail from '@/pages/PersonDetail.vue';
import TopicsList from '@/pages/TopicsList.vue';
import TopicDetail from '@/pages/TopicDetail.vue';
import Search from '@/pages/Search.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: Home },
  { path: '/search', name: 'search', component: Search },

  { path: '/china', name: 'china', component: ChinaTimeline },
  { path: '/world', name: 'world', component: WorldTimeline },

  { path: '/era', name: 'era-list', component: EraList },
  { path: '/era/:slug', name: 'era-detail', component: EraDetail, props: true },

  { path: '/event/:idSlug', name: 'event-detail', component: EventDetail, props: true },

  { path: '/people', name: 'people-list', component: PeopleList },
  { path: '/people/:idSlug', name: 'person-detail', component: PersonDetail, props: true },

  { path: '/topics', name: 'topics-list', component: TopicsList },
  { path: '/topics/:slug', name: 'topic-detail', component: TopicDetail, props: true },

  // 简单 404
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
