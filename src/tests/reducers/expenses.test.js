import moment from 'moment';
import { ADD_EXPENSE, REMOVE_EXPENSE, EDIT_EXPENSE } from '../../actions/expenses';
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {
        type: REMOVE_EXPENSE,
        id: expenses[1].id
    };
    const state = expensesReducer(expenses, action);

    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expenses if id not found', () => {
    const action = {
        type: REMOVE_EXPENSE,
        id: '-1'
    };
    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses);
});

test('should add an expense', () => {
    const newExpense = {
        id: '99',
        description: 'a new expense',
        note: '',
        amount: 1000000,
        createdAt: moment()
    };
    const action = {
        type: ADD_EXPENSE,
        expense: newExpense
    };
    const state = expensesReducer(expenses, action);

    expect(state).toEqual([...expenses, newExpense]);
});

test('should edit an expense', () => {
    const editedAmount = 5000000;
    const action = {
        type: EDIT_EXPENSE,
        id: expenses[0].id,
        updates: {
            amount: editedAmount
        }
    };
    const state = expensesReducer(expenses, action);

    expect(state[0].amount).toBe(editedAmount);
});

test('should not edit expense if expense not found', () => {
    const editedAmount = 5000000;
    const action = {
        type: EDIT_EXPENSE,
        id: '-1',
        updates: {
            amount: editedAmount
        }
    };
    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses);
});
