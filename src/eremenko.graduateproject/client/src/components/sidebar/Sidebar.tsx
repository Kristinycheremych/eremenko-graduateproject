import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import './sidebar_style.css';
import { menuItems } from './DataSidebar';

function Sidebar({ children }: any) {

    const [isOpen, setIsOpen] = useState(true);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(new Array(menuItems.length).fill(false));

    const toggleSubMenu = (index: any) => {
        setIsSubMenuOpen((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    const toggle = () => {
        setIsOpen(!isOpen);
        setIsSubMenuOpen(new Array(menuItems.length).fill(false));
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
                    {menuItems.map((item, index) => (
                        <NavLink to={item.path} key={index}>
                            <NavLink
                                to={item.path || '#'}
                                key={index}
                                className={isOpen ? "link open" : "link "}
                                onClick={() => toggleSubMenu(index)}
                            >
                                <div className="icon">{item.icon}</div>
                                <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
                                    {item.title}
                                </div>
                                <div style={{ display: isOpen ? 'block' : 'none' }} className='arrow'>{item.arrow}</div>
                            </NavLink>
                            
                            {isSubMenuOpen[index] && item.subnav && (
                                <div className="subnav">
                                    {item.subnav.map((subitem, subindex) => (
                                        <NavLink to={subitem.path} key={subindex} className="sublink">
                                            <div style={{ display: isOpen ? 'block' : 'none' }} className="sublink_text">
                                                {subitem.title}
                                            </div>
                                        </NavLink>
                                    ))}
                                    
                                </div>
                            )}
                        </NavLink>
                    ))}

                </div >
                <main>{children}</main>
            </div >
        </>
    );
}

export default Sidebar;