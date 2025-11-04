import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import PacienteService from "../services/PacienteService";
import Notify from "../components/Notify";

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

      // Obtener mapa de documentos locales existentes
      const docsLocales = obtenerDocumentosLocales();
      let nuevosDocs = { ...docsLocales };

      // Asignar número aleatorio si no existe
      data.forEach((pac) => {
        if (!nuevosDocs[pac.idPaciente]) {
          const aleatorio = Math.floor(Math.random() * 90000000) + 10000000; // 8 dígitos
          nuevosDocs[pac.idPaciente] = aleatorio;
        }
      });

      guardarDocumentosLocales(nuevosDocs);

      // Adjuntar número al objeto mostrado
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

      // Validar duplicado local
      if (!modoEdicion && listaDocs.includes(Number(formData.numeroDocumento))) {
        setNotify({
          show: true,
          message: "El número de documento ya existe en registros locales.",
          type: "warning",
        });
        return;
      }

      // Validar correo duplicado (backend)
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

      // === Registro o actualización ===
      if (modoEdicion) {
        await PacienteService.actualizar(pacienteEditando.idPaciente, formData);
        setNotify({
          show: true,
          message: "Paciente actualizado correctamente.",
          type: "success",
        });
      } else {
        const nuevo = await PacienteService.registrar(formData);

        // Asignar documento local simulado
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

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Gestión de Pacientes</h2>

      {/* Notify */}
      <Notify
        show={notify.show}
        onClose={() => setNotify({ ...notify, show: false })}
        message={notify.message}
        type={notify.type}
      />

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
        <table className="table table-striped align-middle table-hover shadow-sm">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Documento</th>
              <th>Nombre</th>
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
                  <td>{p.numeroDocumento || "—"}</td>
                  <td>
                    {p.primerNombre} {p.primerApellido}
                  </td>
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
                Este campo solo se usa de forma visual (no se guarda en base de
                datos).
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