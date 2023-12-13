import React, { useRef } from "react";
import styles from "./LoginCard.module.css";
import toast from "react-hot-toast";
import axios from "axios";

const LoginCard = ({ setAllSet, setAuthorityLevel }) => {
  const idRef = useRef();
  const passwordRef = useRef();

  async function queryAdminExistence(object) {
    const { data } = await axios.post("http://localhost:5000/getLoginData", {
      id: JSON.stringify(object?.id),
      password: JSON.stringify(object?.password),
    });

    console.log(data);
    if (data) {
      setAuthorityLevel(data?.authorityLevel);
      toast.success("Authority Level is set to " + data?.authorityLevel);
      return data;
    }
    return false;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (idRef.current.value && passwordRef.current.value) {
      const outcome = await queryAdminExistence({
        id: idRef.current.value,
        password: passwordRef.current.value,
      });
      if (outcome) setAllSet(true);
      else toast.error("Wrong Credentials !!");
    } else toast("All the Fields are necessary");
  }
  return (
    <div id={styles.walletDetails}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} id={styles.form}>
        <label>TeacherID :</label>
        <input placeholder="Teacher ID" ref={idRef} />
        <label>password :</label>
        <input type="password" placeholder="password" ref={passwordRef} />
        <input type="submit" value={"Verify"} />
      </form>
    </div>
  );
};

export default LoginCard;
