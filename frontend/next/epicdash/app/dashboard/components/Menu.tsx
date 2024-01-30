"use client"

import Link from 'next/link'
import styles from './style/Menu.module.css'
import { usePathname } from 'next/navigation'

interface MenuItem {
    path: string;
    icon: React.ReactNode; // Adjust the type based on the type of icon you expect
    title: string;
  }
  
  const Menu = ({ item }: { item: MenuItem }) => {
    const pathname = usePathname();
  
    return (
      <Link href={item.path} className={`${styles.container} ${pathname === item.path && styles.active}`}>
        {item.icon}
        {item.title}
      </Link>
    );
  };

export default Menu