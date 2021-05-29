import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral'
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

const ExpenseSummary = (props) => (
    <div>
        <h1>Viewing {props.expensesCount} expenses totalling {numeral(props.expensesTotal / 100).format('$0,0.00')}</h1>
    </div>
);

const mapStateToProps = ({ expenses, filters }) => {
    const visibleExpenses = selectExpenses(expenses, filters);

    return {
        expensesCount: visibleExpenses.length,
        expensesTotal: selectExpensesTotal(visibleExpenses)
    };
};

export default connect(mapStateToProps)(ExpenseSummary);
export {
    ExpenseSummary
};
