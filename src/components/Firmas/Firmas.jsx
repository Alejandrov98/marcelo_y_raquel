import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetFirmas, GetInvitados, PostFirma } from "../../redux/actions";
import { Carousel, Form, Button } from "react-bootstrap";
import Style from "./Firmas.module.css";

export default function Firmas() {
  const firmas = useSelector((state) => state.firmas);
  const invitados = useSelector((state) => state.invitados);

  const [formData, setFormData] = useState({
    id_invitado: "",
    mensaje: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetFirmas());
    dispatch(GetInvitados());
  }, []);

  const getNombreCompletoById = (id) => {
    const invitado = invitados.find((invitado) => invitado.id === id);
    return invitado ? invitado.nombre_completo : "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(PostFirma(formData));
      dispatch(GetFirmas());
      setFormData({ ...formData, mensaje: "" }); // Limpiar el mensaje después de publicar
    } catch (error) {
      console.error("Error al publicar la firma:", error);
    }
  };

  const handleChangeSelect = (e) => {
    setFormData({ ...formData, id_invitado: e.target.value });
  };

  const handleChangeMensaje = (e) => {
    if (e.target.value.length <= 750) {
      setFormData({ ...formData, mensaje: e.target.value });
    }
  };

  return (
    <div>
      <div className={Style.container} id="libroFirmas">
        <Carousel interval={10000}>
          {firmas.map((firma) => (
            <Carousel.Item key={firma.id} className={Style.background}>
              <div className={Style.carouselItemContent}>
                <p className={Style.firmaMensaje}>{firma.mensaje}</p>
                <br />
                <p className={Style.firmaAutor}>
                  {getNombreCompletoById(firma.id_invitado)}
                </p>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div className={Style.formContainer}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formInvitado">
            <Form.Label>Autor</Form.Label>
            <Form.Control
              as="select"
              value={formData.id_invitado}
              onChange={handleChangeSelect}
            >
              <option value="">Selecciona un invitado</option>
              {invitados.map((invitado) => (
                <option key={invitado.id} value={invitado.id}>
                  {invitado.nombre_completo}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formMensaje">
            <br />
            <Form.Label>Deja tu mensaje:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Escribe tu mensaje aquí (máximo 750 caracteres, mínimo 10)"
              value={formData.mensaje}
              onChange={handleChangeMensaje}
            />
          </Form.Group>
          <br />
          <Button variant="light" type="submit" disabled={formData.mensaje.length < 10}>
            Publicar
          </Button>
        </Form>
      </div>
    </div>
  );
}
