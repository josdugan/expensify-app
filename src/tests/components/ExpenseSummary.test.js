import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseSummary } from '../../components/ExpenseSummary';
import expenses from '../fixtures/expenses';
import expensesTotal from '../../selectors/expenses-total';

test('should render ExpenseSummary with 1 expense', () => {
    const expense = expenses[0];
    const expensesCount = [expense].length;
    
    const wrapper = shallow(<ExpenseSummary expensesCount={expensesCount} expensesTotal={expensesTotal([expense])} />);

    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseSummary with multiple expenses', () => {
    const expensesCount = expenses.length;

    const wrapper = shallow(<ExpenseSummary expensesCount={expensesCount} expensesTotal={expensesTotal(expenses)} />);

    expect(wrapper).toMatchSnapshot();
});
