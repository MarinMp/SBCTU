import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUserInjured,
  FaUserMd,
  FaHeartbeat,
  FaNotesMedical,
  FaBug,
  FaExclamationTriangle,
  FaFileMedical,
  FaChartPie,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import "../styles/sidebar.css";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: <FaHome /> },
    { path: "/pacientes", label: "Pacientes", icon: <FaUserInjured /> },
    { path: "/personal-medico", label: "Personal Médico", icon: <FaUserMd /> },
    { path: "/sintomas", label: "Síntomas", icon: <FaBug /> },
    { path: "/enfermedades", label: "Enfermedades", icon: <FaFileMedical /> },
    { path: "/niveles-urgencia", label: "Niveles Urgencia", icon: <FaExclamationTriangle /> },
    { path: "/visitas", label: "Visitas", icon: <FaHeartbeat /> },
    { path: "/triages", label: "Triages", icon: <FaChartPie /> },
    { path: "/diagnosticos", label: "Diagnósticos", icon: <FaNotesMedical /> },
  ];

  return (
    <div className="sbctu-sidebar">
      {/* Logo/Header */}
      <div className="sbctu-sidebar-brand">
        <div className="sbctu-brand-icon">
          <FaHeartbeat />
        </div>
        <h4 className="sbctu-brand-name">SBCTU</h4>
      </div>

      {/* Navigation Menu */}
      <nav className="sbctu-sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sbctu-nav-link ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            <span className="sbctu-nav-icon">{item.icon}</span>
            <span className="sbctu-nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Upgrade Section */}
      <div className="sbctu-sidebar-upgrade">
        <div className="sbctu-upgrade-content">
          <h6>Acceso a Sugerencias</h6>
          <p>Obtén acceso a un sistema mas personalizado</p>
          <button className="sbctu-upgrade-btn">Mejorar Plan</button>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="sbctu-sidebar-footer">
        <Link to="/settings" className="sbctu-footer-link">
          <FaCog />
          <span>Configuracion</span>
        </Link>
        <Link to="/help" className="sbctu-footer-link">
          <FaQuestionCircle />
          <span>Ayuda</span>
        </Link>
        <Link to="/logout" className="sbctu-footer-link logout">
          <FaSignOutAlt />
          <span>Salir</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;