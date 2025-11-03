import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import PacienteService from "../services/PacienteService";

function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [pacienteEditando, setPacienteEditando] = useState(null);

  const [formData, setFormData] = useState({
    primerNombre: "",
    primerApellido: "",
    segundoApellido: "",
    fechaNacimiento: "",
    genero: "",
    direccion: "",
    correo: "",
  });

  // Cargar pacientes
  const cargarPacientes = async () => {
    try {
      setLoading(true);
      const data = await PacienteService.listar();
      setPacientes(data);
    } catch (err) {
      console.error("❌ Error al listar pacientes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarPacientes();
  }, []);

  // Abrir modal para registrar o editar
  const abrirModal = (modo, paciente = null) => {
    if (modo === "editar" && paciente) {
      setFormData({ ...paciente });
      setPacienteEditando(paciente);
      setModoEdicion(true);
    } else {
      setFormData({
        primerNombre: "",
        primerApellido: "",
        segundoApellido: "",
        fechaNacimiento: "",
        genero: "",
        direccion: "",
        correo: "",
      });
      setModoEdicion(false);
      setPacienteEditando(null);
    }
    setShowModal(true);
  };

  // Registrar o actualizar
  const guardarPaciente = async () => {
    try {
      if (modoEdicion) {
        await PacienteService.actualizar(pacienteEditando.idPaciente, formData);
      } else {
        await PacienteService.registrar(formData);
      }
      setShowModal(false);
      cargarPacientes();
    } catch (err) {
      console.error("❌ Error al guardar paciente:", err);
      alert("Hubo un error al registrar o actualizar el paciente.");
    }
  };

  // Eliminar paciente
  const eliminarPaciente = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este paciente?")) {
      try {
        await PacienteService.eliminar(id);
        cargarPacientes();
      } catch (err) {
        console.error("❌ Error al eliminar paciente:", err);
      }
    }
  };

  // Control del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Render
  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Gestión de Pacientes</h2>

      <div className="text-end mb-3">
        <Button variant="success" onClick={() => abrirModal("nuevo")}>
          + Nuevo Paciente
        </Button>
      </div>

      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" />
          <p className="mt-2">Cargando pacientes...</p>
        </div>
      ) : (
        <table className="table table-striped align-middle">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Primer Nombre</th>
              <th>Primer Apellido</th>
              <th>Correo</th>
              <th>Género</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.length > 0 ? (
              pacientes.map((p) => (
                <tr key={p.idPaciente}>
                  <td>{p.idPaciente}</td>
                  <td>{p.primerNombre}</td>
                  <td>{p.primerApellido}</td>
                  <td>{p.correo}</td>
                  <td>{p.genero}</td>
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
                      onClick={() => eliminarPaciente(p.idPaciente)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No hay pacientes registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Modal de registro / edición */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modoEdicion ? "Editar Paciente" : "Registrar Paciente"}
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
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Género</Form.Label>
              <Form.Select
                name="genero"
                value={formData.genero}
                onChange={handleChange}
              >
                <option value="">Seleccione</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={guardarPaciente}>
            {modoEdicion ? "Guardar Cambios" : "Registrar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Pacientes;