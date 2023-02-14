import React from "react";
import RegisterForm from "../components/forms/RegisterForm";
import Card from "../components/UI/Card";
import Header from "../components/UI/Header";

function Register() {
  return (
    <section className="flex w-full justify-center self-center">
      <div className="w-1/2">
        <Card>
          <Header text="Registro" />

          <RegisterForm />
        </Card>
      </div>
    </section>
  );
}

export default Register;
