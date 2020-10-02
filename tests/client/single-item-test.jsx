const React = require('react');
const { mount } = require('enzyme');
const { MemoryRouter } = require('react-router-dom');

import { SingleItem } from '../../src/client/pages/singleItem';
const {
  stubFetch,
  flushPromises,
  overrideFetch,
  asyncCheckCondition,
} = require('../mytest-utils');

test('Test Single Item', async () => {
  const driver = mount(
    <MemoryRouter initialEntries={['/']}>
      <SingleItem />
    </MemoryRouter>
  );
  await flushPromises();

  const html = driver.html();

  expect(html).toMatch('Go Back');
});
