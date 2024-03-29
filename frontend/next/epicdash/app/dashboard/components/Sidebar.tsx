"use client";
import React from "react";
import styles from "./style/Sidebar.module.css"
import { HiMenu } from "react-icons/hi";
import {
    MdDashboard,
    MdOutlineSettings,
    MdHelpCenter,
    MdLogout,
    MdHistory,
  } from "react-icons/md";
import Menu from "./Menu";

const handleCollapse = () => {
  const item = document.getElementById("ulgroup");
  if (item && item.style.display === "none") {
    item.style.display = "block"
  } else if (item) {
    item.style.display = "none"
  }
}
const menuItems = [
    {
      title: "Pages",
      list: [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: <MdDashboard />,
        },
        {
          title: "Diagnosis",
          path: "/dashboard/diagnosis",
          icon: <MdDashboard />,
        },
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
            path: "/",
            icon: <MdLogout />,
          }
      ]
    },
  ];

const Sidebar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.hide} onClick={handleCollapse}>
            <HiMenu size={'30px'} />
            </div>
            <ul className={styles.disp} id="ulgroup">
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