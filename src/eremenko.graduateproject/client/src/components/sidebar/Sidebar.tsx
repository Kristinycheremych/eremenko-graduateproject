import React, { useState } from 'react';
import './sidebar_style.css';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu } from "react-icons/fi";
import { GoProjectRoadmap } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { SlPeople } from "react-icons/sl";
import { IoDocumentTextOutline } from "react-icons/io5";


function Sidebar({ children }: any) {
    const [isOpen, setIsOpen] = useState(true);
    // Инициализация состояния:
    const [selectedOption, setSelectedOption] = useState();
    function toggle() {
        setIsOpen(!isOpen);
    }
    const menuItem = [
        {
            path: '/',
            name: 'Документы',
            icon: <IoDocumentTextOutline />,
            children: (
                <select value={selectedOption} onChange={(option: any) => setSelectedOption(option)}>
                    <option value="1">option 1</option>
                    <option value="2">option 2</option>
                </select>
            ),
        },
        {
            path: "/projectsPage",
            name: "Проекты",
            icon: <GoProjectRoadmap />
        },
        {
            path: "/employeesPage",
            name: "Сотрудники",
            icon: <SlPeople />
        },
        {
            path: "/settingsPage",
            name: "Панель управления",
            icon: <IoSettingsOutline />
        }
    ]
    return (
        <>
            <div className='container_sidebar'>
                <div style={{ width: isOpen ? '300px' : '50px' }} className='sidebar'>
                    <div className='top_section'>
                        <Link to='/'>
                            <h1 style={{ display: isOpen ? 'block' : 'none' }} className='logo'>Logo</h1>
                        </Link>
                        <div style={{ marginLeft: isOpen ? '130px' : '0px' }} className='bars'>
                            <FiMenu onClick={toggle} />
                        </div>
                    </div>
                    {
                        menuItem.map((item, index) => (
                            <NavLink to={item.path} key={index} className='link' aria-activedescendant='active'>
                                <div className="icon">{item.icon}</div>
                                <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">{item.name}</div>
                               
                            </NavLink>
                        ))
                    }
                </div>
                <main>{children}</main>
            </div>
        </>
    )
}

export default Sidebar

