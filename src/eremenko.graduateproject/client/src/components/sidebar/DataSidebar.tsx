import { GoProjectRoadmap } from "react-icons/go";
import { SlPeople } from "react-icons/sl";
import { IoDocumentTextOutline } from "react-icons/io5";

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
  }
];
