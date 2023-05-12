import React from 'react';
import logo from '../assets/Graviti Logo 1.png'
import styles from './Navbar.module.css';
const Navbar = () => {
    return (
        <div className={styles.logoContainer}>
            <img src={logo} alt="Logo" />
        </div>
    )
}

export default Navbar