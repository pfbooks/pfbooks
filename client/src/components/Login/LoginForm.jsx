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
import { useToasts } from "react-toast-notifications";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const { addToast } = useToasts();
  const [showPassword, setShowPassword] = useState(false);

  //validations
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
        const user = result.payload; // Obtener el objeto del usuario desde el resultado
        const name = user.name;
        const toastContent = (
          <div>
            Bienvenido, <strong>{name}</strong>
          </div>
        );
        addToast(toastContent, { appearance: "success" });
        history.push("/");
      }
    });
  };

  const handleGoogleResponse = async (googleResponse) => {
    dispatch(loginWhitGoogle(googleResponse.credential)).then((result) => {
      if (result.type === LOGIN_FAILURE) {
        alert(result.payload);
      } else {
        const user = result.payload; // Obtener el objeto del usuario desde el resultado
        const name = user.name;
        const toastContent = (
          <div>
            Bienvenido, <strong>{name}</strong>
          </div>
        );
        addToast(toastContent, { appearance: "success" });
        history.push("/");
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
      {/* <div className={styles["image-container"]}>
        <img
          src="https://cdn.pixabay.com/photo/2016/11/29/02/26/library-1866844_1280.jpg"
          alt="Imagen"
          className={styles["image"]}
        />
      </div> */}
      <form 
      className={styles["form-container"]} 
      onSubmit={handleSubmit}>
        <h2 className={styles["form-title"]}>Login</h2>
          <label className={styles["form-label"]}>
            Email:
          </label>
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
          <label 
          htmlFor="password" 
          className={styles["form-label"]}>
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
