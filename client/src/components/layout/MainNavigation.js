import { NavLink, Link, useNavigate } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import React, { useContext } from "react";
import AuthContext from "../../store/Auth/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faFileLines,
  faRightFromBracket,
  faUserPlus,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { pruebaActions } from "../../store/Prueba/prueba-slice";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/");
  };

  return (
    <header className={classes.header}>
      <Link
        className={classes.logo}
        to="/"
        onClick={() => dispatch(pruebaActions.resetInformation())}
      >
        ActiveBrain
      </Link>

      <nav className={classes.nav}>
        <ul>
          {authCtx.isLoggedIn && (
            <li>
              <NavLink
                onClick={() => dispatch(pruebaActions.resetInformation())}
                to="/home"
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
              >
                <FontAwesomeIcon className="mr-7" icon={faHouse} />
                Home
              </NavLink>
            </li>
          )}

          {authCtx.isLoggedIn && (
            <li>
              <NavLink
                onClick={() => dispatch(pruebaActions.resetInformation())}
                to="/prueba-rapida"
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
              >
                <FontAwesomeIcon className="mr-7" icon={faFileLines} />
                Prueba Rapida
              </NavLink>
            </li>
          )}

          {authCtx.isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>
                <FontAwesomeIcon className="mr-7" icon={faRightFromBracket} />
                Cerrar Sesión
              </button>
            </li>
          )}

          {!authCtx.isLoggedIn && (
            <li>
              <NavLink
                to="/login"
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
              >
                <FontAwesomeIcon
                  className="mr-7"
                  icon={faArrowRightToBracket}
                />
                Login
              </NavLink>
            </li>
          )}

          {!authCtx.isLoggedIn && (
            <li>
              <NavLink
                to="/register"
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
              >
                <FontAwesomeIcon className="mr-7" icon={faUserPlus} />
                Register
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
