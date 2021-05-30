import React from "react";
import './header.css';

export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="headerLogo">
                <a href="/">
                    <img src="https://marcas-logos.net/wp-content/uploads/2019/11/Netflix-Logotipo.jpg" alt="netflix"/>
                </a>
            </div>
            <div className="headerUser">
                <a href="/">
                    <img src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png" alt="netflix"/>
                </a>
            </div>
        </header>
    );
}