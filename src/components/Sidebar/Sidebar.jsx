"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const rezult = useSelector((state) => state.category.category);

  const pathname = usePathname();
  let category = pathname.replace("/category/", "");

  return (
    <div className={styles.sidebar}>
      <div className={styles.title}>CATEGORIES</div>
      <nav>
        <ul className={styles.menu}>
          {rezult.map((elem, index) => (
            <li key={index}>
              {elem == category ? (
                <Link
                  href={`/category/${elem}`}
                  className={`${styles.selected} ${styles.link}`}
                >
                  {elem[0].toUpperCase() + elem.slice(1)}
                </Link>
              ) : (
                <Link href={`/category/${elem}`} className={styles.link}>
                  {elem[0].toUpperCase() + elem.slice(1)}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.footer}>
        <div>
          <Link href="/help">Help</Link>
        </div>
        <div className={styles.footerterm}>
          <Link href="/terms">Term & Conditions</Link>
        </div>
      </div>
    </div>
  );
}
