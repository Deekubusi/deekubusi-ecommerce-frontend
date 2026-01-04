import React from "react";
import { useAuth } from "../context/AuthContext";
import {
  FiSearch,
  FiMessageSquare,
  FiBell,
  FiLogOut,
  FiUser
} from "react-icons/fi";

import "../styles/layout.css";

export default function Topbar() {
  const { user, logout } = useAuth();

  return (
    <header className="topbar">
      <div className="search-wrap">
        <FiSearch className="search-icon" />
        <input
          className="search-input"
          placeholder="Search..."
        />
      </div>

      <div className="topbar-right">
        <button className="icon-btn" title="Messages">
          <FiMessageSquare size={18} />
        </button>

        <button className="icon-btn" title="Notifications">
          <FiBell size={18} />
        </button>

        <div className="profile">
          <div className="avatar">
            {user?.name?.[0]?.toUpperCase() || <FiUser />}
          </div>

          <div className="profile-meta">
            <div className="profile-name">
              {user?.name || "User"}
            </div>

            <button className="logout-btn" onClick={logout}>
              <FiLogOut size={14} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
