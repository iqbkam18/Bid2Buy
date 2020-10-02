const React = require('react');
const { mount } = require('enzyme');
const { MemoryRouter } = require('react-router-dom');

import Dashboard from '../../src/client/pages/dashboard';
const {
  stubFetch,
  flushPromises,
  overrideFetch,
  asyncCheckCondition,
} = require('../mytest-utils');

test('Test dashboard', async () => {
  stubFetch(
    200,
    {
      success: true,
    },
    (url) => url.endsWith('/api/user/items')
  );
  const driver = mount(
    <MemoryRouter initialEntries={['/']}>
      <Dashboard />
    </MemoryRouter>
  );
  await flushPromises();

  const html = driver.html();

  expect(html).toMatch('Your Items');
});
