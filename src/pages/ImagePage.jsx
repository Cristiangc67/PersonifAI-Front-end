import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import axios from "axios";


const ImagePage = () => {
  const { actualUser, updateUserImage } = useContext(AuthContext);
  const API_URL = "http://localhost:5500/api/v1/users";

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const name = file.name;
    const position = name.lastIndexOf(".");
    const extension = name.substring(position);
    const newName = actualUser.id + extension;

    const newFile = new File([file], newName, { type: file.type });
    console.log(newFile);

    // Crear FormData
    const data = new FormData();
    data.append("image", newFile);

    try {
      const res = await axios.put(`${API_URL}/${actualUser.id}/image`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const newImageUrl = res.data.user.profilePicture;
      updateUserImage(newImageUrl);

      console.log(res.data); 
      console.log(res.data.secure_url); 
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  return (
    <div>
      <div>
        {actualUser?.image && (
          <img
            src={actualUser.image}
            alt="Profile"
            style={{ maxWidth: "200px", marginBottom: "20px" }}
          />
        )}
      </div>
      <input
        type="file"
        className="bg-neutral-600"
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default ImagePage;
