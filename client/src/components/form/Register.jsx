import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Box,
  Heading,
} from "@chakra-ui/core";
import { useDispatch } from "react-redux";
import { createUser } from "../redux/actions/userActions";

const Register = () => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createUser(formValues));
  };

  return (
    <Box maxWidth="500px" mx="auto">
      <Heading as="h1" size="xl" textAlign="center" my={6}>
        Create User
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="last_name">Last Name</FormLabel>
            <Input
              type="text"
              id="last_name"
              name="last_name"
              value={formValues.last_name}
              onChange={handleChange}
              placeholder="Enter your last name"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              id="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </FormControl>
          <Button type="submit" variantColor="blue">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Register;

