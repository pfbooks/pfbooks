import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {LOGIN_FAILURE, loginUser, loginWhitGoogle} from '../../redux/actions/actions';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './LoginForm.module.css';
import { GoogleLogin } from '@react-oauth/google';
import { useToasts } from "react-toast-notifications";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const { addToast } = useToasts();

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password))
        .then((result) => {
          if(result.type === LOGIN_FAILURE) {
            alert(result.payload)
          } else {
              addToast("Sesión Iniciada", { appearance: "success" });
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
                    addToast("Sesión Iniciada", { appearance: "success" });
                    history.push('/');
                }
            })
    };

    const errorMessageFromGoogle = (error) => {
        console.log(error);
    };

  return (
    <div className={styles["login-form"]}>
    <form className={styles['form-container']} onSubmit={handleSubmit}>
      <div>
        <label className={styles['form-label']}>Email:</label>
        <input
          className={styles['form-input']}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className={styles['form-label']}>Password:</label>
        <input
          className={styles['form-input']}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
        <div id="googleAuth">
            <GoogleLogin
                onSuccess={handleGoogleResponse}
                onError={errorMessageFromGoogle}
                text="Custom"
            />
        </div>
        <button className={styles['form-button']} type="submit">Submit</button>
    </form>
    </div>
  );
};

export default LoginForm;