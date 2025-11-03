import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Spinner, InputGroup } from "react-bootstrap";
import NivelUrgenciaService from "../services/NivelUrgenciaService";

function NivelesUrgencia() {
  const [niveles, setNiveles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [nivelEditando, setNivelEditando] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const [formData, setFormData] = useState({
    codigoNivel: "",
    descripcion: "",
  });

  const cargarNiveles = async () => {
    try {
      setLoading(true);
      const data = await NivelUrgenciaService.listar();
      setNiveles(data);
    } catch (err) {
      console.error("❌ Error al listar niveles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarNiveles();
  }, []);

  const abrirModal = (modo, item = null) => {
    if (modo === "editar" && item) {
      setFormData({ ...item });
      setModoEdicion(true);
      setNivelEditando(item);
    } else {
      setFormData({
        codigoNivel: "",
        descripcion: "",
      });
      setModoEdicion(false);
      setNivelEditando(null);
    }
    setShowModal(true);
  };

  const guardarNivel = async () => {
    try {
      if (modoEdicion) {
        await NivelUrgenciaService.actualizar(nivelEditando.idNivelUrgencia, formData);
      } else {
        await NivelUrgenciaService.registrar(formData);
      }
      setShowModal(false);
      cargarNiveles();
    } catch (err) {
      console.error("❌ Error al guardar nivel:", err);
      alert("Error al registrar o actualizar el nivel de urgencia.");
    }
  };

  const eliminarNivel = async (id) => {
    if (window.confirm("¿Deseas eliminar este nivel de urgencia?")) {
      try {
        await NivelUrgenciaService.eliminar(id);
        cargarNiveles();
      } catch (err) {
        console.error("❌ Error al eliminar nivel:", err);
      }
    }
  };

  const buscarPorCodigo = async () => {
    if (!busqueda.trim()) {
      cargarNiveles();
      return;
    }
    try {
      const data = await NivelUrgenciaService.buscarPorCodigo(busqueda.trim());
      setNiveles([data]);
    } catch (err) {
      console.error("❌ Error al buscar por código:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Gestión de Niveles de Urgencia</h2>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button variant="success" onClick={() => abrirModal("nuevo")}>
          + Nuevo Nivel
        </Button>

        <InputGroup style={{ width: "280px" }}>
          <Form.Control
            placeholder="Buscar por código..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <Button variant="primary" onClick={buscarPorCodigo}>
            Buscar
          </Button>
        </InputGroup>
      </div>

      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" />
          <p className="mt-2">Cargando niveles...</p>
        </div>
      ) : (
        <table className="table table-striped align-middle">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Código</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {niveles.length > 0 ? (
              niveles.map((n) => (
                <tr key={n.idNivelUrgencia}>
                  <td>{n.idNivelUrgencia}</td>
                  <td>{n.codigoNivel}</td>
                  <td>{n.descripcion}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => abrirModal("editar", n)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => eliminarNivel(n.idNivelUrgencia)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No hay niveles registrados.
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
            {modoEdicion ? "Editar Nivel de Urgencia" : "Registrar Nivel de Urgencia"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Código del Nivel</Form.Label>
              <Form.Control
                type="number"
                name="codigoNivel"
                value={formData.codigoNivel}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={guardarNivel}>
            {modoEdicion ? "Guardar Cambios" : "Registrar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default NivelesUrgencia;