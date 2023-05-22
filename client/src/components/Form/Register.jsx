import { useDispatch } from "react-redux";
import { createUser } from "../../redux/actions/actions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./Register.module.css";
import * as yup from "yup";
import { useToasts } from "react-toast-notifications";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FaHome } from "react-icons/fa";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { addToast } = useToasts();
  const history = useHistory();

  const onSubmit = (data) => {
    dispatch(createUser(data))
      .then(() => {
        addToast("Usuario creado correctamente", { appearance: "success" });
        history.push("/login")
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles["form-container"]}
        >
          <Link to="/">
            <FaHome
              className={styles["home-icon"]}
              style={{ color: "#04ab77" }}
            />
          </Link>
          <h2 className={styles["form-title"]}>Crea tu usuario</h2>
          <label htmlFor="name" className={styles["form-label"]}>
            Nombre:
          </label>
          <div className={styles["input-container"]}>
            <input
              {...register("name", { onBlur: handleBlur })}
              type="text"
              placeholder="Nombre"
              className={styles["form-input"]}
            />
            {errors.name && (
              <p className={styles["error-message"]}>{errors.name.message}</p>
            )}
          </div>
          <label htmlFor="lastName" className={styles["form-label"]}>
            Apellido:
          </label>
          <div className={styles["input-container"]}>
            <input
              {...register("lastName", { onBlur: handleBlur })}
              type="text"
              placeholder="Apellido"
              className={styles["form-input"]}
              style={{ width: "100%" }}
            />
            {errors.lastName && (
              <p className={styles["error-message"]}>
                {errors.lastName.message}
              </p>
            )}
          </div>
          <label htmlFor="email" className={styles["form-label"]}>
            Correo electrónico:
          </label>
          <div className={styles["input-container"]}>
            <input
              {...register("email", { onBlur: handleBlur })}
              type="email"
              placeholder="Correo electrónico"
              className={styles["form-input"]}
            />
            {errors.email && (
              <div className={styles["error-message"]}>
                {errors.email.message}
              </div>
            )}
          </div>

          <label htmlFor="password" className={styles["form-label"]}>
            Contraseña:
          </label>
          <div className={styles["input-container"]}>
            <input
              {...register("password", { onBlur: handleBlur })}
              type="password"
              placeholder="Contraseña"
              className={styles["form-input"]}
            />
            {errors.password && (
              <div className={styles["error-message"]}>
                {errors.password.message}
              </div>
            )}
          </div>

          <button type="submit" className={styles["form-button"]}>
            Enviar
          </button>

          <p>
          Ya tienes una cuenta? {" "}
          <a href="/login" className={styles.link}>
            Inicia sesion
          </a>
        </p>
        </form>
    </div>
  );
};

export default Register;
