import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetInvitados, PostInvitado } from "../../redux/actions";
import { Button, Form } from "react-bootstrap";
import Style from "./Confirmar.module.css";

export default function Confirmar() {
  const dispatch = useDispatch();
  const invitados = useSelector((state) => state.invitados);

  const initialState = {
    nombre_completo: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(GetInvitados());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si ya existe un invitado con el mismo nombre
    const existeInvitado = invitados.some(
      (invitado) => invitado.nombre_completo === formData.nombre_completo
    );

    if (existeInvitado) {
      setError("Ya existe un invitado con ese nombre");
      return;
    }

    try {
      await dispatch(PostInvitado(formData));
      setFormData(initialState);
      setError(null);
    } catch (error) {
      console.error("Error al registrar el invitado: ", error);
      setError("Error al registrar el invitado");
    }
  };

  return (
    <div className={Style.container} id="confirmarAsistencia">
      <h1 style={{ textAlign: 'center' }}>Estuve en la boda, quiero dejarles mi dedicatoria</h1>
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
          {error && <p className={Style.error}>{error}</p>}
          <br />
          <div className={Style.botCenter}>
            <Button variant="light" type="submit">
              Agregar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
