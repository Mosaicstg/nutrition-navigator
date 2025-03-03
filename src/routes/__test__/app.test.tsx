import { describe, test, expect, beforeEach, TestContext } from 'vitest';
import { render, RenderResult } from 'vitest-browser-react';
import { RouterProvider } from 'react-router';
import { router } from '~/routes';
import { queryClient } from '~/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { allRegionsQueryKeys } from '~/hooks/useRegions/useRegions';

type TestContextWithScreen = TestContext & { screen: RenderResult };

describe('App', () => {
  beforeEach<TestContextWithScreen>((context) => {
    const screen = render(
      <div id="nutrition-navigator">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </div>,
      {}
    );

    context.screen = screen;
  });

  test<TestContextWithScreen>('Render App', async ({ screen }) => {
    await expect.element(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test<TestContextWithScreen>('Search with zip code', async ({ screen }) => {
    const zipCodeInput = screen.getByRole('textbox', {
      name: 'Address'
    });

    const zipCode = '19104';

    // Enter test zip code into Zip Code input
    await zipCodeInput.fill(zipCode);

    // Validate Zip Code input value
    await expect.element(zipCodeInput).toHaveValue(zipCode);

    const searchInput = screen.getByRole('button', { name: 'Search' });

    await searchInput.click();

    const searchParams = new URLSearchParams(window.location.search);

    // Validate that the URL contains the zip code
    expect(searchParams.get('address')).toBe(zipCode);
  });

  // TODO: continue to flesh this out
  // - need to figure out how to select the region checkbox
  // - need to figure out how to wait for the useQuery to come back with a 'success'
  //    - This is when the filters finish loading
  test<TestContextWithScreen>('Filter By Region', async ({ screen }) => {
    // const toggleFilterButton = screen.getByRole('button', {
    //   name: 'Toggle Filters Window Open and Close'
    // });
    //
    // await toggleFilterButton.click();
    //
    // queryClient.getQueryState(allRegionsQueryKeys.all);
    //
    // const regionCheckbox = screen.container.querySelector(
    //   'input[name="region[]"]'
    // );
    //
    // console.log(regionCheckbox);
    // console.log(regionCheckbox instanceof HTMLElement);
    //
    // expect(regionCheckbox).toBeInstanceOf(HTMLInputElement);
  });
});
