import database from '../firebase/firebase';

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SET_EXPENSES = 'SET_EXPENSES';

const addExpense = (expense) => {
    return {
        type: ADD_EXPENSE,
        expense
    };
};

const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData;

        const expense = { description, note, amount, createdAt };

        return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
            dispatch(addExpense({
                ...expense,
                id: ref.key
            }));
        });
    };
};

const removeExpense = ({ id } = {}) => {
    return {
        type: REMOVE_EXPENSE,
        id
    };
};

const startRemoveExpense = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        return database.ref(`users/${uid}/expenses/${id}`).remove()
            .then(() => {
                dispatch(removeExpense({ id }));
            });
    };
};

const editExpense = (id, updates = {}) => {
    return {
        type: EDIT_EXPENSE,
        id,
        updates
    };
};

const startEditExpense = (id, updates = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
            dispatch(editExpense(id, updates));
        });
    };
};

const setExpenses = (expenses) => {
    return {
        type: 'SET_EXPENSES',
        expenses
    };
};

const startSetExpenses = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        return database.ref(`users/${uid}/expenses`).once('value').then(snapshot => {
            const expenses = [];

            snapshot.forEach(childSnapshot => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            dispatch(setExpenses(expenses));
        });
    };
};

export {
    addExpense,
    startAddExpense,
    removeExpense,
    editExpense,
    startEditExpense,
    setExpenses,
    startSetExpenses,
    startRemoveExpense
};
