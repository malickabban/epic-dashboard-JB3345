import React from "react";
import styles from "./style/Sidebar.module.css"
import {
    MdDashboard,
    MdOutlineSettings,
    MdHelpCenter,
    MdLogout,
    MdHistory,
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
      title: "User",
      list: [
        {
          title: "History",
          path: "/dashboard/history",
          icon: <MdHistory />,
        },
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
      ]
    },
  ];

const Sidebar = () => {
    return (
        <div className={styles.container}>
            <ul>
                { menuItems.map(cat => (
                <li key={cat.title}>
                <hr/>
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