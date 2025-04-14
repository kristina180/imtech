"use client";
import styles from "./Sidebar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { use } from "react";
import { getCategoryProducts } from "@/store/categorySlice";
import { useDispatch, useSelector } from "react-redux";

export default function Sidebar() {
  const rezult = useSelector((state) => state.category.category);
  const pathname = usePathname();
  let category = pathname.replace("/category/", "");
  const dispatch = useDispatch();

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
