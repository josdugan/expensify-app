import uuid from 'uuid';

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

const addExpense = ({description = '', note = '', amount = 0, createdAt = 0 } = {}) => {
    return {
        type: ADD_EXPENSE,
        expense: {
            id: uuid(),
            description,
            note,
            amount,
            createdAt
        }
    };
};

const removeExpense = ({id} = {}) => {
    return {
        type: REMOVE_EXPENSE,
        id
    };
};

const editExpense = (id, updates = {}) => {
    return {
        type: EDIT_EXPENSE,
        id,
        updates
    };
};

export {
    addExpense,
    removeExpense,
    editExpense
};
