import { addExpense, removeExpense, editExpense, ADD_EXPENSE, REMOVE_EXPENSE, EDIT_EXPENSE } from '../../actions/expenses';

test('should setup remove expense action', () => {
    const action = removeExpense({ id: '123' });

    expect(action).toEqual({
        type: REMOVE_EXPENSE,
        id: '123'
    });
});

test('should setup edit expense action', () => {
    const action = editExpense('123', {note: 'the note'});

    expect(action).toEqual({
        type: EDIT_EXPENSE,
        id: '123',
        updates: {
            note: 'the note'
        }
    });
});

test('should setup add expense action with provided values', () => {
    const expenseData = {
        description: 'rent',
        amount: 109500,
        createdAt: 1000,
        note: 'the note'
    };
    const action = addExpense(expenseData);

    expect(action).toEqual({
        type: ADD_EXPENSE,
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});

test('should setup add expense with defaults', () => {
    const action = addExpense();

    expect(action).toEqual({
        type: ADD_EXPENSE,
        expense: {
            description: '',
            note: '',
            amount: 0,
            createdAt: 0,
            id: expect.any(String)
        }
    });
});