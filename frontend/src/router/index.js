import { createRouter, createWebHistory } from 'vue-router';
import Catalog from '../views/Catalog.vue';
import SkinDetail from '../views/SkinDetail.vue';
import AdminLogin from '../views/admin/AdminLogin.vue';
import AdminDashboard from '../views/admin/AdminDashboard.vue';
import AdminSkins from '../views/admin/AdminSkins.vue';
import AdminSkinForm from '../views/admin/AdminSkinForm.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Catalog
  },
  {
    path: '/item/:id',
    name: 'Item',
    component: SkinDetail
  },
  {
    path: '/a',
    name: 'Auth',
    component: AdminLogin
  },
  {
    path: '/a/d',
    name: 'Dashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/a/i',
    name: 'Items',
    component: AdminSkins,
    meta: { requiresAuth: true }
  },
  {
    path: '/a/i/n',
    name: 'New',
    component: AdminSkinForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/a/i/e/:id',
    name: 'Edit',
    component: AdminSkinForm,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Guard de autenticação
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const token = localStorage.getItem('adminToken');

  if (requiresAuth && !token) {
    next({ name: 'Auth' });
  } else {
    next();
  }
});

export default router;

