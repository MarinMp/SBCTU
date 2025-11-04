import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import { FaUserInjured, FaPlus, FaEdit, FaTrash, FaEnvelope, FaIdCard, FaVenusMars } from "react-icons/fa";
import PacienteService from "../services/PacienteService";
import Notify from "../components/Notify";
import "../styles/table-cards.css";

function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [pacienteEditando, setPacienteEditando] = useState(null);

  const [notify, setNotify] = useState({
    show: false,
    message: "",
    type: "info",
  });

  const [formData, setFormData] = useState({
    numeroDocumento: "",
    primerNombre: "",
    primerApellido: "",
    segundoApellido: "",
    fechaNacimiento: "",
    genero: "",
    direccion: "",
    correo: "",
  });

  // === UTILIDADES DE LOCALSTORAGE ===
  const obtenerDocumentosLocales = () => {
    const data = localStorage.getItem("documentosPacientes");
    return data ? JSON.parse(data) : {};
  };

  const guardarDocumentosLocales = (obj) => {
    localStorage.setItem("documentosPacientes", JSON.stringify(obj));
  };

  // === CARGAR PACIENTES ===
  const cargarPacientes = async () => {
    try {
      setLoading(true);
      const data = await PacienteService.listar();

      const docsLocales = obtenerDocumentosLocales();
      let nuevosDocs = { ...docsLocales };

      data.forEach((pac) => {
        if (!nuevosDocs[pac.idPaciente]) {
          const aleatorio = Math.floor(Math.random() * 90000000) + 10000000;
          nuevosDocs[pac.idPaciente] = aleatorio;
        }
      });

      guardarDocumentosLocales(nuevosDocs);

      const dataConDoc = data.map((p) => ({
        ...p,
        numeroDocumento: nuevosDocs[p.idPaciente],
      }));

      setPacientes(dataConDoc);
    } catch (err) {
      console.error("❌ Error al listar pacientes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarPacientes();
  }, []);

  // === ABRIR MODAL ===
  const abrirModal = (modo, paciente = null) => {
    if (modo === "editar" && paciente) {
      setFormData({ ...paciente });
      setPacienteEditando(paciente);
      setModoEdicion(true);
    } else {
      setFormData({
        numeroDocumento: "",
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

  // === GUARDAR / ACTUALIZAR PACIENTE ===
  const guardarPaciente = async () => {
    try {
      const documentosLocales = obtenerDocumentosLocales();
      const listaDocs = Object.values(documentosLocales);

      if (!modoEdicion && listaDocs.includes(Number(formData.numeroDocumento))) {
        setNotify({
          show: true,
          message: "El número de documento ya existe en registros locales.",
          type: "warning",
        });
        return;
      }

      const existeCorreo = pacientes.some(
        (p) => p.correo.toLowerCase() === formData.correo.toLowerCase()
      );
      if (!modoEdicion && existeCorreo) {
        setNotify({
          show: true,
          message: "El correo ya está registrado en otro paciente.",
          type: "warning",
        });
        return;
      }

      if (modoEdicion) {
        await PacienteService.actualizar(pacienteEditando.idPaciente, formData);
        setNotify({
          show: true,
          message: "Paciente actualizado correctamente.",
          type: "success",
        });
      } else {
        const nuevo = await PacienteService.registrar(formData);

        const docs = obtenerDocumentosLocales();
        const docNuevo =
          formData.numeroDocumento ||
          Math.floor(Math.random() * 90000000) + 10000000;
        docs[nuevo.idPaciente] = docNuevo;
        guardarDocumentosLocales(docs);

        setNotify({
          show: true,
          message: "Paciente registrado exitosamente.",
          type: "success",
        });
      }

      setShowModal(false);
      cargarPacientes();
    } catch (err) {
      console.error("❌ Error al guardar paciente:", err);
      setNotify({
        show: true,
        message: "Error al registrar o actualizar el paciente.",
        type: "error",
      });
    }
  };

  // === ELIMINAR PACIENTE ===
  const eliminarPaciente = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este paciente?")) {
      try {
        await PacienteService.eliminar(id);
        const docs = obtenerDocumentosLocales();
        delete docs[id];
        guardarDocumentosLocales(docs);

        cargarPacientes();
        setNotify({
          show: true,
          message: "Paciente eliminado correctamente.",
          type: "success",
        });
      } catch (err) {
        console.error("❌ Error al eliminar paciente:", err);
        setNotify({
          show: true,
          message: "Error al eliminar paciente.",
          type: "error",
        });
      }
    }
  };

  // === FORM ===
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Colores aleatorios para avatares
  const avatarColors = ['avatar-blue', 'avatar-green', 'avatar-purple', 'avatar-orange', 'avatar-pink'];
  const getAvatarColor = (id) => avatarColors[id % avatarColors.length];

  return (
    <div className="table-cards-container">
      {/* Header */}
      <div className="table-cards-header">
        <h2 className="table-cards-title">Gestión de Pacientes</h2>
        <div className="table-cards-actions">
          <button className="btn-add" onClick={() => abrirModal("nuevo")}>
            <FaPlus /> Nuevo Paciente
          </button>
        </div>
      </div>

      {/* Notify */}
      <Notify
        show={notify.show}
        onClose={() => setNotify({ ...notify, show: false })}
        message={notify.message}
        type={notify.type}
      />

      {/* Loading */}
      {loading ? (
        <div className="table-cards-loading">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3" style={{ color: '#64748b' }}>Cargando pacientes...</p>
        </div>
      ) : pacientes.length === 0 ? (
        /* Estado vacío */
        <div className="table-cards-empty">
          <div className="table-cards-empty-icon">
            <FaUserInjured />
          </div>
          <h5 className="table-cards-empty-title">No hay pacientes registrados</h5>
          <p className="table-cards-empty-text">
            Comienza agregando tu primer paciente haciendo clic en el botón "Nuevo Paciente"
          </p>
        </div>
      ) : (
        /* Lista de Cards */
        <div className="table-cards-list">
          {pacientes.map((p) => (
            <div key={p.idPaciente} className="table-card-item">
              {/* Avatar */}
              <div className={`table-card-avatar ${getAvatarColor(p.idPaciente)}`}>
                <FaUserInjured />
              </div>

              {/* Contenido */}
              <div className="table-card-content">
                {/* Información principal */}
                <div className="table-card-info">
                  <h6 className="table-card-name">
                    {p.primerNombre} {p.primerApellido} {p.segundoApellido}
                  </h6>
                  <p className="table-card-detail">
                    <FaEnvelope /> {p.correo}
                  </p>
                </div>

                {/* Columna: Documento */}
                <div className="table-card-column">
                  <span className="table-card-column-label">Documento</span>
                  <span className="table-card-column-value">
                    <FaIdCard style={{ marginRight: '0.5rem', color: '#64748b' }} />
                    {p.numeroDocumento || "—"}
                  </span>
                </div>

                {/* Columna: Género */}
                <div className="table-card-column">
                  <span className="table-card-column-label">Género</span>
                  <span className={`table-card-badge ${
                    p.genero === 'M' ? 'badge-masculino' : 'badge-femenino'
                  }`}>
                    {p.genero === 'M' ? 'Masculino' : 'Femenino'}
                  </span>
                </div>

                {/* Columna: ID */}
                <div className="table-card-column">
                  <span className="table-card-column-label">ID</span>
                  <span className="table-card-column-value">#{p.idPaciente}</span>
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
                  onClick={() => eliminarPaciente(p.idPaciente)}
                  title="Eliminar"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modoEdicion ? "Editar Paciente" : "Registrar Paciente"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Número de Documento (simulado)</Form.Label>
              <Form.Control
                type="number"
                name="numeroDocumento"
                value={formData.numeroDocumento}
                onChange={handleChange}
              />
              <Form.Text muted>
                Este campo solo se usa de forma visual (no se guarda en base de datos).
              </Form.Text>
            </Form.Group>

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