import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from 'react-router';
import App from './App.tsx';
import './index.scss';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '*',
    Component: App,
    loader: ({ request }) => {
      const searchParams = new URLSearchParams(request.url);
      console.log(searchParams);
    }
  }
]);

ReactDOM.createRoot(
  document.getElementById('nutrition-navigator') as HTMLElement
).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
