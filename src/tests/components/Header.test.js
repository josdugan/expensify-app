import React from 'react';
import { shallow } from 'enzyme'
import { Header } from '../../components/Header';

test('should render Header correctly', () => {
    const wrapper = shallow(<Header startLogout={() => {}} />);

    expect(wrapper.find('h1').length).toBe(1);
    expect(wrapper.find('h1').text()).toBe('Expensify');
    expect(wrapper).toMatchSnapshot();
});

test('should call startLogout on button click', () => {
    const startLogutSpy = jest.fn();
    const wrapper = shallow(<Header startLogout={startLogutSpy} />);

    wrapper.find('button').simulate('click');

    expect(startLogutSpy).toHaveBeenCalled();
});
