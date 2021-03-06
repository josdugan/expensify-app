import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral'
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

const ExpenseSummary = (props) => (
    <div className="page-header">
        <div className="content-container">
            <h1 className="page-header__title">Viewing <span>{props.expensesCount}</span> expenses totalling <span>{numeral(props.expensesTotal / 100).format('$0,0.00')}</span></h1>
            <div className="page-header__actions">
                <Link className="button" to="/create">Add Expense</Link>
            </div>
        </div>
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
