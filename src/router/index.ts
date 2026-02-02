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
  { 
    path: '/', 
    name: 'home', 
    component: Home,
    meta: { title: '首页 - 纵览五千年文明脉络' }
  },
  { 
    path: '/china', 
    name: 'china', 
    component: ChinaTimeline,
    meta: { title: '中国历史时间线' }
  },
  { 
    path: '/world', 
    name: 'world', 
    component: WorldTimeline,
    meta: { title: '世界重大事件对照' }
  },
  { 
    path: '/era', 
    name: 'era-list', 
    component: EraList,
    meta: { title: '历代朝代索引' }
  },
  { 
    path: '/era/:slug', 
    name: 'era-detail', 
    component: EraDetail, 
    props: true,
    meta: { title: '朝代详情' } // Component handles dynamic title
  },
  { 
    path: '/event/:idSlug', 
    name: 'event-detail', 
    component: EventDetail, 
    props: true,
    meta: { title: '事件详情' } // Component handles dynamic title
  },
  { 
    path: '/people', 
    name: 'people-list', 
    component: PeopleList,
    meta: { title: '历史风云人物' }
  },
  { 
    path: '/people/:idSlug', 
    name: 'person-detail', 
    component: PersonDetail, 
    props: true,
    meta: { title: '人物详情' } // Component handles dynamic title
  },
  { 
    path: '/topics', 
    name: 'topics-list', 
    component: TopicsList,
    meta: { title: '历史专题索引' }
  },
  { 
    path: '/topics/:slug', 
    name: 'topic-detail', 
    component: TopicDetail, 
    props: true,
    meta: { title: '专题详情' } // Component handles dynamic title
  },
  { 
    path: '/search', 
    name: 'search', 
    component: Search,
    meta: { title: '全站搜索' }
  },
  // 简单 404
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

const DEFAULT_TITLE = '时序史 · 时间宇宙';

router.afterEach((to) => {
  const title = to.meta.title as string;
  if (title) {
    document.title = `${title} | ${DEFAULT_TITLE}`;
  } else {
    document.title = DEFAULT_TITLE;
  }
});

export default router;
