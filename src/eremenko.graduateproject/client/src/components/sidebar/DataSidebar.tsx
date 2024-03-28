import { GoProjectRoadmap } from 'react-icons/go';
import { IoSettingsOutline } from 'react-icons/io5';
import { SlPeople } from 'react-icons/sl';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { IoMdArrowDropright } from "react-icons/io";

// interface MenuItem {
//     path: string;
//     title: string;
//     icon: React.ReactNode;
//     subItems?: MenuItem[];
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
        path: 'employeesPage',
        title: 'Сотрудники',
        icon: <SlPeople />
    },
    {
        path: '#',
        title: 'Панель управления',
        icon: <IoSettingsOutline />,
        arrow: <IoMdArrowDropright />,
        subItems: [
            {
                title: 'Проекты',
                arrow: <IoMdArrowDropright />,
                subSections: [
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
                title: 'Сотрудники',
                arrow: <IoMdArrowDropright />,
                subSections: [
                    {
                        title: "Статус сотрудника",
                        path: '/projectStatuses'
                    },
                    {
                        title: "Должность",
                        path: '/taskStatuses'
                    },
                    {
                        title: "Подразделения",
                        path: '/divisions'
                    }
                ]
            },
            {

                title: 'Документы',
                arrow: <IoMdArrowDropright />,
                subSections: [
                    {
                        title: "Все",
                        path: '/documents'
                    }

                ]
            }
        ],
    }
];