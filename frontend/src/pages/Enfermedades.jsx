import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Spinner, InputGroup } from "react-bootstrap";
import EnfermedadService from "../services/EnfermedadService";

function Enfermedades() {
  const [enfermedades, setEnfermedades] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [enfermedadEditando, setEnfermedadEditando] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroCodigo, setFiltroCodigo] = useState("");

  const [formData, setFormData] = useState({
    nombreEnfermedad: "",
    descripcion: "",
    codigoEnfermedad: "",
    tratamiento: "",
    observaciones: "",
    categoria: "",
  });

  const cargarEnfermedades = async () => {
    try {
      setLoading(true);
      const data = await EnfermedadService.listar();
      setEnfermedades(data);
    } catch (err) {
      console.error("❌ Error al listar enfermedades:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarEnfermedades();
  }, []);

  const abrirModal = (modo, item = null) => {
    if (modo === "editar" && item) {
      setFormData({ ...item });
      setModoEdicion(true);
      setEnfermedadEditando(item);
    } else {
      setFormData({
        nombreEnfermedad: "",
        descripcion: "",
        codigoEnfermedad: "",
        tratamiento: "",
        observaciones: "",
        categoria: "",
      });
      setModoEdicion(false);
      setEnfermedadEditando(null);
    }
    setShowModal(true);
  };

  const guardarEnfermedad = async () => {
    try {
      if (modoEdicion) {
        await EnfermedadService.actualizar(enfermedadEditando.idEnfermedad, formData);
      } else {
        await EnfermedadService.registrar(formData);
      }
      setShowModal(false);
      cargarEnfermedades();
    } catch (err) {
      console.error("❌ Error al guardar enfermedad:", err);
      alert("Error: el código de enfermedad ya existe o los datos son inválidos.");
    }
  };

  const eliminarEnfermedad = async (id) => {
    if (window.confirm("¿Deseas eliminar esta enfermedad?")) {
      try {
        await EnfermedadService.eliminar(id);
        cargarEnfermedades();
      } catch (err) {
        console.error("❌ Error al eliminar enfermedad:", err);
      }
    }
  };

  const filtrarPorCategoria = async () => {
    if (!filtroCategoria.trim()) {
      cargarEnfermedades();
      return;
    }
    try {
      const data = await EnfermedadService.buscarPorCategoria(filtroCategoria.trim());
      setEnfermedades(data);
    } catch (err) {
      alert("No se encontraron enfermedades en esa categoría.");
      console.error("❌ Error al filtrar por categoría:", err);
    }
  };

  const buscarPorCodigo = async () => {
    if (!filtroCodigo.trim()) {
      cargarEnfermedades();
      return;
    }
    try {
      const data = await EnfermedadService.buscarPorCodigo(filtroCodigo.trim());
      setEnfermedades([data]);
    } catch (err) {
      alert("No existe ninguna enfermedad con ese código.");
      console.error("❌ Error al buscar por código:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Gestión de Enfermedades</h2>

      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3" style={{ gap: "1rem" }}>
        <Button variant="success" onClick={() => abrirModal("nuevo")}>
          + Nueva Enfermedad
        </Button>

        <InputGroup style={{ width: "280px" }}>
          <Form.Control
            type="number"
            placeholder="Buscar por código..."
            value={filtroCodigo}
            onChange={(e) => setFiltroCodigo(e.target.value)}
          />
          <Button variant="primary" onClick={buscarPorCodigo}>
            Código
          </Button>
        </InputGroup>

        <InputGroup style={{ width: "300px" }}>
          <Form.Control
            placeholder="Filtrar por categoría (Ej: Neurológica)"
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
          />
          <Button variant="secondary" onClick={filtrarPorCategoria}>
            Categoría
          </Button>
        </InputGroup>
      </div>

      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" />
          <p className="mt-2">Cargando enfermedades...</p>
        </div>
      ) : (
        <table className="table table-striped align-middle">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Código</th>
              <th>Categoría</th>
              <th>Tratamiento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {enfermedades.length > 0 ? (
              enfermedades.map((e) => (
                <tr key={e.idEnfermedad}>
                  <td>{e.idEnfermedad}</td>
                  <td>{e.nombreEnfermedad}</td>
                  <td>{e.codigoEnfermedad}</td>
                  <td>{e.categoria}</td>
                  <td>{e.tratamiento}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => abrirModal("editar", e)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => eliminarEnfermedad(e.idEnfermedad)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No hay enfermedades registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modoEdicion ? "Editar Enfermedad" : "Registrar Enfermedad"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                name="nombreEnfermedad"
                value={formData.nombreEnfermedad}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Código (único)</Form.Label>
              <Form.Control
                type="number"
                name="codigoEnfermedad"
                value={formData.codigoEnfermedad}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Tratamiento</Form.Label>
              <Form.Control
                name="tratamiento"
                value={formData.tratamiento}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Observaciones</Form.Label>
              <Form.Control
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={guardarEnfermedad}>
            {modoEdicion ? "Guardar Cambios" : "Registrar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Enfermedades;