import React, { useContext, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import AuthContext from "./store/Auth/auth-context";

const PerfilPaciente = React.lazy(() => import("./pages/PerfilPaciente"));
const Home = React.lazy(() => import("./pages/Home"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Welcome = React.lazy(() => import("./pages/Welcome"));
const Register = React.lazy(() => import("./pages/Register"));
const PruebaRapida = React.lazy(() => import("./pages/PruebaRapida"));
const Login = React.lazy(() => import("./pages/Login"));

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Suspense
        fallback={
          <center>
            <LoadingSpinner />
          </center>
        }
      >
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={authCtx.isLoggedIn ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/prueba-rapida"
            element={
              authCtx.isLoggedIn ? <PruebaRapida /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/profile/:pacienteId"
            element={
              authCtx.isLoggedIn ? <PerfilPaciente /> : <Navigate to="/login" />
            }
          />

          <Route
            path="/profile/:graph"
            element={
              authCtx.isLoggedIn ? <PerfilPaciente /> : <Navigate to="/login" />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
