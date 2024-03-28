import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetInvitados, PostInvitado } from "../../redux/actions";
import { Button, Form } from "react-bootstrap";
import Style from "./Confirmar.module.css";

export default function Confirmar() {
  const dispatch = useDispatch();

  const initialState = {
    nombre_completo: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [showComponent, setShowComponent] = useState(true); // Nuevo estado para controlar la visibilidad del componente

  useEffect(() => {
    const currentDate = new Date();
    const april7_2024 = new Date(2024, 3, 8); 

    if (currentDate > april7_2024) {
      setShowComponent(false);
    } else {
      dispatch(GetInvitados());
    }
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(PostInvitado(formData));

      // Reiniciar el formulario después del envío exitoso
      setFormData(initialState);
    } catch (error) {
      console.error("Error al registrar el invitado: ", error);
    }
  };

  if (!showComponent) {
    return null; // Retorna null si no se debe mostrar el componente
  }

  return (
    <div className={Style.container} id="confirmarAsistencia">
      <h1>Confirmar Asistencia</h1>
      <div className={Style.formContainer}>
        <Form onSubmit={handleSubmit} className={Style.formContainer}>
          <Form.Group controlId="nombre_completo">
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control
              type="text"
              name="nombre_completo"
              placeholder="Ej: Marisa Velez"
              value={formData.nombre_completo}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <br />
          <div className={Style.botCenter}>
            <Button variant="light" type="submit">
              Confirmar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
