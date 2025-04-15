"use client";

import { useState } from "react";
import styles from "./Authform.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleForm,
  createUser,
  toggleTypeForm,
  getAllUsers,
} from "@/store/userSlice";

export default function UserSignupForm() {
  const { user, formType } = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const [values, setValue] = useState({
    email: "",
    password: "",
    name: "",
  });

  function handleChange({ target: { value, name } }) {
    setValue({ ...values, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const isEmpty = Object.values(values).some((elem) => !elem);
    if (isEmpty) return;
    dispatch(createUser(values));
    dispatch(toggleForm(false));
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
            <div className={styles.group}>
              <input
                type="name"
                placeholder="Your username"
                name="name"
                value={values.name}
                autoComplete="off"
                onChange={handleChange}
                required
              ></input>
            </div>
            <div
              className={styles.link}
              onClick={() => {
                dispatch(toggleTypeForm("login"));
                dispatch(getAllUsers());
              }}
            >
              I already have an account
            </div>
            <button type="submit" className={styles.submit}>
              Create an account
            </button>
          </div>
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
