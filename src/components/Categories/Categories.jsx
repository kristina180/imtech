import Link from "next/link";
import Image from "next/image";

import styles from "./Categories.module.css";

export default function Categories({
  titlefirst,
  products = [],
  amount,
  categories = [],
}) {
  const list = categories.filter((_, i) => i < amount);

  return (
    <div className={styles.section}>
      {titlefirst && <div className={styles.titlefirst}>{titlefirst}</div>}
      {products.length != 0 && (
        <div className={styles.list}>
          {list.map((categ, index) => {
            const obj = products.findLast((elem) => elem.category == categ);
            const image = obj.image;

            return (
              <Link
                key={index}
                href={`/category/${categ}`}
                className={styles.linkcategories}
              >
                <div className={styles.divimage}>
                  <Image
                    src={image}
                    alt=""
                    width={170}
                    height={170}
                    className={styles.image}
                  />
                </div>

                <div className={styles.title}>
                  {categ[0].toUpperCase() + categ.slice(1)}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
