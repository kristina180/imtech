"use client";

import styles from "./CategoryProducts.module.css";
import Link from "next/link";

import { useSelector, useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { checkAuth } from "@/store/userSlice";
import { notPhoto } from "@/utils/constants";

export default function CategoryProducts() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const category = pathname.replace("/category/", "");
  const { products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const category_products =
    products.length > 0
      ? products.filter((elem) => elem.category == category)
      : JSON.parse(localStorage.getItem("startItem")) || "";

  const [inputValue, setInputValue] = useState({
    name: "",
    price: "",
  });
  const [valueProducts, setValueProducts] = useState([...category_products]);
  const [valueView, setValueView] = useState(valueProducts.slice(0, 10));
  const [page, setPage] = useState(1);

  let count_button =
    valueProducts.length != 0
      ? Array.from(
          { length: Math.ceil(valueProducts.length / 10) },
          (_, i) => i + 1
        )
      : [];

  useEffect(() => {
    localStorage.setItem("startItem", JSON.stringify(valueProducts));
  }, [valueProducts]);

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

  function handleChange({ target: { name, value } }) {
    setInputValue({ ...inputValue, [name]: String(value) });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      (inputValue.name == "" && inputValue.price == "") ||
      (inputValue.name == " " && inputValue.price == " ")
    ) {
      setValueProducts(category_products);
      setValueView(category_products.slice(0, 10));
      return;
    }

    const name = inputValue.name.toLowerCase();
    const price = inputValue.price;
    let new_items = [...category_products];

    if ((name != "" && price == "") || (name == "" && price != "")) {
      new_items =
        inputValue.price != ""
          ? category_products.filter((elem) => {
              return elem.price <= Number(inputValue.price);
            })
          : category_products.filter(
              (elem) =>
                elem.title.toLowerCase().includes(name) ||
                String(elem.color).includes(name) ||
                elem.brand.includes(name) ||
                elem.model.includes(name)
            );
    }
    if (name != "" && price != "") {
      new_items = category_products.filter(
        (elem) =>
          elem.price <= inputValue.price &&
          (elem.title.toLowerCase().includes(name) ||
            String(elem.color).includes(name) ||
            elem.brand.includes(name) ||
            elem.model.includes(name))
      );
    }

    setValueProducts(new_items);
    setValueView(new_items.slice(0, 10));
  }

  function clickButton(num) {
    setPage(num);
    setValueView(category_products.slice(num * 10 - 10, num * 10));
  }

  return (
    <div className={styles.section}>
      <div className={styles.titlefirst}>
        {category[0].toUpperCase() + category.slice(1)}
      </div>

      <form className={styles.formsearch} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          name="name"
          value={inputValue.name}
          placeholder="Product name"
          autoComplete="off"
          onChange={handleChange}
        ></input>

        <input
          className={styles.input}
          type="text"
          name="price"
          value={inputValue.price}
          placeholder="Before price"
          autoComplete="off"
          onChange={handleChange}
        ></input>

        <button type="submit" className={styles.buttonsubmit}>
          Search
        </button>
      </form>

      {valueView.length > 0 ? (
        <div className={styles.list}>
          {valueView.map(({ id, image, title, price }) => (
            <Link
              href={`/product/${id}`}
              key={id}
              className={styles.linkproduct}
            >
              <div className={styles.divimage}>
                <img
                  src={image}
                  alt=""
                  width={170}
                  height={170}
                  className={styles.image}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = notPhoto;
                  }}
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
      ) : (
        <div className={styles.nofound}>Products not found</div>
      )}

      <div className={styles.buttons}>
        {count_button.map((elem) => (
          <button
            key={elem}
            onClick={() => clickButton(elem)}
            className={elem == page ? styles.selectedPage : styles.buttonPage}
          >
            {elem}
          </button>
        ))}
      </div>
    </div>
  );
}
