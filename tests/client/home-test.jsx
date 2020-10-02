const React = require('react');
const { mount } = require('enzyme');
const { MemoryRouter } = require('react-router-dom');

import { Home } from '../../src/client/pages/home';
const { stubFetch } = require('../mytest-utils');

test('Test Home', async () => {
  stubFetch(
    200,
    {
      success: true,
    },
    (url) => url.endsWith('/api/items')
  );

  const driver = mount(
    <MemoryRouter initialEntries={['/']}>
      <Home />
    </MemoryRouter>
  );

  const html = driver.html();

  console.log(html);

  expect(html).toMatch('Auction / Bidding');
});
