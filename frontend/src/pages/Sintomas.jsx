import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Spinner, InputGroup } from "react-bootstrap";
import SintomaService from "../services/SintomaService";

function Sintomas() {
  const [sintomas, setSintomas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [sintomaEditando, setSintomaEditando] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const [formData, setFormData] = useState({
    nombreSintoma: "",
    descripcion: "",
  });

  const cargarSintomas = async () => {
    try {
      setLoading(true);
      const data = await SintomaService.listar();
      setSintomas(data);
    } catch (err) {
      console.error("❌ Error al listar síntomas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarSintomas();
  }, []);

  const abrirModal = (modo, item = null) => {
    if (modo === "editar" && item) {
      setFormData({ ...item });
      setModoEdicion(true);
      setSintomaEditando(item);
    } else {
      setFormData({
        nombreSintoma: "",
        descripcion: "",
      });
      setModoEdicion(false);
      setSintomaEditando(null);
    }
    setShowModal(true);
  };

  const guardarSintoma = async () => {
    try {
      if (modoEdicion) {
        await SintomaService.actualizar(sintomaEditando.idSintoma, formData);
      } else {
        await SintomaService.registrar(formData);
      }
      setShowModal(false);
      cargarSintomas();
    } catch (err) {
      console.error("❌ Error al guardar síntoma:", err);
      alert("Error al registrar o actualizar el síntoma.");
    }
  };

  const eliminarSintoma = async (id) => {
    if (window.confirm("¿Deseas eliminar este síntoma?")) {
      try {
        await SintomaService.eliminar(id);
        cargarSintomas();
      } catch (err) {
        console.error("❌ Error al eliminar síntoma:", err);
      }
    }
  };

  const buscarPorPalabra = async () => {
    if (!busqueda.trim()) {
      cargarSintomas();
      return;
    }
    try {
      const data = await SintomaService.buscarPorPalabraClave(busqueda.trim());
      setSintomas(data);
    } catch (err) {
      console.error("❌ Error al buscar síntomas:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Gestión de Síntomas</h2>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button variant="success" onClick={() => abrirModal("nuevo")}>
          + Nuevo Síntoma
        </Button>

        <InputGroup style={{ width: "300px" }}>
          <Form.Control
            placeholder="Buscar síntoma..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <Button variant="primary" onClick={buscarPorPalabra}>
            Buscar
          </Button>
        </InputGroup>
      </div>

      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" />
          <p className="mt-2">Cargando síntomas...</p>
        </div>
      ) : (
        <table className="table table-striped align-middle">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Nombre del Síntoma</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sintomas.length > 0 ? (
              sintomas.map((s) => (
                <tr key={s.idSintoma}>
                  <td>{s.idSintoma}</td>
                  <td>{s.nombreSintoma}</td>
                  <td>{s.descripcion}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => abrirModal("editar", s)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => eliminarSintoma(s.idSintoma)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No hay síntomas registrados.
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
            {modoEdicion ? "Editar Síntoma" : "Registrar Síntoma"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Nombre del Síntoma</Form.Label>
              <Form.Control
                name="nombreSintoma"
                value={formData.nombreSintoma}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
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
          <Button variant="primary" onClick={guardarSintoma}>
            {modoEdicion ? "Guardar Cambios" : "Registrar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Sintomas;