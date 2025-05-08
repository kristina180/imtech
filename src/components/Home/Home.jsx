"use client";

import Categories from "../Categories/Categories";
import Poster from "../Poster/Poster";
import Products from "../Products/Products";
import PosterSecond from "../PosterSecond/PosterSecond";

import { useSelector } from "react-redux";

import styles from "./Home.module.css";

export default function Home() {
  const { products, category } = useSelector((state) => state);

  return (
    <div className={styles.page}>
      <Poster />
      <Products
        products={products.products}
        amount={5}
        titlefirst="Popular"
        buttontext="See More"
      />

      <Categories
        titlefirst="Worth Seen"
        products={products.products}
        amount={5}
        categories={category.category}
      />
      <PosterSecond />
      <Products
        products={products.products}
        amount={5}
        titlefirst="New Lots"
        buttontext="See More"
      />
    </div>
  );
}
