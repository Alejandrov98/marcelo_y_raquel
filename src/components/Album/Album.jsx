import React, { useEffect, useState } from "react";
import Style from "./Album.module.css";
import { useSelector, useDispatch } from "react-redux";
import { GetFotos, PostFoto, GetInvitados } from "../../redux/actions";
import { FaImage } from "react-icons/fa6";

export default function Album() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id_invitado: "",
    picture: "",
  });
  
  const invitados = useSelector((state) => state.invitados);
  const fotos = useSelector((state) => state.fotos);

  useEffect(() => {
    dispatch(GetFotos());
    dispatch(GetInvitados());
  }, []);

  const SubirImagenesClodinari = async (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const data = new FormData();
      data.append("file", files[0]);
      data.append("upload_preset", import.meta.env.VITE_API_UPLOAD_PRESET);

      const response = await fetch(import.meta.env.VITE_API_CLOUDINARY_URL, {
        method: "POST",
        body: data,
      });

      const file = await response.json();
      setFormData({ ...formData, picture: file.secure_url });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(PostFoto(formData));
      dispatch(GetFotos());
    } catch (error) {
      console.error("Error al publicar la foto:", error);
      // setShowError(true);
    }
  };

  return (
    <div className={Style.container} id="fotos">
      <h3 className={Style.album}>Álbum</h3>
      <p className={Style.auxilary}>
        Puedes cargar tus fotos del Evento Aqui...
      </p>

      <div className={Style.uploadContainer}>
        {/* Formulario para cargar la foto */}
        <form onSubmit={handleSubmit}>
          {!formData.picture && (
            <div className={Style.customFileInput}>
              <input
                type="file"
                name="file"
                onChange={(e) => SubirImagenesClodinari(e)}
                className={Style.uploadFotoInput}
                required
                id="fileInput"
              />
              <label htmlFor="fileInput" className={Style.iconImage}>
                <FaImage />
              </label>
            </div>
          )}
          
          {formData.picture && (
            <div>
              <img src={formData.picture} alt="" className={Style.imageRendered} />
            </div>
          )}


          <div>
            {/* Select para seleccionar el invitado */}
            <select
              class="form-select"
              onChange={(e) => {
                setFormData({ ...formData, id_invitado: e.target.value });
                setSelectedInvitado(e.target.value);
              }}
              required
            >
              <option value="">Quién sube esta foto?</option>
              {invitados.map((invitado) => (
                <option key={invitado.id} value={invitado.id}>
                  {invitado.nombre_completo}
                </option>
              ))}
            </select>
          </div>
          <br />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Botón para publicar */}
            <button
              type="submit"
              class="btn btn-light"
              disabled={!formData.picture}
            >
              Publicar
            </button>
          </div>
        </form>
      </div>

      <br />
      <h3 className={Style.album}> 📸 Las fotos 📸</h3>

      {/* Mostrar las fotos */}
      <div
        class="container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          maxWidth: "100%",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {fotos
          .map((foto) => {
            const invitadoSubidor = invitados.find(
              (invitado) => invitado.id === foto.id_invitado
            );
            return (
              <div key={foto.id} className={Style.card}>
                <img src={foto.picture} alt="" className={Style.image} />
                <p className={Style.autor}>
                  {invitadoSubidor
                    ? invitadoSubidor.nombre_completo
                    : "Desconocido"}
                </p>
              </div>
            );
          })
          .reverse()}
      </div>
    </div>
  );
}
