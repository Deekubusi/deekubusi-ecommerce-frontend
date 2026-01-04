import React from "react";
import {
  FiHome,
  FiBox,
  FiShoppingBag,
  FiGrid,
  FiUsers,
  FiBarChart2,
  FiTag,
  FiMail,
  FiHelpCircle,
  FiLayers,
  FiSettings,
  FiTool
} from "react-icons/fi";

import "../styles/layout.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo">
          <FiShoppingBag size={22} />
        </div>
        <div className="brand-text">fastcart</div>
      </div>

      <nav className="nav">
        <div className="nav-section">
          <div className="nav-item">
            <FiHome /> Dashboard
          </div>
          <div className="nav-item">
            <FiBox /> Orders
          </div>
          <div className="nav-item">
            <FiShoppingBag /> Products
          </div>
          <div className="nav-item nav-active">
            <FiGrid /> Categories
          </div>
          <div className="nav-item">
            <FiUsers /> Customers
          </div>
          <div className="nav-item">
            <FiBarChart2 /> Reports
          </div>
          <div className="nav-item">
            <FiTag /> Coupons
          </div>
          <div className="nav-item">
            <FiMail /> Inbox
          </div>
        </div>

        <div className="nav-divider" />

        <div className="nav-section">
          <div className="nav-item">
            <FiHelpCircle /> Knowledge Base
          </div>
          <div className="nav-item">
            <FiLayers /> Product Updates
          </div>
        </div>

        <div className="nav-divider" />

        <div className="nav-section">
          <div className="nav-title">Settings</div>
          <div className="nav-item">
            <FiSettings /> Personal Settings
          </div>
          <div className="nav-item">
            <FiTool /> Global Settings
          </div>
        </div>
      </nav>
    </aside>
  );
}
