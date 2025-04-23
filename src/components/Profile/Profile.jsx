"use client";

import {
  updateUser,
  toggleForm,
  checkAuth,
  logoutChange,
} from "@/store/userSlice";
import styles from "./Profile.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Profile() {
  const { user, logout } = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const [values, setValue] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });
  const [logoutValue, setLogout] = useState(user ? false : true);

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

  function handleChange({ target: { value, name } }) {
    setValue({ ...values, [name]: value });
  }

  function logoutClick() {
    document.cookie = "token=; Max-Age=-1;";
    setLogout(true);
    dispatch(logoutChange());
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
          {user && (
            <button
              type="submit"
              className={`${styles.submit} ${styles.logout}`}
              onClick={logoutClick}
            >
              Log out
            </button>
          )}
        </form>
      )}
    </div>
  );
}
