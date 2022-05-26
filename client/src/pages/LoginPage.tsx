import * as React from "react";
import { CSSProperties } from "react";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";

function LoginPage() {
  return (
    <div style={loginPageLayout}>
      <h1>
        Log in below 
        <i style={{ color: "rgb(32, 129, 226)" }}> or register now</i>
      </h1>
      <div style={tempFormLayout}>
        <LoginForm />
        <RegisterForm />
      </div>
    </div>
  );
}

export default LoginPage;

const loginPageLayout: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "3rem",
  textAlign: 'center'
};

const tempFormLayout: CSSProperties = {
  display: "flex",
  gap: "2rem",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap"
};
