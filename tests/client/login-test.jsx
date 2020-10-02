const React = require('react');
const { mount } = require('enzyme');
const { MemoryRouter } = require('react-router-dom');

import Login from '../../src/client/pages/login';
const { stubFetch, flushPromises } = require('../mytest-utils');

test('Test Login', async () => {
  stubFetch(
    200,
    {
      success: true,
    },
    (url) => url.endsWith('/api/login')
  );
  const driver = mount(
    <MemoryRouter initialEntries={['/']}>
      <Login />
    </MemoryRouter>
  );
  await flushPromises();

  const html = driver.html();
  expect(html).toMatch('Log in User');
  expect(html).toMatch('Log in');
  expect(html).toMatch('Dont have account ? click here to signup.');
});
