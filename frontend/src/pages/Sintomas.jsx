import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Spinner, InputGroup, Badge } from "react-bootstrap";
import SintomaService from "../services/SintomaService";
import EnfermedadService from "../services/EnfermedadService";
import "../styles/enfermedades.css"; 

function Sintomas() {
  const [sintomas, setSintomas] = useState([]);
  const [enfermedadesDisponibles, setEnfermedadesDisponibles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [sintomaEditando, setSintomaEditando] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const [formData, setFormData] = useState({
    nombreSintoma: "",
    descripcion: "",
    enfermedadesAsociadas: [],
  });

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [dataSin, dataEnf] = await Promise.all([
        SintomaService.listar(),
        EnfermedadService.listar(),
      ]);
      setSintomas(dataSin);
      setEnfermedadesDisponibles(dataEnf);
    } catch (err) {
      console.error("❌ Error al cargar datos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const abrirModal = (modo, item = null) => {
    if (modo === "editar" && item) {
      setFormData({
        ...item,
        enfermedadesAsociadas: item.enfermedadesAsociadas || [],
      });
      setModoEdicion(true);
      setSintomaEditando(item);
    } else {
      setFormData({
        nombreSintoma: "",
        descripcion: "",
        enfermedadesAsociadas: [],
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
      cargarDatos();
    } catch (err) {
      console.error("❌ Error al guardar síntoma:", err);
      alert("Error al registrar o actualizar el síntoma.");
    }
  };

  const eliminarSintoma = async (id) => {
    if (window.confirm("¿Deseas eliminar este síntoma?")) {
      try {
        await SintomaService.eliminar(id);
        cargarDatos();
      } catch (err) {
        console.error("❌ Error al eliminar síntoma:", err);
      }
    }
  };

  const buscarPorPalabra = async () => {
    if (!busqueda.trim()) {
      cargarDatos();
      return;
    }
    try {
      const data = await SintomaService.buscarPorPalabraClave(busqueda.trim());
      setSintomas(data);
    } catch (err) {
      alert("No se encontraron síntomas con ese término.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEnfermedadChange = (idEnfermedad) => {
    const seleccionadas = formData.enfermedadesAsociadas.includes(idEnfermedad)
      ? formData.enfermedadesAsociadas.filter((id) => id !== idEnfermedad)
      : [...formData.enfermedadesAsociadas, idEnfermedad];
    setFormData({ ...formData, enfermedadesAsociadas: seleccionadas });
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
        <table className="table table-striped align-middle table-hover shadow-sm rounded">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Nombre del Síntoma</th>
              <th>Descripción</th>
              <th>Enfermedades Asociadas</th>
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
                    {s.enfermedadesAsociadas && s.enfermedadesAsociadas.length > 0 ? (
                      s.enfermedadesAsociadas.map((id) => {
                        const enf = enfermedadesDisponibles.find(
                          (x) => x.idEnfermedad === id
                        );
                        return (
                          <Badge bg="secondary" key={id} className="sintoma-badge">
                            {enf ? enf.nombreEnfermedad : "—"}
                          </Badge>
                        );
                      })
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
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
                <td colSpan="5" className="text-center text-muted">
                  No hay síntomas registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modoEdicion ? "Editar Síntoma" : "Registrar Síntoma"}</Modal.Title>
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

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Asociar Enfermedades</Form.Label>
              <div className="sintomas-container">
                {enfermedadesDisponibles.map((e) => (
                  <div
                    key={e.idEnfermedad}
                    className={`sintoma-chip ${
                      formData.enfermedadesAsociadas.includes(e.idEnfermedad)
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleEnfermedadChange(e.idEnfermedad)}
                  >
                    {e.nombreEnfermedad}
                  </div>
                ))}
              </div>
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