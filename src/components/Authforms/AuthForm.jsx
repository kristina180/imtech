"use client";

import UserSignupForm from "./UserSignupForm";
import UserLoginForm from "./UserLoginForm";

import { useDispatch, useSelector } from "react-redux";

import { toggleForm } from "@/store/userSlice";

import styles from "./Authform.module.css";

export default function AuthForm() {
  const { showForm, formType } = useSelector(({ user }) => user);

  const dispatch = useDispatch();

  return showForm ? (
    <>
      <div
        className={styles.overlay}
        onClick={() => dispatch(toggleForm(false))}
      />
      {formType === "signup" ? <UserSignupForm /> : <UserLoginForm />}
    </>
  ) : (
    <></>
  );
}
