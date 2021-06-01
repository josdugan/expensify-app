import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startLogout } from '../actions/auth';

const Header = ({ startLogout }) => (
    <header>
        <h1>Expensify</h1> 
        <NavLink activeClassName="is-active" to="/dashboard">Dashboard</NavLink> |&nbsp;
        <NavLink activeClassName="is-active" to="/create">Add Expense</NavLink> |&nbsp;
        <NavLink activeClassName="is-active" to="/help">Help</NavLink>
        <button onClick={startLogout} >Logout</button>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
export { Header };