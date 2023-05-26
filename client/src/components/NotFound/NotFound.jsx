import React from 'react';
import NotFoundGif from './404.gif';

const NotFound = () => {
  return (
    <div>
      <h1>Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no se encuentra.</p>
      <a href="/">Volver a la página de inicio</a>
      <br />
      <img src={NotFoundGif} alt="404 GIF" />
    </div>
  );
};

export default NotFound;

