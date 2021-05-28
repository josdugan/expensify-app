import moment from 'moment';
import filtersReducer from '../../reducers/filters';
import { SET_TEXT_FILTER, SORT_BY_AMOUNT, SORT_BY_DATE, SET_START_DATE, SET_END_DATE } from '../../actions/filters';

const filtersDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
};

test('should setup default filter state', () => {
    const state = filtersReducer(undefined, { type: '@@INIT'});

    expect(state).toEqual({
        ...filtersDefaultState
    });
});

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, { type: SORT_BY_AMOUNT });

    expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
    const currentState = {
        ...filtersDefaultState,
        sortBy: 'amount'
    };
    const action = { type: SORT_BY_DATE };
    const state = filtersReducer(currentState, action);

    expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
    const text = 'phone';
    const currentState = {
        ...filtersDefaultState,
    };
    const action = { 
        type: SET_TEXT_FILTER,
        text
     };
    const state = filtersReducer(currentState, action);

    expect(state.text).toBe(text);
});

test('should set start date filter', () => {
    const date = moment(0).add(10, 'days');
    const currentState = {
        ...filtersDefaultState
    };
    const action = {
        type: SET_START_DATE,
        date
    };
    const state = filtersReducer(currentState, action);

    expect(state.startDate).toEqual(date);
});

test('should set end date filter', () => {
    const date = moment(0).add(10, 'days');
    const currentState = {
        ...filtersDefaultState
    };
    const action = {
        type: SET_END_DATE,
        date
    };
    const state = filtersReducer(currentState, action);

    expect(state.endDate).toEqual(date);
});
