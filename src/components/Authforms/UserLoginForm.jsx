"use client";

import { useEffect, useState } from "react";
import styles from "./Authform.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleForm, toggleTypeForm, loginUser } from "@/store/userSlice";

export default function UserLoginForm() {
  const dispatch = useDispatch();
  const [values, setValue] = useState({
    email: "",
    password: "",
  });

  function handleChange({ target: { value, name } }) {
    setValue({ ...values, [name]: value });
  }

  let allusers = useSelector((state) => state.user.allusers);

  function handleSubmit(e) {
    e.preventDefault();

    const isEmpty = Object.values(values).some((elem) => !elem);
    if (isEmpty) return;

    const found = allusers.find((elem) => elem.email == values.email);

    if (found) {
      if (found.password == values.password) {
        dispatch(loginUser(values));
        dispatch(toggleForm(false));
      } else {
        alert("Неверный пароль");
      }
    } else {
      alert("Такого пользователя нет");
    }
  }

  return (
    <div className={styles.section}>
      <div className={styles.formsection}>
        <div className={styles.title}>Register</div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.group}>
            <input
              type="email"
              placeholder="Your email"
              name="email"
              value={values.email}
              autoComplete="off"
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className={styles.group}>
            <input
              type="password"
              placeholder="Your password"
              name="password"
              value={values.password}
              autoComplete="off"
              onChange={handleChange}
              required
            ></input>
          </div>
          <div
            className={styles.link}
            onClick={() => {
              dispatch(toggleTypeForm("signup"));
            }}
          >
            Sign up
          </div>
          <button type="submit" className={styles.submit}>
            Login
          </button>
        </form>
      </div>
      <button
        className={styles.closeform}
        onClick={() => dispatch(toggleForm(false))}
      >
        ✕
      </button>
    </div>
  );
}
