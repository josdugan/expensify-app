import moment from 'moment';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate,
        SET_TEXT_FILTER, SORT_BY_DATE, SORT_BY_AMOUNT, SET_START_DATE, SET_END_DATE } from '../../actions/filters';

test('should generate set text filter action with given text', () => {
    const action = setTextFilter('rent');

    expect(action).toEqual({
        type: SET_TEXT_FILTER,
        text: 'rent'
    });
});

test('should generate set text filter action with default', () => {
    const action = setTextFilter('');

    expect(action).toEqual({
        type: SET_TEXT_FILTER,
        text: ''
    });
});

test('should gnerate sort by date action', () => {
    const action = sortByDate();

    expect(action).toEqual({
        type: SORT_BY_DATE
    });
});

test('should generate sort by amount action', () => {
    const action = sortByAmount();

    expect(action).toEqual({
        type: SORT_BY_AMOUNT
    });
});

test('should gneerate set start date action', () => {
    const action = setStartDate(moment(0));

    expect(action).toEqual({
        type: SET_START_DATE,
        date: moment(0)
    });
});

test('should generate set end date action', () => {
    const action = setEndDate(moment(0));

    expect(action).toEqual({
        type: SET_END_DATE,
        date: moment(0)
    });
});