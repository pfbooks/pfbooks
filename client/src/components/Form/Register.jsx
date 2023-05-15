// import { useState } from 'react';
// import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
// import axios from 'axios';

// const Formulario = () => {
//   const [name, setName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       await axios.post('/users', { name, lastName, email, password });
//       setName('');
//       setLastName('');
//       setEmail('');
//       setPassword('');
//       alert('Usuario creado exitosamente');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <Box maxWidth="500px" mx="auto">
//       <Form onSubmit={handleSubmit}>
//         <FormControl id="name" isRequired>
//           <FormLabel>Nombre</FormLabel>
//           <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//         </FormControl>

//         <FormControl id="lastName" isRequired>
//           <FormLabel>Apellido</FormLabel>
//           <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
//         </FormControl>

//         <FormControl id="email" isRequired>
//           <FormLabel>Correo electrónico</FormLabel>
//           <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         </FormControl>

//         <FormControl id="password" isRequired>
//           <FormLabel>Contraseña</FormLabel>
//           <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </FormControl>

//         <Button mt={4} colorScheme="teal" type="submit">
//           Crear usuario
//         </Button>
//       </Form>
//     </Box>
//   );
// };

// export default Formulario;
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/actions/actions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./Register.module.css";
import * as yup from "yup";
import { useToasts } from "react-toast-notifications";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FaHome } from 'react-icons/fa';
import NavBar from "../NavBar/NavBar";

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


  const onSubmit = (data) => {
    dispatch(createUser(data))
      .then(() => {
        addToast("Usuario creado correctamente", { appearance: "success" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  const handleBlur = (event) => {
    trigger(event.target.name);
  };

  return (
    <div>
      <NavBar/>

    <div className={styles["background"]}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles["form-container"]}
      >
        <Link to="/">
          <FaHome className={styles["home-icon"]} style={{ color: "#04ab77" }}/>
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
          <p className={styles["error-message"]}>{errors.lastName.message}</p>
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

        
      </form>
    </div>
    </div>
  );
};

export default Register;
