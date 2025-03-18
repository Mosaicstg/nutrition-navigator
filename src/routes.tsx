import { createBrowserRouter, type RouteObject } from 'react-router';
import { loader } from './routes/loader';
import { Root } from './routes/root';
import { RootErrorBoundary } from './routes/error-boundary';

export const routes: RouteObject[] = [
  {
    path: '*',
    Component: Root,
    loader: loader,
    errorElement: <RootErrorBoundary />
  }
];

export const router = createBrowserRouter(routes);
