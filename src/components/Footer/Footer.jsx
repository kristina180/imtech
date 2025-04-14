"use client";
import styles from "./Footer.module.css";
import logoImage from "../../../public/logo.svg";
import Link from "next/link";
import Image from "next/image";
import youtubeIcon from "../../../public/youtubicon.svg";
import instaIcon from "../../../public/instaicon.svg";
import { useRouter } from "next/navigation";

export default function Footer() {
  const { push } = useRouter();
  return (
    <div className={styles.footer}>
      <Image
        src={logoImage}
        alt="logo"
        className={styles.logo}
        onClick={() => push("/")}
      />

      <div className={styles.writers}>Developed by Kristina Gusyasyan</div>
      <div className={styles.smicons}>
        <Image
          src={youtubeIcon}
          alt="youtube icon"
          onClick={() => push("https://www.youtube.com/")}
          className={styles.youtube}
        />

        <Image
          src={instaIcon}
          alt="insta icon"
          onClick={() => push("https://instagram.com/")}
          className={styles.insta}
        />
      </div>
    </div>
  );
}
