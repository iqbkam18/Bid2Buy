const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');
import sinon from 'sinon';
import  {NotfoundComponent} from '../../src/client/components/notfound-component'

test('Test 404',() => {
    const driver = mount(
        <MemoryRouter initialEntries={['/404']} >
            <NotfoundComponent />
        </MemoryRouter>
    )
    const html = driver.html()
    expect(html).toMatch('404 Page Not Found')

})
