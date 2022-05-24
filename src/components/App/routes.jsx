import PageLoader from 'components/PageLoader';
import Records from 'pages';

const routes = [
  {
    path: '/',
    element: <div>index</div>,
    loader: <PageLoader remove />,
  },
  {
    path: 'block',
    element: <div>block</div>,
    loader: <PageLoader />,
  },
  {
    path: 'monitor',
    element: <div>monitor</div>,
    loader: <PageLoader />,
  },
  {
    path: 'reports',
    element: <Records />,
    loader: <PageLoader />,
  },
  {
    path: 'switch',
    element: <div>Switch</div>,
    loader: <PageLoader />,
  },
];

export default routes;
