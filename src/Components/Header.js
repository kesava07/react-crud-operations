import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

const Header = () => (
    <nav className={`navbar navbar-expand-sm bg-light navbar-light shadow-sm`}>
        <a className="navbar-brand" href="/">Logo</a>
        <ul className="navbar-nav">
            <li>
                <NavLink exact activeClassName="selected" className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
                <NavLink activeClassName="selected" className="nav-link" to="/about" >About</NavLink>
            </li>
        </ul>
    </nav>
);

export default Header;