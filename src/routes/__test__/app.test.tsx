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

  test<TestContextWithScreen>('Filter by region', async ({ screen }) => {
    // We have to wait til the Regions query has resolved in order to select the region checkbox
    await queryClient.prefetchQuery({ queryKey: allRegionsQueryKeys.all });

    const toggleFilterButton = screen.getByRole('button', {
      name: 'Toggle Filters Window Open and Close'
    });

    await toggleFilterButton.click();

    const regionCheckbox = screen.container.querySelector<HTMLInputElement>(
      'input[name="region[]"]'
    );

    console.log(import.meta.env.MODE);

    // Make sure it's an input element
    expect(regionCheckbox).toBeInstanceOf(HTMLInputElement);

    // @ts-expect-error The test will never get here and report an error since we check the type above
    regionCheckbox.checked = true;

    const searchInput = screen.getByRole('button', { name: 'Search' });

    await searchInput.click();

    const searchParams = new URLSearchParams(window.location.search);

    const regionParams = searchParams.getAll('region[]');

    // Validate that the URL contains the zip code
    expect(regionParams[0]).toBe(regionCheckbox?.value);
  });
});
