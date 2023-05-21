import { storage } from "../../Firebase/firebase";
import { useState, useRef, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { userById, putProfileImage } from "../../redux/actions/actions";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import styles from "./Profile.module.css";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : "";
  const [profileImageUrl, setProfileImageUrl] = useState(user ? user.image : "");
  const fileInputRef = useRef(null);

  const profileImage = useSelector((state) => (state.user ? state.user.image : null));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userById(userId));
  }, [dispatch, userId]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [profileImageUrl]);

  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];
    const storageRef = ref(storage, `profileImages/${userId}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    try {
      // Subir la imagen al almacenamiento de Firebase
      await uploadTask;
      // Obtener la URL de la imagen subida
      const imageUrl = await getDownloadURL(storageRef);
      // Actualizar el estado de la URL de la imagen
      setProfileImageUrl(imageUrl);
      // Actualizar la URL de la imagen en el objeto de usuario en localStorage
      const updatedUser = { ...user, image: imageUrl };

      // Llamar a la API PUT con imageUrl
      dispatch(putProfileImage(userId, imageUrl));

      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className={styles.profile}>
      {user ? (
        <>
          <div className={styles.imageContainer}>
            {profileImageUrl ? (
              <img
                className={`${styles.profileImage} ${loading ? "loading" : "loaded"}`}
                src={profileImageUrl}
                alt="Foto de perfil"
                onLoad={handleImageLoad}
              />
            ) : (
              <img
                className={styles.defaultImage}
                src="https://w7.pngwing.com/pngs/404/920/png-transparent-computer-icons-user-profile-barcelona-miscellaneous-blue-logo.png"
                alt="Foto de perfil predeterminada"
              />
            )}
            <button className={styles.selectButton} onClick={handleButtonClick}>
              Seleccionar foto de perfil
            </button>
          </div>
          <div className={styles.userInfoContainer}>
            <div className={styles.userInfoItem}>
              <span className={styles.icon}><AiOutlineUser /></span>
              <p className={styles.userInfoLabel}>Nombre:</p>
              <p className={styles.userInfoValue}>{user.name}</p>
            </div>
            <div className={styles.userInfoItem}>
              <span className={styles.icon}><AiOutlineUser /></span>
              <p className={styles.userInfoLabel}>Apellido:</p>
              <p className={styles.userInfoValue}>{user.lastName}</p>
            </div>
            <div className={styles.userInfoItem}>
              <span className={styles.icon}><AiOutlineMail /></span>
              <p className={styles.userInfoLabel}>Email:</p>
              <p className={styles.userInfoValue}>{user.email}</p>
            </div>
          </div>
        </>
      ) : (
        <p>Cargando...</p>
      )}
      <input
        type="file"
        accept="image/*"
        capture="user"
        onChange={handleImageUpload}
        style={{ display: "none" }}
        ref={fileInputRef}
      />
    </div>
  );
};

export default Profile;