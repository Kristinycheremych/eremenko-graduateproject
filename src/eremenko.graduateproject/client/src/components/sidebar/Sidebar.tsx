import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import "./sidebar_style.css";
import { menuItems } from "./DataSidebar";

function Sidebar({ children }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(
    new Array(menuItems.length).fill(false)
  );

  const activeStyle = {
    background: "#196FAD",
    color: "white",
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenu = (index: any) => {
    setIsMenuOpen((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const renderSections = () => {
    return menuItems.map((item, index) => (
      <div key={index}>
        <div className="sub_link">
          <NavLink
            to={item.path}
            className={isOpen ? "link open" : "link "}
            onClick={() => toggleMenu(index)}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.title}
            </div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className={isMenuOpen[index] ? "arrow rotate" : "arrow"}
            ></div>
          </NavLink>
        </div>
      </div>
    ));
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
          <div>{renderSections()}</div>
        </div>
        <main>{children}</main>
      </div>
    </>
  );
}

export default Sidebar;
