import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Root from '~/routes/root.tsx';
import './index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { loader } from '~/routes/root.tsx';
import RootErrorBoundary from './routes/error-boundary';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '*',
    Component: Root,
    loader: loader(queryClient),
    errorElement: <RootErrorBoundary />
  }
]);

ReactDOM.createRoot(
  document.getElementById('nutrition-navigator') as HTMLElement
).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
