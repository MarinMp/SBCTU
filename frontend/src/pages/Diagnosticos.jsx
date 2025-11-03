import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Spinner, InputGroup } from "react-bootstrap";
import DiagnosticoService from "../services/DiagnosticoService";
import EnfermedadService from "../services/EnfermedadService";
import TriageService from "../services/TriageService";
import PersonalMedicoService from "../services/PersonalMedicoService";
import NivelUrgenciaService from "../services/NivelUrgenciaService";

function Diagnosticos() {
  const [diagnosticos, setDiagnosticos] = useState([]);
  const [enfermedades, setEnfermedades] = useState([]);
  const [triages, setTriages] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [niveles, setNiveles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroMedico, setFiltroMedico] = useState("");
  const [filtroTriage, setFiltroTriage] = useState("");

  const [formData, setFormData] = useState({
    fechaDiagnostico: "",
    tipoDiagnostico: "",
    observaciones: "",
    idEnfermedad: "",
    idTriage: "",
    idPersonalMedico: "",
    idNivelUrgencia: "",
  });

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [d, e, t, m, n] = await Promise.all([
        DiagnosticoService.listar(),
        EnfermedadService.listar(),
        TriageService.listar(),
        PersonalMedicoService.listar(),
        NivelUrgenciaService.listar(),
      ]);
      setDiagnosticos(d);
      setEnfermedades(e);
      setTriages(t);
      setMedicos(m);
      setNiveles(n);
    } catch (err) {
      console.error("❌ Error al cargar diagnósticos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const abrirModal = (modo, item = null) => {
    if (modo === "editar" && item) {
      setFormData({ ...item });
      setModoEdicion(true);
    } else {
      setFormData({
        fechaDiagnostico: "",
        tipoDiagnostico: "",
        observaciones: "",
        idEnfermedad: "",
        idTriage: "",
        idPersonalMedico: "",
        idNivelUrgencia: "",
      });
      setModoEdicion(false);
    }
    setShowModal(true);
  };

  const guardarDiagnostico = async () => {
    try {
      if (modoEdicion) {
        await DiagnosticoService.actualizar(formData.idDiagnostico, formData);
      } else {
        await DiagnosticoService.registrar(formData);
      }
      setShowModal(false);
      cargarDatos();
    } catch (err) {
      alert("Error al registrar o actualizar el diagnóstico.");
      console.error(err);
    }
  };

  const eliminarDiagnostico = async (id) => {
    if (window.confirm("¿Deseas eliminar este diagnóstico?")) {
      try {
        await DiagnosticoService.eliminar(id);
        cargarDatos();
      } catch (err) {
        console.error("❌ Error al eliminar diagnóstico:", err);
      }
    }
  };

  const filtrarPorTipo = async () => {
    if (!filtroTipo.trim()) {
      cargarDatos();
      return;
    }
    try {
      const data = await DiagnosticoService.buscarPorTipo(filtroTipo.trim());
      setDiagnosticos(data);
    } catch (err) {
      alert("No hay diagnósticos de ese tipo.");
    }
  };

  const filtrarPorMedico = async () => {
    if (!filtroMedico.trim()) {
      cargarDatos();
      return;
    }
    try {
      const data = await DiagnosticoService.buscarPorMedico(filtroMedico.trim());
      setDiagnosticos(data);
    } catch (err) {
      alert("El médico no tiene diagnósticos registrados.");
    }
  };

  const filtrarPorTriage = async () => {
    if (!filtroTriage.trim()) {
      cargarDatos();
      return;
    }
    try {
      const data = await DiagnosticoService.buscarPorTriage(filtroTriage.trim());
      setDiagnosticos(data);
    } catch (err) {
      alert("No hay diagnósticos para ese triage.");
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Gestión de Diagnósticos</h2>

      {/* FILTROS */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3" style={{ gap: "1rem" }}>
        <Button variant="success" onClick={() => abrirModal("nuevo")}>
          + Nuevo Diagnóstico
        </Button>

        <InputGroup style={{ width: "230px" }}>
          <Form.Control
            placeholder="Tipo (PRELIMINAR/CONFIRMADO)"
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value.toUpperCase())}
          />
          <Button variant="primary" onClick={filtrarPorTipo}>
            Tipo
          </Button>
        </InputGroup>

        <InputGroup style={{ width: "230px" }}>
          <Form.Control
            type="number"
            placeholder="ID Médico..."
            value={filtroMedico}
            onChange={(e) => setFiltroMedico(e.target.value)}
          />
          <Button variant="secondary" onClick={filtrarPorMedico}>
            Médico
          </Button>
        </InputGroup>

        <InputGroup style={{ width: "230px" }}>
          <Form.Control
            type="number"
            placeholder="ID Triage..."
            value={filtroTriage}
            onChange={(e) => setFiltroTriage(e.target.value)}
          />
          <Button variant="dark" onClick={filtrarPorTriage}>
            Triage
          </Button>
        </InputGroup>
      </div>

      {/* TABLA */}
      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" />
          <p className="mt-2">Cargando diagnósticos...</p>
        </div>
      ) : (
        <table className="table table-striped align-middle">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Observaciones</th>
              <th>ID Triage</th>
              <th>ID Médico</th>
              <th>ID Enfermedad</th>
              <th>ID Nivel</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {diagnosticos.length > 0 ? (
              diagnosticos.map((d) => (
                <tr key={d.idDiagnostico}>
                  <td>{d.idDiagnostico}</td>
                  <td>{d.fechaDiagnostico}</td>
                  <td>{d.tipoDiagnostico}</td>
                  <td>{d.observaciones}</td>
                  <td>{d.idTriage}</td>
                  <td>{d.idPersonalMedico}</td>
                  <td>{d.idEnfermedad}</td>
                  <td>{d.idNivelUrgencia}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => abrirModal("editar", d)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => eliminarDiagnostico(d.idDiagnostico)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-muted">
                  No hay diagnósticos registrados.
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
            {modoEdicion ? "Editar Diagnóstico" : "Registrar Diagnóstico"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Fecha del Diagnóstico</Form.Label>
              <Form.Control
                type="date"
                name="fechaDiagnostico"
                value={formData.fechaDiagnostico}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Tipo de Diagnóstico</Form.Label>
              <Form.Select
                name="tipoDiagnostico"
                value={formData.tipoDiagnostico}
                onChange={handleChange}
              >
                <option value="">Seleccione</option>
                <option value="PRELIMINAR">PRELIMINAR</option>
                <option value="CONFIRMADO">CONFIRMADO</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Observaciones</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Enfermedad</Form.Label>
              <Form.Select
                name="idEnfermedad"
                value={formData.idEnfermedad}
                onChange={handleChange}
              >
                <option value="">Seleccione una enfermedad</option>
                {enfermedades.map((e) => (
                  <option key={e.idEnfermedad} value={e.idEnfermedad}>
                    {e.idEnfermedad} - {e.nombreEnfermedad}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Triage</Form.Label>
              <Form.Select
                name="idTriage"
                value={formData.idTriage}
                onChange={handleChange}
              >
                <option value="">Seleccione un triage</option>
                {triages.map((t) => (
                  <option key={t.idTriage} value={t.idTriage}>
                    {t.idTriage} - {t.observaciones}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Personal Médico</Form.Label>
              <Form.Select
                name="idPersonalMedico"
                value={formData.idPersonalMedico}
                onChange={handleChange}
              >
                <option value="">Seleccione un médico</option>
                {medicos.map((m) => (
                  <option key={m.idPersonal} value={m.idPersonal}>
                    {m.idPersonal} - {m.primerNombre} {m.primerApellido}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Nivel de Urgencia</Form.Label>
              <Form.Select
                name="idNivelUrgencia"
                value={formData.idNivelUrgencia}
                onChange={handleChange}
              >
                <option value="">Seleccione un nivel</option>
                {niveles.map((n) => (
                  <option key={n.idNivelUrgencia} value={n.idNivelUrgencia}>
                    {n.idNivelUrgencia} - {n.descripcion}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={guardarDiagnostico}>
            {modoEdicion ? "Guardar Cambios" : "Registrar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Diagnosticos;