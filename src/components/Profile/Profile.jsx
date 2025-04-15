"use client";

import { updateUser, toggleForm } from "@/store/userSlice";
import styles from "./Profile.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Profile() {
  const { user } = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const [values, setValue] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  function handleChange({ target: { value, name } }) {
    setValue({ ...values, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const isEmpty = Object.values(values).some((elem) => !elem);
    if (isEmpty) return;
    dispatch(updateUser(values));

    dispatch(toggleForm(false));
  }

  useEffect(() => {
    if (!user) return;
    setValue(user);
  }, [user]);

  return (
    <div className={styles.profile}>
      {!user ? (
        <div className={styles.nologin}>You need to log in</div>
      ) : (
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
          <div className={styles.group}>
            <input
              type="avatar"
              placeholder="Your avatar"
              name="avatar"
              value={values.avatar}
              autoComplete="off"
              onChange={handleChange}
              required
            ></input>
          </div>

          <button type="submit" className={styles.submit}>
            Update
          </button>
        </form>
      )}
    </div>
  );
}
