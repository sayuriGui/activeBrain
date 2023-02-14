import React from "react";
// import { Link } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import Card from "../components/UI/Card";
import Header from "../components/UI/Header";

function Login() {
  return (
    <section className="flex w-full justify-center self-center">
      <div className="w-1/2">
        <Card>
          <Header text="Iniciar Sesión" />

          <LoginForm />
        </Card>
      </div>
    </section>
  );
}

export default Login;
