import React, { useState } from "react";
import { menuItems } from "./DataSidebar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { RxExit } from "react-icons/rx";
import "./sidebar_style.css";

function Sidebar({ children }: any) {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleExitClick = (e: any) => {
    e.preventDefault();
    const userConfirmed = window.confirm("Вы действительно хотите выйти?");
    if (userConfirmed) {
      navigate("/");
    }
  };

  const activeStyle = {
    background: "#196FAD",
    color: "white",
  };

  return (
    <>
      <div className="container_sidebar">
        <div style={{ width: isOpen ? "285px" : "50px" }} className="sidebar">
          <div className="top_section">
            <Link to="/">
              <p
                style={{ display: isOpen ? "block" : "none" }}
                className="logo"
              >
                Управление проектами
              </p>
            </Link>
            <div className="profile">
              <p style={{ display: isOpen ? "block" : "none" }}></p>
            </div>
            <div
              style={{ marginLeft: isOpen ? "150px" : "0px" }}
              className="burger_menu"
            >
              <FiMenu onClick={toggle} />
            </div>
          </div>
          <div className="sub_link">
            {menuItems.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className="link"
                aria-activedescendant="active"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <div className="icon">{item.icon}</div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  {item.title}
                </div>
              </NavLink>
            ))}
          </div>
          <div className="container-exit">
            <a href="/" onClick={handleExitClick}>
              <div className="icon-exit">
                <p>
                  <RxExit />
                </p>
                <p style={{ display: isOpen ? "block" : "none" }}>Выйти</p>
              </div>
            </a>
          </div>
        </div>
        <main>{children}</main>
      </div>
    </>
  );
}

export default Sidebar;