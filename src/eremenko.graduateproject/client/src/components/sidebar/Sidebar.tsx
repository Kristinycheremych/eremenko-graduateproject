import React, { useState } from "react";
import { menuItems } from "./DataSidebar";
import { Link, NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import "./sidebar_style.css";

function Sidebar({ children }: any) {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggle = () => {
    setIsOpen(!isOpen);
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
              <p style={{ display: isOpen ? "block" : "none" }}>
                Еременко Кристина
              </p>
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
        </div>
        <main>{children}</main>
      </div>
    </>
  );
}
export default Sidebar;
