import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Spinner, InputGroup } from "react-bootstrap";
import TriageService from "../services/TriageService";
import VisitaService from "../services/VisitaService";
import PersonalMedicoService from "../services/PersonalMedicoService";
import NivelUrgenciaService from "../services/NivelUrgenciaService";

function Triage() {
  const [triages, setTriages] = useState([]);
  const [visitas, setVisitas] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [niveles, setNiveles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [triageEditando, setTriageEditando] = useState(null);
  const [filtroMedico, setFiltroMedico] = useState("");
  const [filtroNivel, setFiltroNivel] = useState("");

  const [formData, setFormData] = useState({
    observaciones: "",
    constantesVitales: "",
    horaAtencion: "",
    idVisita: "",
    idPersonalMedico: "",
    idNivelUrgencia: "",
  });

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [tri, vis, med, niv] = await Promise.all([
        TriageService.listar(),
        VisitaService.listar(),
        PersonalMedicoService.listar(),
        NivelUrgenciaService.listar(),
      ]);
      setTriages(tri);
      setVisitas(vis);
      setMedicos(med);
      setNiveles(niv);
    } catch (err) {
      console.error("❌ Error al cargar datos del triage:", err);
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
      setTriageEditando(item);
    } else {
      setFormData({
        observaciones: "",
        constantesVitales: "",
        horaAtencion: "",
        idVisita: "",
        idPersonalMedico: "",
        idNivelUrgencia: "",
      });
      setModoEdicion(false);
      setTriageEditando(null);
    }
    setShowModal(true);
  };

  const guardarTriage = async () => {
    try {
      if (modoEdicion) {
        await TriageService.actualizar(triageEditando.idTriage, formData);
      } else {
        await TriageService.registrar(formData);
      }
      setShowModal(false);
      cargarDatos();
    } catch (err) {
      console.error("❌ Error al guardar triage:", err);
      alert("Error al registrar o actualizar el triage.");
    }
  };

  const eliminarTriage = async (id) => {
    if (window.confirm("¿Deseas eliminar este triage?")) {
      try {
        await TriageService.eliminar(id);
        cargarDatos();
      } catch (err) {
        console.error("❌ Error al eliminar triage:", err);
      }
    }
  };

  const buscarPorMedico = async () => {
    if (!filtroMedico.trim()) {
      cargarDatos();
      return;
    }
    try {
      const data = await TriageService.buscarPorMedico(filtroMedico.trim());
      setTriages(data);
    } catch (err) {
      console.error("❌ Error al filtrar por médico:", err);
    }
  };

  const buscarPorNivel = async () => {
    if (!filtroNivel.trim()) {
      cargarDatos();
      return;
    }
    try {
      const data = await TriageService.buscarPorNivel(filtroNivel.trim());
      setTriages(data);
    } catch (err) {
      console.error("❌ Error al filtrar por nivel de urgencia:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Gestión de Triages</h2>

      {/* FILTROS */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3" style={{ gap: "1rem" }}>
        <Button variant="success" onClick={() => abrirModal("nuevo")}>
          + Nuevo Triage
        </Button>

        <InputGroup style={{ width: "250px" }}>
          <Form.Control
            type="number"
            placeholder="ID Médico..."
            value={filtroMedico}
            onChange={(e) => setFiltroMedico(e.target.value)}
          />
          <Button variant="primary" onClick={buscarPorMedico}>
            Médico
          </Button>
        </InputGroup>

        <InputGroup style={{ width: "250px" }}>
          <Form.Control
            type="number"
            placeholder="ID Nivel..."
            value={filtroNivel}
            onChange={(e) => setFiltroNivel(e.target.value)}
          />
          <Button variant="secondary" onClick={buscarPorNivel}>
            Nivel
          </Button>
        </InputGroup>
      </div>

      {/* TABLA */}
      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" />
          <p className="mt-2">Cargando triages...</p>
        </div>
      ) : (
        <table className="table table-striped align-middle">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Observaciones</th>
              <th>Constantes Vitales</th>
              <th>Hora</th>
              <th>ID Visita</th>
              <th>ID Médico</th>
              <th>ID Nivel</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {triages.length > 0 ? (
              triages.map((t) => (
                <tr key={t.idTriage}>
                  <td>{t.idTriage}</td>
                  <td>{t.observaciones}</td>
                  <td>{t.constantesVitales}</td>
                  <td>{t.horaAtencion}</td>
                  <td>{t.idVisita}</td>
                  <td>{t.idPersonalMedico}</td>
                  <td>{t.idNivelUrgencia}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => abrirModal("editar", t)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => eliminarTriage(t.idTriage)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  No hay triages registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* MODAL REGISTRO */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modoEdicion ? "Editar Triage" : "Registrar Triage"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
              <Form.Label>Constantes Vitales</Form.Label>
              <Form.Control
                name="constantesVitales"
                value={formData.constantesVitales}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Hora de Atención</Form.Label>
              <Form.Control
                type="time"
                name="horaAtencion"
                value={formData.horaAtencion}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Visita</Form.Label>
              <Form.Select
                name="idVisita"
                value={formData.idVisita}
                onChange={handleChange}
              >
                <option value="">Seleccione una visita</option>
                {visitas.map((v) => (
                  <option key={v.idVisita} value={v.idVisita}>
                    {v.idVisita} — {v.motivoConsulta}
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
                    {m.idPersonal} — {m.primerNombre} {m.primerApellido}
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
                    {n.idNivelUrgencia} — {n.descripcion}
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
          <Button variant="primary" onClick={guardarTriage}>
            {modoEdicion ? "Guardar Cambios" : "Registrar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Triage;