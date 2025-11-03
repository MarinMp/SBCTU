import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import PersonalMedicoService from "../services/PersonalMedicoService";

function PersonalMedico() {
  const [personal, setPersonal] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [personalEditando, setPersonalEditando] = useState(null);

  const [formData, setFormData] = useState({
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    numeroLicencia: "",
    cargo: "",
    correoInstitucional: "",
  });

  // Cargar personal médico al iniciar
  const cargarPersonal = async () => {
    try {
      setLoading(true);
      const data = await PersonalMedicoService.listar();
      setPersonal(data);
    } catch (err) {
      console.error("❌ Error al listar personal médico:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarPersonal();
  }, []);

  const abrirModal = (modo, item = null) => {
    if (modo === "editar" && item) {
      setFormData({ ...item });
      setModoEdicion(true);
      setPersonalEditando(item);
    } else {
      setFormData({
        primerNombre: "",
        segundoNombre: "",
        primerApellido: "",
        segundoApellido: "",
        numeroLicencia: "",
        cargo: "",
        correoInstitucional: "",
      });
      setModoEdicion(false);
      setPersonalEditando(null);
    }
    setShowModal(true);
  };

  const guardarPersonal = async () => {
    try {
      if (modoEdicion) {
        await PersonalMedicoService.actualizar(personalEditando.idPersonal, formData);
      } else {
        await PersonalMedicoService.registrar(formData);
      }
      setShowModal(false);
      cargarPersonal();
    } catch (err) {
      console.error("❌ Error al guardar personal médico:", err);
      alert("Error al registrar o actualizar el personal médico.");
    }
  };

  const eliminarPersonal = async (id) => {
    if (window.confirm("¿Deseas eliminar este registro?")) {
      try {
        await PersonalMedicoService.eliminar(id);
        cargarPersonal();
      } catch (err) {
        console.error("❌ Error al eliminar personal médico:", err);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Gestión del Personal Médico</h2>

      <div className="text-end mb-3">
        <Button variant="success" onClick={() => abrirModal("nuevo")}>
          + Nuevo Personal Médico
        </Button>
      </div>

      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" />
          <p className="mt-2">Cargando registros...</p>
        </div>
      ) : (
        <table className="table table-striped align-middle">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Nombre Completo</th>
              <th>N° Licencia</th>
              <th>Cargo</th>
              <th>Correo Institucional</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {personal.length > 0 ? (
              personal.map((p) => (
                <tr key={p.idPersonal}>
                  <td>{p.idPersonal}</td>
                  <td>{`${p.primerNombre} ${p.segundoNombre || ""} ${p.primerApellido} ${p.segundoApellido || ""}`}</td>
                  <td>{p.numeroLicencia}</td>
                  <td>{p.cargo}</td>
                  <td>{p.correoInstitucional}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => abrirModal("editar", p)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => eliminarPersonal(p.idPersonal)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No hay personal registrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modoEdicion ? "Editar Personal Médico" : "Registrar Personal Médico"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Primer Nombre</Form.Label>
              <Form.Control
                name="primerNombre"
                value={formData.primerNombre}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Segundo Nombre</Form.Label>
              <Form.Control
                name="segundoNombre"
                value={formData.segundoNombre}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Primer Apellido</Form.Label>
              <Form.Control
                name="primerApellido"
                value={formData.primerApellido}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Segundo Apellido</Form.Label>
              <Form.Control
                name="segundoApellido"
                value={formData.segundoApellido}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Número de Licencia</Form.Label>
              <Form.Control
                name="numeroLicencia"
                value={formData.numeroLicencia}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Cargo</Form.Label>
              <Form.Control
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Correo Institucional</Form.Label>
              <Form.Control
                type="email"
                name="correoInstitucional"
                value={formData.correoInstitucional}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={guardarPersonal}>
            {modoEdicion ? "Guardar Cambios" : "Registrar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PersonalMedico;