import { storage } from "../../Firebase/firebase";
import { useState, useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { User } from '../../../../server/src/db'

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : "";
  const [profileImageUrl, setProfileImageUrl] = useState(user ? user.image : "");
  const fileInputRef = useRef(null);

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
      console.log(imageUrl);

      // Actualizar la URL de la imagen en el objeto de usuario en localStorage
      const updatedUser = { ...user, image: imageUrl };
      // deberia llamar al API PUT
        ///action  put

      localStorage.setItem("user", JSON.stringify(updatedUser));
      // await User.Update({ image: imageUrl }, { where: { id: userId } });
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      {user ? (
        <>
          <input
            type="file"
            accept="image/*"
            capture="user"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          <button onClick={handleButtonClick}>Seleccionar foto de perfil</button>
          {profileImageUrl ? (
            <img src={profileImageUrl} alt="Foto de perfil" />
          ) : (
            <img src='https://w7.pngwing.com/pngs/404/920/png-transparent-computer-icons-user-profile-barcelona-miscellaneous-blue-logo.png'/>
          )}
          <p>Name: {user.name}</p>
          <p>Lastname: {user.lastName}</p>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
