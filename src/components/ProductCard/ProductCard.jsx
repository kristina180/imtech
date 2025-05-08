"use client";

import Products from "../Products/Products";

import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import {
  addToCart,
  removeFromCart,
  addToFavorites,
  removeFromFavorites,
} from "@/store/userSlice";

import { notPhoto } from "@/utils/constants";
import styles from "./ProductCard.module.css";

export default function ProductCard() {
  const { products } = useSelector((state) => state.products);
  const { cart, favorites } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const pathname = usePathname();
  const id = pathname.replace("/product/", "");

  return (
    <>
      {products &&
        products.map((elem) => {
          let [image, title, brand, color, price] = [
            elem.image,
            elem.title,
            elem.brand,
            elem.color,
            elem.price,
          ];
          if (elem.id == id) {
            return (
              <div className={styles.productCart} key={`${id}_cart`}>
                <div className={styles.images}>
                  <img
                    src={image}
                    alt=""
                    width={370}
                    height={370}
                    className={styles.mainimage}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = notPhoto;
                    }}
                  />
                  <img
                    src={image}
                    alt=""
                    width={85}
                    height={85}
                    className={styles.miniimage}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = notPhoto;
                    }}
                  />
                  <img
                    src={image}
                    alt=""
                    width={85}
                    height={85}
                    className={styles.miniimage}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = notPhoto;
                    }}
                  />
                  <img
                    src={image}
                    alt=""
                    width={85}
                    height={85}
                    className={styles.miniimage}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = notPhoto;
                    }}
                  />
                  <img
                    src={image}
                    alt=""
                    width={85}
                    height={85}
                    className={styles.miniimage}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = notPhoto;
                    }}
                  />
                </div>
                <div className={styles.content}>
                  <div className={styles.titleProduct}>
                    <p>{title}</p>
                  </div>
                  <div className={styles.brandProduct}>
                    <p>Brand: {brand[0].toUpperCase() + brand.slice(1)}</p>
                  </div>
                  <div className={styles.colorProduct}>
                    <p>Color: {color[0].toUpperCase() + color.slice(1)}</p>
                  </div>
                  <div className={styles.priceProduct}>{price + "$"}</div>
                  <div className={styles.buttons}>
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

                    {favorites.find((elem) => elem.id == id) ? (
                      <button
                        className={styles.buttonFav}
                        onClick={() => dispatch(removeFromFavorites({ id }))}
                      >
                        Added to favorites
                      </button>
                    ) : (
                      <button
                        className={styles.buttonFav}
                        onClick={() =>
                          dispatch(addToFavorites({ id, products }))
                        }
                      >
                        Add to favorites
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          }
        })}
      <Products
        products={products}
        amount={5}
        titlefirst="Popular"
        buttontext="See More"
      />
    </>
  );
}
