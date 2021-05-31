import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addExpense, ADD_EXPENSE, editExpense, EDIT_EXPENSE, removeExpense, REMOVE_EXPENSE, setExpenses, startAddExpense, startEditExpense, startRemoveExpense, startSetExpenses } from '../../actions/expenses';
import database from '../../firebase/firebase';
import expenses from '../fixtures/expenses';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt };
    });

    database.ref('expenses').set(expensesData).then(() => done());
});

test('should setup remove expense action', () => {
    const action = removeExpense({ id: '123' });

    expect(action).toEqual({
        type: REMOVE_EXPENSE,
        id: '123'
    });
});

test('should setup edit expense action', () => {
    const action = editExpense('123', { note: 'the note' });

    expect(action).toEqual({
        type: EDIT_EXPENSE,
        id: '123',
        updates: {
            note: 'the note'
        }
    });
});

test('should edit expenses from db', (done) => {
    const store = createMockStore({});
    const updatedExpense = {
        ...expenses[0],
        amount: 9999999,
        note: 'amount updated'
    };

    store.dispatch(startEditExpense(updatedExpense.id, updatedExpense))
        .then(() => {
            const actions = store.getActions();

            expect(actions[0]).toEqual({
                type: EDIT_EXPENSE,
                id: updatedExpense.id,
                updates: updatedExpense
            });

            return database.ref(`expenses/${updatedExpense.id}`).once('value');
        })
        .then(snampshot => {
            expect(snampshot.val()).toEqual(updatedExpense);
            done();
        });
});

test('should setup add expense action with provided values', () => {
    const action = addExpense(expenses[2]);

    expect(action).toEqual({
        type: ADD_EXPENSE,
        expense: expenses[2]
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseDate = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    }

    store.dispatch(startAddExpense(expenseDate)).then(() => {
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDate
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then(snapshot => {
        expect(snapshot.val()).toEqual(expenseDate);
        done();
    });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});

    const expenseData = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    };

    store.dispatch(startAddExpense()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then(snapshot => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should setup set expense action with data', () => {
    const action = setExpenses(expenses);

    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch the expenses from db', (done) => {
    const store = createMockStore({});

    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});

test('should remove expenses from firebase', (done) => {
    const store = createMockStore({});
    const id = expenses[0].id;

    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: REMOVE_EXPENSE,
            id
        });

        return database.ref(`expenses/${id}`).once('value');
    })
        .then(snapshot => {
            expect(snapshot.val()).toBe(null);
            done();
        });
});
