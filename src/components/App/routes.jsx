import Loader from 'components/Loader';
import Records from 'pages';

const routes = [
  {
    path: '/',
    element: <div>index</div>,
    loader: <Loader remove />,
  },
  {
    path: 'block',
    element: <div>block</div>,
    loader: <Loader />,
  },
  {
    path: 'monitor',
    element: <div>monitor</div>,
    loader: <Loader />,
  },
  {
    path: 'reports',
    element: <Records />,
    loader: <Loader />,
  },
  {
    path: 'switch',
    element: <div>last route</div>,
    loader: <Loader />,
  },
];

export default routes;
