"use client";
import styles from "./Cart.module.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import {
  removeFromCart,
  cleanCart,
  addToCart,
  checkAuth,
} from "@/store/userSlice";
import { useDispatch } from "react-redux";

import { useRouter } from "next/navigation";

export default function Cart() {
  const { push } = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.user.cart);
  let sum = cart.reduce((sum, elem) => sum + elem.quantity * elem.price, 0);

  return (
    <>
      <div className={styles.section}>
        <div className={styles.firsttitle}>Your cart</div>
        <div className={styles.products}>
          {cart.length != 0 ? (
            cart.map(({ id, image, title, price, quantity }) => {
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

                    <div className={styles.quantity}>
                      <button
                        className={styles.minus}
                        onClick={() => dispatch(removeFromCart({ id }))}
                      >
                        –
                      </button>
                      <div className={styles.quantitycount}>{quantity}</div>
                      <button
                        className={styles.plus}
                        onClick={() => dispatch(addToCart({ id }))}
                      >
                        +
                      </button>
                    </div>

                    <div className={styles.pricewhole}>{price * quantity}$</div>
                  </div>
                  <button
                    className={styles.buttondelete}
                    onClick={() =>
                      dispatch(removeFromCart({ id, delete: true }))
                    }
                  >
                    ✕
                  </button>
                </div>
              );
            })
          ) : (
            <div className={styles.empty}>Cart empty</div>
          )}
        </div>
        <div className={styles.footer}>
          <div className={styles.totalprice}>TOTAL PRICE: {sum}$</div>
          <button
            onClick={() => {
              dispatch(cleanCart());
              alert("Заказ офомрлен");
            }}
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </>
  );
}
