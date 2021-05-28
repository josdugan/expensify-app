import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpense, removeExpense, history, wrapper, expense;

beforeEach(() => {
    editExpense = jest.fn();
    removeExpense = jest.fn();
    history = { push: jest.fn() };
    expense = expenses[0];
    wrapper = shallow(<EditExpensePage editExpense={editExpense} removeExpense={removeExpense} history={history} expense={expense} />);
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
    expect(editExpense).toHaveBeenLastCalledWith(updatedExpense.id, updatedExpense);
});

test('should handle remove expense', () => {
    wrapper.find('button').prop('onClick')();

    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(removeExpense).toHaveBeenLastCalledWith(expense.id);
});
