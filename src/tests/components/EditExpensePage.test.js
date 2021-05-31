import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let startEditExpense, startRemoveExpense, history, wrapper, expense;

beforeEach(() => {
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = { push: jest.fn() };
    expense = expenses[0];
    wrapper = shallow(<EditExpensePage startEditExpense={startEditExpense} startRemoveExpense={startRemoveExpense} history={history} expense={expense} />);
});

test('should render EditExpensePage', () => {
    expect(wrapper).toMatchSnapshot();
})

test('should handle editExpense', () => {
    const updatedExpense = {
        ...expense,
        description: 'this is an updated expense'
    };
    wrapper.find('ExpenseForm').prop('onSubmit')(updatedExpense);

    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startEditExpense).toHaveBeenLastCalledWith(updatedExpense.id, updatedExpense);
});

test('should handle start remove expense', () => {
    wrapper.find('button').prop('onClick')();

    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startRemoveExpense).toHaveBeenLastCalledWith(expense.id);
});
