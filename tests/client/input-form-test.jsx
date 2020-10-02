const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

import  Input from '../../src/client/components/input-form-component'

test('Test input component',() => {
    
    const label = 'user'

    const driver = mount(
        <MemoryRouter initialEntries={['/login']} >
            <Input 
                label={label}
                handleChange={() => {}}
                value={label}
                />
        </MemoryRouter>
    )

    const html = driver.html()

    expect(html).toMatch('user')

})