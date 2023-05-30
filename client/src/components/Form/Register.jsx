import { useState } from "react";
import { Snackbar, Alert, AlertTitle } from "@mui/material";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/actions/actions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./Register.module.css";
import * as yup from "yup";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Register = () => {
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

  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showSnackbar, setShowSnackbar] = useState(false);

  const onSubmit = (data) => {
    dispatch(createUser(data))
      .then(() => {
        setShowSnackbar(true);
        setTimeout(() => {
          history.push("/login");
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBlur = (event) => {
    trigger(event.target.name);
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
          <AlertTitle>Registro exitoso</AlertTitle>
        </Alert>
      </Snackbar>

      <form onSubmit={handleSubmit(onSubmit)} className={styles["form-container"]}>
        <h2 className={styles["form-title"]}>Register</h2>
        <label htmlFor="name" className={styles["form-label"]}>
          Name:
        </label>
        <div className={styles["input-container"]}>
          <input
            {...register("name", { onBlur: handleBlur })}
            type="text"
            placeholder="Name"
            className={styles["form-input"]}
          />
          {errors.name && (
            <p className={styles["error-message"]}>{errors.name.message}</p>
          )}
        </div>
        <label htmlFor="lastName" className={styles["form-label"]}>
          Last name:
        </label>
        <div className={styles["input-container"]}>
          <input
            {...register("lastName", { onBlur: handleBlur })}
            type="text"
            placeholder="Last name"
            className={styles["form-input"]}
            style={{ width: "100%" }}
          />
          {errors.lastName && (
            <p className={styles["error-message"]}>{errors.lastName.message}</p>
          )}
        </div>
        <label htmlFor="email" className={styles["form-label"]}>
          Email:
        </label>
        <div className={styles["input-container"]}>
          <input
            {...register("email", { onBlur: handleBlur })}
            type="email"
            placeholder="Email"
            className={styles["form-input"]}
          />
          {errors.email && (
            <div className={styles["error-message"]}>{errors.email.message}</div>
          )}
        </div>

        <label htmlFor="password" className={styles["form-label"]}>
          Password:
        </label>
        <div className={styles["input-container"]}>
          <input
            {...register("password", { onBlur: handleBlur })}
            type="password"
            placeholder="Password"
            className={styles["form-input"]}
          />
          {errors.password && (
            <div className={styles["error-message"]}>{errors.password.message}</div>
          )}
        </div>

        <button type="submit" className={styles["form-button"]}>
          Send
        </button>

        <p>
          Already have an acount?{" "}
          <Link to="/login" className={styles.link}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
