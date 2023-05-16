import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {LOGIN_FAILURE, loginUser} from '../../redux/actions/actions';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password))
        .then((result)=> {
          if(result.type === LOGIN_FAILURE) {
            alert(result.payload)
          } else {
            history.push('/');
          }
        })
  };

  return (
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
      <button className={styles['form-button']} type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;
