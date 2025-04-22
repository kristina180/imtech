"use client";

import Link from "next/link";
import Image from "next/image";
import logoImage from "../../../public/logo.svg";
import avatarImg from "../../../public/avatar.svg";
import iconSearch from "../../../public/icon_search.svg";
import iconFavorites from "../../../public/favorites.svg";
import iconCart from "../../../public/cart.svg";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toggleForm } from "@/store/userSlice";

import styles from "./Header.module.css";

export default function Header() {
  const [userValue, setUserValue] = useState("Guest");
  const [filterValue, setFilterValue] = useState([]);
  const [userAvatar, setAvatar] = useState(avatarImg);
  const [searchValue, setSearchValue] = useState("");
  const cart = useSelector((state) => state.user.cart);
  const products = useSelector((state) => state.products.products);
  const user = useSelector((state) => state.user.user);
  const { push } = useRouter();
  const dispatch = useDispatch();

  function addArr(arr, arr1) {
    let arr2 = [...arr].concat(arr1);
    return arr2;
  }

  function hanleSearch({ target: { value } }) {
    setSearchValue(value);
    let rezult = [];
    if (value != "") {
      const filters = value.toLowerCase().split(" ");
      filters.forEach((elem) => {
        if (elem != "") {
          const filter = products.filter((item) => {
            return (
              item.title.includes(value) ||
              item.title.toLowerCase().includes(elem) ||
              item.brand.includes(elem) ||
              item.model.toLowerCase().includes(elem)
            );
          });
          rezult = new Set(addArr(rezult, filter));
        }
      });

      setFilterValue([...rezult]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleClick() {
    if (!user) {
      dispatch(toggleForm(true));
    } else {
      push("/profile");
    }
  }

  useEffect(() => {
    if (!user) return;
    setUserValue(user.name);
    setAvatar(user.avatar);
  }, [user]);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      const text = document.getElementById("text");
      const searchinput = document.getElementById("searchinput");
      const searchform = document.getElementById("searchform");
      if (!searchinput.contains(e.target) && !searchform.contains(e.target)) {
        setSearchValue("");
      }
    });
  });

  return (
    <div className={styles.header}>
      <Image
        src={logoImage}
        alt="logo"
        className={styles.logo}
        onClick={() => push("/")}
      />

      <div className={styles.info}>
        <div className={styles.user} onClick={handleClick}>
          <Image
            src={userAvatar}
            alt="avatar"
            width={50}
            height={50}
            className={styles.avatar}
          />

          <div className={styles.username}>{userValue}</div>
        </div>

        <form className={styles.form} id="form" onSubmit={handleSubmit}>
          <div className={styles.formforsearch} id="searchform">
            <Image
              className={styles.searchicon}
              src={iconSearch}
              width={20}
              alt="icon search"
            />
            <input
              value={searchValue}
              className={styles.input}
              type="text"
              name="search"
              placeholder="Search for anything"
              autoComplete="off"
              onChange={hanleSearch}
              id="searchinput"
            ></input>
          </div>
          {searchValue && (
            <>
              {filterValue.length > 0 ? (
                <div className={styles.box} id="box">
                  {filterValue.map((elem) => (
                    <div key={`values_${elem.id}`}>
                      <Link
                        href={`/product/${elem.id}`}
                        className={styles.boxelem}
                      >
                        <Image src={elem.image} width={40} height={40} alt="" />
                        {elem.title.split(" ").slice(0, 3).join(" ")}
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.text}>"Nothing searched"</div>
              )}
            </>
          )}
        </form>

        <div className={styles.cartfav}>
          <Image
            src={iconFavorites}
            alt="favorites"
            onClick={() => push("/favorites")}
            className={styles.fav}
          />
          <div className={styles.cart}>
            <Image
              src={iconCart}
              alt="cart"
              onClick={() => push("/cart")}
              className={styles.cartimg}
            />
            <div className={styles.count}>{cart.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
