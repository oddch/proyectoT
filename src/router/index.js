import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import CompaniesView from '../views/companies/CompaniesView.vue'
import CreateCompany from '../views/companies/CreateCompany.vue'
import CreateUser from '../views/users/CreateUser.vue'
import UserList from '../views/users/UserList.vue'
import DevicesList from '../views/devices/DevicesList.vue'
import CreateDevice from '../views/devices/CreateDevice.vue'
import TravelsList from '../views/travels/TravelsList.vue'
import auth from '../logic/auth'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: HomeView,
      meta: { title: "Dashboard" },
      
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: { title: "Login", hideNav: true, hideFooter: true },
    },
    {
      path: '/companies',
      name: 'Companies',
      component: CompaniesView
    },
    {
      path: '/companies/create',
      name: 'Companies-create',
      component: CreateCompany
    },
    {
      path: '/users/create',
      name: 'User-create',
      props: true,
      component: CreateUser
    },
    {
      path: '/users',
      name: 'User-list',
      props: true,
      component: UserList
    },
    {
      path: '/devices',
      name: 'Device-list',
      props: true,
      component: DevicesList
    },
    {
      path: '/devices/create',
      name: 'Device-create',
      props: true,
      component: CreateDevice
    },
    {
      path: '/travels',
      name: 'Travels-list',
      props: true,
      component: TravelsList
    },


   
  ]
})

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = await auth.checkAuthentication();

  if (to.name !== 'Login' && !isAuthenticated) {
    // Redirigir al usuario a la página de inicio de sesión si no está autenticado
    next({ name: 'Login' });
  } else {
    // El usuario está autenticado o intenta acceder a la página de inicio de sesión, permitir el acceso
    next();
  }
});

export default router
