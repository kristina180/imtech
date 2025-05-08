"use client";
import styles from "./Home.module.css";
import Categories from "../Categories/Categories";
import Poster from "../Poster/Poster";
import Products from "../Products/Products";
import PosterSecond from "../PosterSecond/PosterSecond";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { checkAuth } from "@/store/userSlice";

export default function Home() {
  const { products, category } = useSelector((state) => state);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
