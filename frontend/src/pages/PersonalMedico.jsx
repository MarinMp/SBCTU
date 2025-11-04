import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import { FaUserMd, FaPlus, FaEdit, FaTrash, FaEnvelope, FaIdBadge, FaBriefcase } from "react-icons/fa";
import PersonalMedicoService from "../services/PersonalMedicoService";
import "../styles/table-cards.css";

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

  // Colores para avatares según cargo
  const getAvatarColorByCargo = (cargo) => {
    const cargoLower = cargo?.toLowerCase() || '';
    if (cargoLower.includes('doctor') || cargoLower.includes('médico')) return 'avatar-blue';
    if (cargoLower.includes('enfermera') || cargoLower.includes('enfermero')) return 'avatar-green';
    if (cargoLower.includes('especialista')) return 'avatar-purple';
    if (cargoLower.includes('auxiliar')) return 'avatar-orange';
    return 'avatar-pink';
  };

  return (
    <div className="table-cards-container">
      {/* Header */}
      <div className="table-cards-header">
        <h2 className="table-cards-title">Gestión del Personal Médico</h2>
        <div className="table-cards-actions">
          <button className="btn-add" onClick={() => abrirModal("nuevo")}>
            <FaPlus /> Nuevo Personal
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="table-cards-loading">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3" style={{ color: '#64748b' }}>Cargando personal médico...</p>
        </div>
      ) : personal.length === 0 ? (
        /* Estado vacío */
        <div className="table-cards-empty">
          <div className="table-cards-empty-icon">
            <FaUserMd />
          </div>
          <h5 className="table-cards-empty-title">No hay personal médico registrado</h5>
          <p className="table-cards-empty-text">
            Comienza agregando el primer miembro del personal médico
          </p>
        </div>
      ) : (
        /* Lista de Cards */
        <div className="table-cards-list">
          {personal.map((p) => (
            <div key={p.idPersonal} className="table-card-item">
              {/* Avatar */}
              <div className={`table-card-avatar ${getAvatarColorByCargo(p.cargo)}`}>
                <FaUserMd />
              </div>

              {/* Contenido */}
              <div className="table-card-content">
                {/* Información principal */}
                <div className="table-card-info">
                  <h6 className="table-card-name">
                    {p.primerNombre} {p.segundoNombre || ''} {p.primerApellido} {p.segundoApellido || ''}
                  </h6>
                  <p className="table-card-detail">
                    <FaEnvelope /> {p.correoInstitucional}
                  </p>
                </div>

                {/* Columna: Licencia */}
                <div className="table-card-column">
                  <span className="table-card-column-label">Licencia</span>
                  <span className="table-card-column-value">
                    <FaIdBadge style={{ marginRight: '0.5rem', color: '#64748b' }} />
                    {p.numeroLicencia}
                  </span>
                </div>

                {/* Columna: Cargo */}
                <div className="table-card-column">
                  <span className="table-card-column-label">Cargo</span>
                  <span className="table-card-badge badge-activo">
                    <FaBriefcase style={{ marginRight: '0.5rem' }} />
                    {p.cargo}
                  </span>
                </div>

                {/* Columna: ID */}
                <div className="table-card-column">
                  <span className="table-card-column-label">ID</span>
                  <span className="table-card-column-value">#{p.idPersonal}</span>
                </div>
              </div>

              {/* Acciones */}
              <div className="table-card-actions">
                <button
                  className="btn-action btn-edit"
                  onClick={() => abrirModal("editar", p)}
                  title="Editar"
                >
                  <FaEdit />
                </button>
                <button
                  className="btn-action btn-delete"
                  onClick={() => eliminarPersonal(p.idPersonal)}
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