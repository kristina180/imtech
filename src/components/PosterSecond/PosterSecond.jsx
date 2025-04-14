"use client";
import styles from "./PosterSecond.module.css";
import Image from "next/image";
import PostSecFirst from "../../../public/posterSecond_1.svg";
import PostSecSecond from "../../../public/posterSecond_2.svg";
import { useRouter } from "next/navigation";

export default function PosterSecond() {
  const { push } = useRouter();
  return (
    <div className={styles.poster}>
      <div className={styles.content}>
        <div className={styles.title}>Pink Collection</div>
        <button
          className={styles.button}
          onClick={() => push(`/category/audio`)}
        >
          See More
        </button>
      </div>
      <div className={styles.images}>
        <Image
          src={PostSecFirst}
          alt="first_pink"
          width={380}
          className={styles.firstImage}
        />
        <Image
          src={PostSecSecond}
          alt="second_pink"
          width={290}
          className={styles.secondImage}
        />
      </div>
    </div>
  );
}
