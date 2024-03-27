import { GoProjectRoadmap } from 'react-icons/go';
import { IoSettingsOutline } from 'react-icons/io5';
import { SlPeople } from 'react-icons/sl';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { IoMdArrowDropright } from "react-icons/io";

// interface MenuItem {
//     path: string;
//     title: string;
//     icon: React.ReactNode;
//     subnav?: MenuItem[];
// }

export const menuItems = [
    {
        path: '/',
        title: 'Документы',
        icon: <IoDocumentTextOutline />,
    },
    {
        path: '/projectspage',
        title: 'Проекты',
        icon: <GoProjectRoadmap />,
    },
    {
        path: '#',
        title: 'Сотрудники',
        icon: <SlPeople />,
        arrow: <IoMdArrowDropright/>,
        subnav: [
            {
                title: "Все",
                path: '/employeesPage',
                icon: <IoSettingsOutline />
            }
        ],
    },
    {
        path: '#',
        title: 'Панель управления',
        icon: <IoSettingsOutline />,
        arrow: <IoMdArrowDropright/>,
        subnav: [
            {
                path: '#',
                title: 'Проекты',
                subnav: [
                    {
                        title: "Статус проекта",
                        path: '/projectStatuses'
                    },
                    {
                        title: "Статус задач",
                        path: '/taskStatuses'
                    },
                ]
            },
            {
                path: '#',
                title: 'Сотрудники',
                subnav: [
                    {
                        title: "Статус проекта",
                        path: '/projectStatuses'
                    },
                    {
                        title: "Статус задач",
                        path: '/taskStatuses'
                    },
                ]
            },
            {
                path: '#',
                title: 'Документы',
                subnav: [
                    {
                        title: "Статус проекта",
                        path: '/projectStatuses'
                    },
                    {
                        title: "Статус задач",
                        path: '/taskStatuses'
                    },
                ]
            }
        ],
    }
];