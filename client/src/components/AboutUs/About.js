import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import styles from './About.module.css';
import equipoImage from "./equipo.png";
import libroswebImage from "./librosweb.jpg";
import '@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  const [opinion, setOpinion] = useState('');

  const handleOpinionChange = (event) => {
    setOpinion(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes hacer algo con la opinión, como enviarla a un servidor o almacenarla localmente
    console.log(opinion);
  };

  const galleryImages = [
    {
      original: equipoImage,
      thumbnail: equipoImage
    },
    {
      original: libroswebImage,
      thumbnail: libroswebImage
    },
    // Agrega más objetos para más imágenes
  ];

  return (
    <div className={styles.aboutContainer}>
      <h2>Somos Serendipia</h2>
      <p>
        En nuestra tienda de libros virtuales, nos apasiona fomentar la lectura y brindar acceso fácil y conveniente a una amplia selección de libros electrónicos. Desde nuestra fundación en 2010, hemos crecido con el objetivo de convertirnos en el destino preferido para los amantes de la lectura digital.
      </p>

      <div className={styles.imageGallery}>
        <ImageGallery items={galleryImages} />
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="opinion" className={styles.opinionLabel}>
          <FontAwesomeIcon icon={faPencilAlt} className={styles.opinionIcon} />
          Tu opinión nos interesa, te invitamos a que la dejes aquí:
        </label>
        <textarea
          id="opinion"
          name="opinion"
          value={opinion}
          onChange={handleOpinionChange}
          className={styles.opinionBox}
        />
        <button type="submit" className={`${styles.opinionButton} ${styles.submitButton}`}>
          Enviar opinión
        </button>
      </form>

      <div className={styles.contactInfo}>
        <h3>¡Conéctate con nosotros!</h3>
        <p>Síguenos en nuestras redes sociales:</p>
        <div className={styles.socialMediaLinks}>
          <a href="https://www.facebook.com/tu-tienda-de-libros" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://www.instagram.com/tu-tienda-de-libros" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.twitter.com/tu-tienda-de-libros" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
        
        <p>Contáctanos:</p>
        <p>
          <i className="fas fa-phone"></i> Teléfono: +1 123-456-7890
        </p>
        <p>
          <i className="fab fa-whatsapp"></i> WhatsApp: +1 123-456-7890
        </p>
      </div>
    </div>
  );
};

export default About;
