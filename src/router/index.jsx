/** @format */
import React, { lazy, Suspense } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '@components/common/loading';

// const context = require.context('../pages', true, /^\.\/((?!\/)[\s\S])+$/);
// const pages = context.keys().map(key => ({
//   pageName: key.match(/\.\/(\S*)/)[1],
// })).forEach(pageName=>)

const withSuspense = Component => props => (
  <Suspense fallback={<Loading />}>
    <Component {...props} />
  </Suspense>
);
const routes = [
  {
    path: '/',
    exact: true,
    render: () => <Redirect to="/home" />,
  },
  {
    path: '/home',
    key: 'home',
    component: lazy(() => import('@pages/Home')),
    exact: true,
  },
  {
    path: '/detail',
    key: 'detail',
    component: lazy(() => import('@pages/Detail')),
    exact: true,
  },
];
export default routes.map(route => ({
  ...route,
  ...(route.component ? { component: withSuspense(route.component) } : {}),
}));
