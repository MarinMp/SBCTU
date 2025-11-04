import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Spinner, InputGroup } from "react-bootstrap";
import { FaBug, FaPlus, FaEdit, FaTrash, FaSearch, FaFileMedical } from "react-icons/fa";
import SintomaService from "../services/SintomaService";
import EnfermedadService from "../services/EnfermedadService";
import "../styles/table-cards.css";
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

  // Colores aleatorios para avatares
  const avatarColors = ['avatar-blue', 'avatar-green', 'avatar-purple', 'avatar-orange', 'avatar-pink'];
  const getAvatarColor = (id) => avatarColors[id % avatarColors.length];

  return (
    <div className="table-cards-container">
      {/* Header */}
      <div className="table-cards-header">
        <h2 className="table-cards-title">Gestión de Síntomas</h2>
        <div className="table-cards-actions">
          {/* Buscador */}
          <div className="search-box">
            <input
              type="text"
              className="search-input"
              placeholder="Buscar síntoma..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && buscarPorPalabra()}
            />
            <button className="search-btn" onClick={buscarPorPalabra}>
              <FaSearch />
            </button>
          </div>

          <button className="btn-add" onClick={() => abrirModal("nuevo")}>
            <FaPlus /> Nuevo Síntoma
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="table-cards-loading">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3" style={{ color: '#64748b' }}>Cargando síntomas...</p>
        </div>
      ) : sintomas.length === 0 ? (
        /* Estado vacío */
        <div className="table-cards-empty">
          <div className="table-cards-empty-icon">
            <FaBug />
          </div>
          <h5 className="table-cards-empty-title">No hay síntomas registrados</h5>
          <p className="table-cards-empty-text">
            {busqueda ? 'No se encontraron síntomas con ese término' : 'Comienza agregando el primer síntoma'}
          </p>
        </div>
      ) : (
        /* Lista de Cards */
        <div className="table-cards-list">
          {sintomas.map((s) => (
            <div key={s.idSintoma} className="table-card-item">
              {/* Avatar */}
              <div className={`table-card-avatar ${getAvatarColor(s.idSintoma)}`}>
                <FaBug />
              </div>

              {/* Contenido */}
              <div className="table-card-content">
                {/* Información principal */}
                <div className="table-card-info" style={{ flex: '2' }}>
                  <h6 className="table-card-name">{s.nombreSintoma}</h6>
                  <p className="table-card-detail" style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '300px'
                  }}>
                    {s.descripcion}
                  </p>
                </div>

                {/* Columna: Enfermedades Asociadas */}
                <div className="table-card-column" style={{ flex: '2', minWidth: '200px' }}>
                  <span className="table-card-column-label">Enfermedades Asociadas</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginTop: '0.25rem' }}>
                    {s.enfermedadesAsociadas && s.enfermedadesAsociadas.length > 0 ? (
                      s.enfermedadesAsociadas.map((id) => {
                        const enf = enfermedadesDisponibles.find((x) => x.idEnfermedad === id);
                        return (
                          <span key={id} className="mini-badge">
                            <FaFileMedical style={{ fontSize: '0.65rem', marginRight: '0.25rem' }} />
                            {enf ? enf.nombreEnfermedad : "—"}
                          </span>
                        );
                      })
                    ) : (
                      <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Sin asociar</span>
                    )}
                  </div>
                </div>

                {/* Columna: ID */}
                <div className="table-card-column">
                  <span className="table-card-column-label">ID</span>
                  <span className="table-card-column-value">#{s.idSintoma}</span>
                </div>
              </div>

              {/* Acciones */}
              <div className="table-card-actions">
                <button
                  className="btn-action btn-edit"
                  onClick={() => abrirModal("editar", s)}
                  title="Editar"
                >
                  <FaEdit />
                </button>
                <button
                  className="btn-action btn-delete"
                  onClick={() => eliminarSintoma(s.idSintoma)}
                  title="Eliminar"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
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
                    className={`sintoma-chip ${formData.enfermedadesAsociadas.includes(e.idEnfermedad)
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