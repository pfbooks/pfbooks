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
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../redux/actions/actions';

const Register = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { creatingUser, createUserError } = useSelector((state) => state.user);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = { name, lastName, email, password };
    dispatch(createUser(user));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Nombre:</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <label htmlFor="lastName">Apellido:</label>
      <input
        id="lastName"
        type="text"
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
      />

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <label htmlFor="password">Contraseña:</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <button type="submit" disabled={creatingUser}>
        Crear usuario
      </button>

      {createUserError && <div>{createUserError.message}</div>}
    </form>
  );
};

export default Register;
