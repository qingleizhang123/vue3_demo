import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import * as AppToolkit from 'uih-mcsf-apptoolkit';

const DhsApp = () => import('../Apps/DHS/DhsApp.vue');
const DhsViewing = () => import('../Apps/DHS/views/DhsViewing.vue');
const routes: RouteRecordRaw[] = [
  {
    name: '',
    path: '/',
    redirect: { name: 'dhs-app' }
  },
  {
    name: 'dhs-app',
    path: '/app/DHS/' + AppToolkit.RouteParaEnum.RoutePara_GeneralRoutPara,
    component: DhsApp,
    meta: {
      title: '数字头架'
    },
    children: [
      { path: '', redirect: { name: 'dhs-viewing' } },
      { name: 'dhs-viewing', path: 'dhs-viewing', component: DhsViewing }
    ]
  },
  {
    path:
      '/app/TKASurgeryPlanning/' +
      AppToolkit.RouteParaEnum.RoutePara_GeneralRoutPara,
    component: DhsApp,
    children: [
      { path: '', redirect: { name: 'dhs-viewing' } },
      { name: 'dhs-viewing', path: 'dhs-viewing', component: DhsViewing }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});

export default router;
