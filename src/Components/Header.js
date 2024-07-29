import React from "react";
import { FaBars } from 'react-icons/fa';
import "./Header.css"

function Header() {
    return (
        <div className="header">
            <div className="logo">
                <img src="./logo.png" alt="Logo" />
            </div>
            <div className="menu" style={{ cursor: 'pointer', fontSize: '30px' }}>
                <FaBars />
            </div>
        </div>
    )
}

export default Header;