import React, { useState } from "react";
import api from "../../services/api";
import "./Login.css";

export default function Login({ history }) {
  const [email, setEmail] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await api.post("/sessions", { email });
      const { _id } = response.data;
      localStorage.setItem("user", _id);
      history.push("/dashboard");
    } catch (error) {
      console.error("Giriş işlemi başarısız: ", error);
    }
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="login-title ">AirBnb-TR</h1>
        <p className="login-description">
          Geliştiricilere spotlar sunun ve şirketiniz için yetenekleri bulun.
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-POSTA *</label>
          <input
            className="login-input"
            type="email"
            name="email"
            id="email"
            placeholder="E-posta adresinizi girin"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <button className="login-button" type="submit">
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}
