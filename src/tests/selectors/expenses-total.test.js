import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if undefinded expenses', () => {
    expect(selectExpensesTotal()).toBe(0);
});

test('should return 0 if no expenses', () => {
    expect(selectExpensesTotal([])).toBe(0);
});

test('should add up a single expense', () => {
    expect(selectExpensesTotal([expenses[0]])).toBe(expenses[0].amount);
});

test('should add up multiple expenses', () => {
    expect(selectExpensesTotal(expenses)).toBe(expenses[0].amount + expenses[1].amount + expenses[2].amount);
});
