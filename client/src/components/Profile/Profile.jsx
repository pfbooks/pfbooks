import { useState } from "react";
import { getProfilePhotoUrl, profilePicture } from "../../firebase/firebase";

const Profile = () => {
  const [photo, setPhoto] = useState({
    url: ""
  });

  const handleChangeFile = async (event) => {
    const files = event.target.files;
    const fileReader = new FileReader();

    if (fileReader && files && files.length > 0) {
      fileReader.readAsArrayBuffer(files[0]);
      fileReader.onload = async function () {
        const imageData = fileReader.result;
        const res = await profilePicture(imageData);
        console.log(res);
        if (res) {
          const url = await getProfilePhotoUrl(res.metadata.fullPath);
          console.log(url);
          setPhoto({ ...photo, url });
        }
      };
    }
  };

  return (
    <div>
      <h1>Profile View</h1>
      <button>Add image</button>
      <input onChange={(event) => { handleChangeFile(event) }} type="file" />
      {photo.url && <img src={photo.url} alt="Profile" />}
    </div>
  );
};

export default Profile;