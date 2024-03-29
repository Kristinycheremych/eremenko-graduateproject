import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import './sidebar_style.css';
import { menuItems } from './DataSidebar';

function Sidebar({ children }: any) {

  const [isOpen, setIsOpen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(new Array(menuItems.length).fill(false));
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(new Array(menuItems.length).fill(false));

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

  const toggleMenuSub = (index: any) => {
    setIsSubMenuOpen((prevsub) => {
      const newStateSub = [...prevsub];
      newStateSub[index] = !newStateSub[index];
      return newStateSub;
    });
  };


  const subSections = (subSections: any) => {
    return subSections.map((subSections: any, index: any) => (
      <>
        <div>
          <NavLink to={subSections.path} key={index} className="subSublink">
            <div style={{ display: isOpen ? 'block' : 'none' }} className="subSublink_text">
              {  subSections.title}
            </div>
          </NavLink>
        </div>
      </>
    ));
  }

  const rendersubSections = (subitems: any) => {

    return subitems.map((subItems: any, index: any) => (
      <div className="subnav">
        <NavLink to={subItems.path || '#'} key={index} className="sublink"  onClick={() => toggleMenuSub(index)}>
          <div className="sublink_text" style={{ display: isOpen ? 'block' : 'none'}}>
            {subItems.title}
            <div className={isSubMenuOpen[index] ? 'subArrow rotate' : 'subArrow'}>{subItems.arrow}</div>
            
          </div> 
  
        </NavLink>
        { isSubMenuOpen[index] && subItems.subSections && (
          <div>
            {subSections(subItems.subSections)}
          </div>
        )}
      </div>
    ));
  };

  const renderSections = () => {
    return menuItems.map((item, index) => (
      <NavLink to={item.path} key={index}>
        <NavLink
          to={item.path || '#'}
          key={index}
          className={isOpen ? "link open" : "link "}
          onClick={() => toggleMenu(index)}
        >
          <div className="icon">{item.icon}</div>
          <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
            {item.title}
          </div>
          <div style={{ display: isOpen ? 'block' : 'none' }} className={isMenuOpen[index] ? 'arrow rotate' : 'arrow'}>{item.arrow}</div>
        </NavLink>
        {
          isMenuOpen[index] && item.subItems && (
            <>
              {rendersubSections(item.subItems)}
            </>
          )
        }
      </NavLink>

    ))
  };

  return (
    <>
      <div className="container_sidebar">
        <div style={{ width: isOpen ? '300px' : '50px' }} className="sidebar">
          <div className="top_section" >
            <Link to="/">
              <h1 style={{ display: isOpen ? 'block' : 'none' }} className="logo">
                logo
              </h1>
            </Link>
            <div style={{ marginLeft: isOpen ? '130px' : '0px' }} className="bars">
              <FiMenu onClick={toggle} />
            </div>
          </div>
          <div>{renderSections()}</div>

        </div >
        <main>{children}</main>
      </div >
    </>
  );
}

export default Sidebar;