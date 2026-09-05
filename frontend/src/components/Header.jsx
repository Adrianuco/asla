import React from 'react';
import {FaStoreAlt, FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';

const Header = () => {
    return (
        <header className= "header">
            <div className="header-left">
                <h1>
                    <FaStoreAlt /> Asla
                </h1>
                <div className = "sub-busqueda">
                    <FaSearch /> ¿Qué estás buscando?
                </div>
            </div>
            <div className="header-right">
                <button className="btn-icon" aria-label="Notificaciones">
                    <FaBell />
                </button>
                <button className="btn-icon" aria-label="Perfil">
                    <FaUserCircle />
                </button>
            </div>
        </header>
    );
}

