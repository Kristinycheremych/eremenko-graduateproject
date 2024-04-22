import { GoProjectRoadmap } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { SlPeople } from "react-icons/sl";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoMdArrowDropright } from "react-icons/io";

export const menuItems = [
  {
    path: "/documents",
    title: "Документы",
    icon: <IoDocumentTextOutline />,
  },
  {
    path: "/projectsPage",
    title: "Проекты",
    icon: <GoProjectRoadmap />,
  },
  {
    path: "/employeesPage",
    title: "Сотрудники",
    icon: <SlPeople />,
  },
  {
    title: "Панель управления",
    icon: <IoSettingsOutline />,
    arrow: <IoMdArrowDropright />,
    subItems: [
      {
        title: "Проекты",
        arrow: <IoMdArrowDropright />,
        subSections: [
          {
            title: "Статус проекта",
            path: "/projectStatuses",
          },
          {
            title: "Этапы",
            path: "/stagePage",
          },
        ],
      },
      {
        title: "Сотрудники",
        arrow: <IoMdArrowDropright />,
        subSections: [
          {
            title: "Статус сотрудника",
            path: "/employeeStatus",
          },
          {
            title: "Должность",
            path: "/position",
          },
          {
            title: "Подразделения",
            path: "/divisions",
          },
        ],
      },
      {
        title: "Документы",
        arrow: <IoMdArrowDropright />,
        subSections: [
          {
            title: "Все",
            path: "/",
          },
        ],
      },
    ],
  },
];
