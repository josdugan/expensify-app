import moment from 'moment';
import selectExpenses from '../../selectors/expenses';
import expenses from '../fixtures/expenses';


const filtersDefaults = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

test('should filter by text value', () => {
    const filters = {
        ...filtersDefaults,
        text: 'e'
    };
    const result = selectExpenses(expenses, filters);

    expect(result).toEqual([ expenses[2], expenses[1]]);
});

test('should filter by startDate', () => {
    const filters = {
        ...filtersDefaults,
        startDate: moment(0)
    };
    const result = selectExpenses(expenses, filters);

    expect(result).toEqual([expenses[2], expenses[0]]);
});

test('should filter by endDate', () => {
    const filters = {
        ...filtersDefaults,
        endDate: moment(0)
    };
    const result = selectExpenses(expenses, filters);

    expect(result).toEqual([expenses[0], expenses[1]]);
});

test('should sort by date', () => {
    const filters = {
        ...filtersDefaults
    };
    const result = selectExpenses(expenses, filters);

    expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});

test('should sort by amount', () => {
    const filters = {
        ...filtersDefaults,
        sortBy: 'amount'
    };
    const result = selectExpenses(expenses, filters);

    expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);
});
