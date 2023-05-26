import React from 'react';
import NotFoundGif from './404.gif';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1>Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no se encuentra.</p>
      <button className={styles.button} onClick={() => {window.location.href = '/';}}>Volver a la página de inicio</button>
      <br />
      <img src={NotFoundGif} alt="404 GIF" className={styles.gif} />
    </div>
  );
};

export default NotFound;
