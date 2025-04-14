import Link from "next/link";
import Image from "next/image";
import styles from "./Products.module.css";

export default function Products({
  titlefirst,
  products = [],
  amount,
  buttontext,
}) {
  const list = products.filter((_, i) => i < amount);
  return (
    <div className={styles.products}>
      {titlefirst && <div className={styles.titlefirst}>{titlefirst}</div>}

      <div className={styles.list}>
        {list.map(({ id, image, title, price }) => (
          <Link href={`/product/${id}`} key={id} className={styles.linkproduct}>
            <div className={styles.divimage}>
              <Image
                src={image}
                alt=""
                width={170}
                height={170}
                className={styles.image}
              />
            </div>

            <div className={styles.wrapper}>
              <h3 className={styles.title}>
                {title.split(" ").slice(0, 3).join(" ")}
              </h3>
              <div className={styles.price}>{`${price}$`}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
