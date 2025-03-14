import { createBrowserRouter, type RouteObject } from 'react-router';
import { loader } from './routes/loader';
import { Root } from './routes/root';
import { RootErrorBoundary } from './routes/error-boundary';
import { queryClient } from './query-client';
import Loading from './components/Loading';

export const routes: RouteObject[] = [
  {
    path: '*',
    Component: Root,
    loader: loader(queryClient),
    errorElement: <RootErrorBoundary />,
    HydrateFallback: () => <Loading />
  }
];

export const router = createBrowserRouter(routes);
