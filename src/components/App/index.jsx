import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Layout } from 'components';
import { getUser } from 'redux/attribute';
import routes from './routes';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <main data-testid="app">
      <Layout>
        <ToastContainer />
        <Routes>
          {routes.map((val) => (
            <Route
              key={val?.path}
              element={<Suspense fallback={val.loader}>{val.element}</Suspense>}
              path={val?.path}
            />
          ))}
        </Routes>
      </Layout>
    </main>
  );
};

export default App;
