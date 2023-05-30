import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import styles from './About.module.css';
import equipoImage from './equipo.png';
import libroswebImage from './librosweb.jpg';
import profile1Image from './profile1.jpg';
import natalyImage from './nataly.jpg';
import lautaroImage from './lautaro.jpg';
import profile4Image from './profile4.jpg';
import marcosImage from './marcos.jpeg';
import profile6Image from './profile6.jpg';
import '@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

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

  // Información de las personas
  const teamMembers = [
    {
      name: 'Gonzalo',
      lastName: 'Calderón',
      photo: profile1Image,
      github: 'https://github.com/GonzaJCalderon',
      linkedin: 'https://www.linkedin.com/in/gonzalo-calder%C3%B3n-204218257'
    },
    {
      name: 'Nataly',
      lastName: 'Revelo',
      photo: natalyImage,
      github: 'https://github.com/nreveloz',
      linkedin: 'https://www.linkedin.com/in/nataly-revelo'
    },
    {
      name: 'Lautaro',
      lastName: 'Soto',
      photo: lautaroImage,
      github: 'https://github.com/LautaroUnlp',
      linkedin: 'https://www.linkedin.com/in/lautarosoto'
    },
    {
      name: 'Jorge',
      lastName: 'Jimenez',
      photo: profile4Image,
      github: 'https://github.com/JorgeJ97',
      linkedin: 'https://www.linkedin.com/in/lautarosoto'
    },
    {
      name: 'Marcos',
      lastName: 'Novella',
      photo: marcosImage,
      github: 'https://github.com/MarcosNovella',
      linkedin: 'https://www.linkedin.com/in/marcos-novella-frey/'
    },
    {
      name: 'Gaston',
      lastName: 'Garcia Juri',
      photo: profile6Image,
      github: 'https://github.com/gastigarciajuri',
      linkedin: 'https://www.linkedin.com/in/lautarosoto'
    },
  ];

  return (
    <div className={styles.aboutContainer}>
      <h2>Somos Serendipia</h2>
      <p>
        En nuestra tienda de libros virtuales, nos apasiona fomentar la lectura y brindar acceso fácil y conveniente a una amplia selección de libros electrónicos. Desde nuestra fundación en 2010, hemos crecido con el objetivo de convertirnos en el destino preferido para los amantes de la lectura digital.
      </p>
      <div className={styles.teamContainer}>
        {teamMembers.map((member, index) => (
          <div className={styles.card} key={index}>
            <img src={member.photo} alt={`${member.name} ${member.lastName}`} />
            <h3>{`${member.name} ${member.lastName}`}</h3>
            <div className={styles.socialLinks}>
              {member.github && (
                <a href={member.github} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              )}
              {member.linkedin && (
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

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
          className={`${styles.opinionBox} ${styles.opinionTextArea}`}
        />
        <button type="submit" className={`${styles.opinionButton} ${styles.submitButton}`}>
          Enviar opinión
        </button>
      </form>

      <div className={styles.contactInfo}>
        <h3>¡Conéctate con nosotros!</h3>
        <p>Síguenos en nuestras redes sociales:</p>
        <div className={styles.socialMediaLinks}>
          <a href="https://www.facebook.com/tu-tienda-de-libros" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <FontAwesomeIcon icon={faFacebook} className={styles.socialIcon} />
          </a>
          <a href="https://www.instagram.com/tu-tienda-de-libros" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <FontAwesomeIcon icon={faInstagram} className={styles.socialIcon} />
          </a>
          <a href="https://www.twitter.com/tu-tienda-de-libros" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <FontAwesomeIcon icon={faTwitter} className={styles.socialIcon} />
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
