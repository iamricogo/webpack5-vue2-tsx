import { guards } from '@/router/permission'
import Layout from '@/layout'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
Vue.use(VueRouter)

export const constantRoutes: RouteConfig[] = [
  {
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    meta: {
      title: 'home'
    },
    children: [
      {
        path: 'index',
        component: () =>
          import(/* webpackChunkName: "home_index" */ '@/views/home'),
        name: 'Home',
        meta: {
          title: 'home'
        }
      }
    ]
  },
  {
    path: '/about_us',
    component: Layout,
    redirect: '/about_us/index',
    meta: {
      title: 'about_us'
    },
    children: [
      {
        path: 'index',
        component: () =>
          import(/* webpackChunkName: "about_us_index" */ '@/views/about_us'),
        name: 'AboutUs',
        meta: {
          title: 'about_us'
        }
      }
    ]
  },
  {
    path: '/download',
    component: Layout,
    redirect: '/download/index',
    meta: {
      title: 'download'
    },
    children: [
      {
        path: 'index',
        component: () =>
          import(/* webpackChunkName: "download_index" */ '@/views/download'),
        name: 'Download',
        meta: {
          title: 'download'
        }
      }
    ]
  },
  {
    path: '/contact_us',
    component: Layout,
    redirect: '/contact_us/index',
    meta: {
      title: 'contact_us'
    },
    children: [
      {
        path: 'index',
        component: () =>
          import(
            /* webpackChunkName: "contact_us_index" */ '@/views/contact_us'
          ),
        name: 'ContactUs',
        meta: {
          title: 'contact_us'
        }
      },
      {
        path: 'why_us',
        component: () =>
          import(/* webpackChunkName: "contact_us_why_us" */ '@/views/why_us'),
        name: 'WhyUs',
        meta: {
          title: 'why_us'
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },

  routes: [
    {
      path: '/',
      redirect: '/home'
    },

    ...constantRoutes,
    {
      path: '*',
      redirect: '/home'
    }
  ]
})

guards(router)

export default router
