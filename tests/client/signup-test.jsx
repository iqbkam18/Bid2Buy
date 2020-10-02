const React = require('react');
const { mount } = require('enzyme');
const { MemoryRouter } = require('react-router-dom');
import { create } from 'enzyme';
import Signup from '../../src/client/pages/signup';
const { stubFetch } = require('../mytest-utils');

test('Test signup', async () => {
  mount(
    <MemoryRouter initialEntries={['/']}>
      <Signup />
    </MemoryRouter>
  );
});
