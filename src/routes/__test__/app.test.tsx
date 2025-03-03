import { describe, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { RouterProvider } from 'react-router';
import { router } from '~/routes';
import { queryClient } from '~/query-client';
import { QueryClientProvider } from '@tanstack/react-query';

describe('Root', () => {
  it('Should render the root of the app', async () => {
    const screen = render(
      <div id="nutrition-navigator">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </div>
    );

    await screen.getByRole('textbox');
  });
});
