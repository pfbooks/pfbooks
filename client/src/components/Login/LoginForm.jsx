import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LOGIN_FAILURE,
  loginUser,
  loginWhitGoogle,
} from "../../redux/actions/actions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styles from "./LoginForm.module.css";
import { GoogleLogin } from "@react-oauth/google";
import { Snackbar, Alert, AlertTitle } from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  // Validations
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Campo requerido")
      .max(20, "El nombre no puede tener más de 20 caracteres"),
    lastName: yup
      .string()
      .required("Campo requerido")
      .max(20, "El apellido no puede tener más de 20 caracteres"),
    email: yup
      .string()
      .required("Campo requerido")
      .email("Correo electrónico inválido"),
    password: yup
      .string()
      .required("Campo requerido")
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
  });

  const {
    register,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    console.log(user);
  }, [user]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password)).then((result) => {
      if (result.type === LOGIN_FAILURE) {
        alert(result.payload);
      } else {
        const user = result.payload;
        const name = user.name;
        setShowSnackbar(true);
        setTimeout(() => {
          history.push("/");
        }, 1500);
      }
    });
  };

  const handleGoogleResponse = async (googleResponse) => {
    dispatch(loginWhitGoogle(googleResponse.credential)).then((result) => {
      if (result.type === LOGIN_FAILURE) {
        alert(result.payload);
      } else {
        const user = result.payload;
        const name = user.name;
        setShowSnackbar(true);
        setTimeout(() => {
          history.push("/");
        }, 1500);
      }
    });
  };

  const handleBlur = (event) => {
    trigger(event.target.name);
  };

  const errorMessageFromGoogle = (error) => {
    console.log(error);
  };

  return (
    <div className={styles["container"]}>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={1500}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert severity="success" onClose={() => setShowSnackbar(false)}>
          <AlertTitle>Éxito</AlertTitle>
          Bienvenido, <strong>{user && user.name}</strong>
        </Alert>
      </Snackbar>

      <form className={styles["form-container"]} onSubmit={handleSubmit}>
        <h2 className={styles["form-title"]}>Login</h2>
        <label className={styles["form-label"]}>Email:</label>
        <div className={styles["input-container"]}>
          <input
            {...register("email", { onBlur: handleBlur })}
            className={styles["form-input"]}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {errors.email && (
            <div className={styles["error-message"]}>
              {errors.email.message}
            </div>
          )}
          <br />
        </div>
        <label htmlFor="password" className={styles["form-label"]}>
          Password
        </label>
        <div className={styles["input-container"]}>
          <input
            {...register("password", { onBlur: handleBlur })}
            className={styles["form-input"]}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && (
            <div className={styles["error-message"]}>
              {errors.password.message}
            </div>
          )}
          {showPassword ? (
            <FaEyeSlash
              className={styles["show-password-button"]}
              onClick={togglePasswordVisibility}
            />
          ) : (
            <FaEye
              className={styles["show-password-button"]}
              onClick={togglePasswordVisibility}
            />
          )}
        </div>
        <div id="googleAuth" className={styles.googleAuth}>
          <GoogleLogin
            onSuccess={handleGoogleResponse}
            onError={errorMessageFromGoogle}
            text="Custom"
          />
        </div>
        <button className={styles["form-button"]} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
