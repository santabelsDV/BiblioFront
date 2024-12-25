import {Link} from "react-router-dom";


export default function Header() {
    return (
        <header className="header">
            <div className="header-container">
                <div className="logo-container">
                   <img className="logo" src="public/Logo.svg" alt="logo"/>
                </div>
                <nav className="nav">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <p className="nav-link"><Link to="/">Головна</Link></p>

                        </li>
                        <li className="nav-item">
                            <p className="nav-link"><Link to="/info">Інформаційна сторінка</Link></p>
                        </li>
                        <li className="nav-item">
                        <p className="nav-link"><Link to="/catalog">Каталог</Link></p>
                        </li>
                    </ul>
                </nav>
                <div className="auth-buttons">
                    <button className="btn login-btn">Login</button>
                    <button className="btn signup-btn">Sign Up</button>
                </div>
            </div>
        </header>
    );
}

