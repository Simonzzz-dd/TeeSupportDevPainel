
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/index.vue') },
      { path: '/createnew', component: () => import('pages/createNewPages.vue') },
      { path: '/staff', component: () => import('pages/staff.vue') },
      { path: '/permissions', component: () => import('pages/permissions.vue') },
    ]
  },
  {
    path: '/sign',
    component: () => import('pages/sign.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
