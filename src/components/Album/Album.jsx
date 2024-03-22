import React from "react";

export default function Album() {

    
  const SubirImagenesClodinari = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", import.meta.env.VITE_API_UPLOAD_PRESET);

    const response = await fetch(import.meta.env.VITE_API_CLOUDINARY_URL, {
      method: "POST",
      body: data,
    });

    const file = await response.json();
    setFormData({ ...formData, [e.target.id]: file.secure_url });
  };

  return (
    <div class="container">
      
    </div>
  );
}
