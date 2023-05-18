import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {LOGIN_FAILURE, loginUser, loginWhitGoogle} from '../../redux/actions/actions';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './LoginForm.module.css';
import { GoogleLogin } from '@react-oauth/google';
import { useToasts } from "react-toast-notifications";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Form, Button, Container } from 'react-bootstrap';



const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const { addToast } = useToasts();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    console.log(user);
  }, [user]);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password))
        .then((result) => {
          if(result.type === LOGIN_FAILURE) {
            alert(result.payload)
          } else {
                  const user = result.payload; // Obtener el objeto del usuario desde el resultado
                  const name = user.name;
                  const toastContent = (
                    <Container>
                      Bienvenido, <strong>{name}</strong>
                    </Container>
                  );
                    addToast(toastContent, { appearance: "success" });
                    history.push('/');
          }
        })
  };

    const handleGoogleResponse = async (googleResponse) => {
        dispatch(loginWhitGoogle(googleResponse.credential))
            .then((result) => {
                if(result.type === LOGIN_FAILURE) {
                    alert(result.payload)
                } else {
                  const user = result.payload; // Obtener el objeto del usuario desde el resultado
                  const name = user.name;
                  const toastContent = (
                    <Container>
                      Bienvenido, <strong>{name}</strong>
                    </Container>
                  );
                    addToast(toastContent, { appearance: "success" });
                    history.push('/');
                }
            })
    };

    const errorMessageFromGoogle = (error) => {
        console.log(error);
    };

    return (
      < Container>
        <Form className={styles['form-container']} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Container className={styles['password-input']}>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {showPassword ? (
                <FaEyeSlash onClick={togglePasswordVisibility} />
              ) : (
                <FaEye onClick={togglePasswordVisibility} />
              )}
            </Container>
          </Form.Group>
          <Container id="googleAuth">
            <GoogleLogin
              onSuccess={handleGoogleResponse}
              onError={errorMessageFromGoogle}
              text="Custom"
            />
          </Container>
          <Button className={styles['form-button']} type="submit">
            Submit
          </Button>
        </Form>
      </ Container>
    );
    
};

export default LoginForm;
