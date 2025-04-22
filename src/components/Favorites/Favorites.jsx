"use client";
import styles from "./Favorites.module.css";
import { useSelector } from "react-redux";
import Image from "next/image";
import {
  addToCart,
  removeFromFavorites,
  removeFromCart,
  checkAuth,
} from "@/store/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Favorites() {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { cart, favorites, user } = useSelector((state) => state.user);

  useEffect(() => {
    const cookies = document.cookie
      .split(";")
      .find((elem) => elem.includes("token"));

    if (!cookies) {
      return;
    } else {
      const token = cookies.replace("token=", "");

      if (user == null) {
        dispatch(checkAuth(token));
      }
    }
  }, []);

  return (
    <>
      <div className={styles.section}>
        <div className={styles.firsttitle}>Your favorites</div>
        <div className={styles.products}>
          {favorites.length != 0 ? (
            favorites.map(({ id, image, title, price, quantity }) => {
              return (
                <div className={styles.productitem} key={id}>
                  <div className={styles.divimage}>
                    <Image
                      src={image}
                      alt=""
                      width={100}
                      height={100}
                      className={styles.image}
                      onClick={() => push(`/product/${id}`)}
                    />
                  </div>
                  <div className={styles.info}>
                    <div
                      className={styles.title}
                      onClick={() => push(`/product/${id}`)}
                    >
                      {title.split(",")[0]}
                    </div>
                    <div className={styles.priceone}>{price}$</div>
                    {!cart.find((elem) => elem.id == id) ? (
                      <button
                        className={styles.buttonCart}
                        onClick={() => {
                          dispatch(addToCart({ id, products }));
                        }}
                      >
                        Add to cart
                      </button>
                    ) : (
                      <div className={styles.quantity}>
                        <button
                          className={styles.minus}
                          onClick={() => dispatch(removeFromCart({ id }))}
                        >
                          –
                        </button>
                        <div className={styles.quantitycount}>
                          {cart.find((elem) => elem.id == id).quantity}
                        </div>
                        <button
                          className={styles.plus}
                          onClick={() => dispatch(addToCart({ id }))}
                        >
                          +
                        </button>
                      </div>
                    )}
                    <button
                      className={styles.buttondelete}
                      onClick={() =>
                        dispatch(removeFromFavorites({ id, delete: true }))
                      }
                    >
                      ✕
                    </button>
                  </div>

                  {/* <button
                      className={styles.buttonCart}
                      onClick={() => {
                        dispatch(addToCart({ id, products }));
                      }}
                    >
                      Add to cart
                    </button> */}
                </div>
              );
            })
          ) : (
            <div className={styles.empty}>Favorites empty</div>
          )}
        </div>
      </div>
    </>
  );
}
