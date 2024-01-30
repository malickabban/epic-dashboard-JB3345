import React from "react";
import styles from "./style/Sidebar.module.css"
import {
    MdDashboard,
    MdAnalytics,
    MdOutlineSettings,
    MdHelpCenter,
    MdLogout,
  } from "react-icons/md";
import Menu from "./Menu";

const menuItems = [
    {
      title: "Pages",
      list: [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: <MdDashboard />,
        },
      ],
    },
    {
      title: "Analytics",
      list: [
        {
          title: "Calculation",
          path: "/dashboard/reports",
          icon: <MdAnalytics />,
        }
      ],
    },
    {
      title: "User",
      list: [
        {
          title: "Settings",
          path: "/dashboard/settings",
          icon: <MdOutlineSettings />,
        },
        {
          title: "Help",
          path: "/dashboard/help",
          icon: <MdHelpCenter />,
        },
        {
            title: "Logout",
            path: "/dashboard/logout",
            icon: <MdLogout />,
          }
      ],
    },
  ];

const Sidebar = () => {
    return (
        <div className={styles.container}>
            <ul>
                { menuItems.map(cat => (
                <li key={cat.title}>
                <span className={styles.cat}>{ cat.title }</span>
                {cat.list.map((item) => (
                    <Menu item={item} key={item.title} />
                ))}
                </li>
            ))}
            </ul>
        </div>
    )
}

export default Sidebar