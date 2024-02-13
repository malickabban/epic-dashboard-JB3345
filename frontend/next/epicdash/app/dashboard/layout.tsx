import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import styles from "./components/style/Dashboard.module.css"

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <Sidebar />
            </div>
            <div className={styles.content}>
                <Navbar />
                {children}
            </div>
        </div>
    )
}

export default Layout