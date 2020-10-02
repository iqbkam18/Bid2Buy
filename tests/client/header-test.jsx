const React = require('react');
const { mount } = require('enzyme');
const { MemoryRouter } = require('react-router-dom');

import Header from '../../src/client/components/header-component.jsx';
const { stubFetch, flushPromises } = require('../mytest-utils');

test('Test logged in', () => {
  const username = 'user';

  stubFetch(
    200,
    {
      success: true,
    },
    (url) => url.endsWith('/api/login')
  );

  const driver = mount(
    <MemoryRouter initialEntries={['/']}>
      <Header
        username={username}
        updateLoggedInUserId={() => {}}
        history={{ push: () => {} }}
        userId={1}
      />
    </MemoryRouter>
  );

  const html = driver.html();

  expect(html).toMatch('Home');
  expect(html).toMatch('Logout');
});

test('test logout', async () => {
  const username = 'user';

  stubFetch(
    200,
    {
      success: true,
    },
    (url) => url.endsWith('/api/logout')
  );

  const driver = mount(
    <MemoryRouter initialEntries={['/dashboard']}>
      <Header
        username={username}
        updateLoggedInUserId={() => {}}
        history={{ push: () => {} }}
        userId={null}
      />
    </MemoryRouter>
  );

  await flushPromises();

  const html = driver.html();

  expect(html).toMatch("You're not logged in");
});
