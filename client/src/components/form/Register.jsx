import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useToast
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, getValues }
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);

    // Aquí puedes enviar una solicitud al servidor para registrar al usuario con los datos enviados desde el formulario

    setIsLoading(false);
    toast({
      title: 'Usuario registrado exitosamente.',
      status: 'success',
      duration: 5000,
      isClosable: true
    });
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="6">
          <FormControl isInvalid={errors.username}>
            <FormLabel htmlFor="username">Nombre de usuario</FormLabel>
            <Input
              id="username"
              placeholder="Ingrese su nombre de usuario"
              {...register('username', { required: 'Este campo es requerido' })}
            />
            <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.email}>
            <FormLabel htmlFor="email">Correo electrónico</FormLabel>
            <Input
              id="email"
              placeholder="Ingrese su correo electrónico"
              type="email"
              {...register('email', {
                required: 'Este campo es requerido',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Ingrese una dirección de correo electrónico válida'
                }
              })}
            />
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password}>
            <FormLabel htmlFor="password">Contraseña</FormLabel>
            <Input
              id="password"
              placeholder="Ingrese su contraseña"
              type="password"
              {...register('password', { required: 'Este campo es requerido' })}
            />
            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.confirmPassword}>
            <FormLabel htmlFor="confirmPassword">Confirmar contraseña</FormLabel>
            <Input
              id="confirmPassword"
              placeholder="Confirme su contraseña"
              type="password"
              {...register('confirmPassword', {
                required: 'Este campo es requerido',
                validate: (value) =>
                  value === getValues('password') || 'Las contraseñas deben coincidir'
              })}
            />
            <FormErrorMessage>{errors.confirmPassword && errors.confirmPassword.message}</FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            fontSize="md"
            isLoading={isLoading || isSubmitting}
          >
            Registrar
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default Register;
