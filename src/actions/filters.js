export const SET_TEXT_FILTER = 'SET_TEXT_FILTER';
export const SORT_BY_DATE = 'SORT_BY_DATE';
export const SORT_BY_AMOUNT = 'SORT_BY_AMOUNT';
export const SET_START_DATE = 'SET_START_DATE';
export const SET_END_DATE = 'SET_END_DATE';

const setTextFilter = (text = '') => {
    return {
        type: SET_TEXT_FILTER,
        text
    };
};

const sortByAmount = () => {
    return {
        type: SORT_BY_AMOUNT
    };
};

const sortByDate = () => {
    return {
        type: SORT_BY_DATE
    };
};

const setStartDate = (date) => {
    return {
        type: SET_START_DATE,
        date
    };
};

const setEndDate = (date) => {
    return {
        type: SET_END_DATE,
        date
    };
};

export {
    setTextFilter,
    sortByAmount,
    sortByDate,
    setStartDate,
    setEndDate
};
