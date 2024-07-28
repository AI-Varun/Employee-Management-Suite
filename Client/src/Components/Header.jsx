import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/Header.css';
import logo from '../assets/2950171.jpg';
function Header() {
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.reload();
    };
    const location = useLocation();
    const action = localStorage.getItem('action');
    const userName = localStorage.getItem('username');

    const pageTitle = (() => {
        switch (location.pathname) {
            case '/create-employee':
                return action === 'create' ? 'Create Employee' : 'Employee Edit';
            case '/employee-list':
                return 'Employee List';
            case '/':
                return 'Dashboard';
            case '/login':
                return 'Login Page';
            case '/signup':
                return 'Signup Page';
            default:
                return '';
        }
    })();
    return (
        <header className="header">
            <div className="header-content">
                <div className="header-logo-row">
                    <img src={logo} alt="Logo" className="logo" />
                </div>
                <div className="header-nav-row">
                    <nav className="header-nav">
                        <ul className="header-nav-list">
                            {localStorage.getItem("token") && (
                                <>
                                    <li className="header-nav-item">
                                        <Link to="/" className="header-nav-link">
                                            Home
                                        </Link>
                                    </li>
                                    <li className="header-nav-item">
                                        <Link to="/employee-list" className="header-nav-link">
                                            Employee List
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>

                    {localStorage.getItem("token") && (
                        <div className="header-user-info">
                            <span className="header-user-name">{userName}</span>
                            <button className="login-button" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                <div className="header-page-title-row">
                    <div className="header-page-title">{pageTitle}</div>
                </div>
            </div>
        </header>
    );
}

export default Header;
