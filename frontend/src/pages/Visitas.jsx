import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Spinner, InputGroup } from "react-bootstrap";
import VisitaService from "../services/VisitaService";
import PacienteService from "../services/PacienteService";

function Visitas() {
  const [visitas, setVisitas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [visitaEditando, setVisitaEditando] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");

  const [formData, setFormData] = useState({
    fechaVisita: "",
    horaVisita: "",
    motivoConsulta: "",
    estadoVisita: "",
    idPaciente: "",
  });

  // Cargar visitas y pacientes al iniciar
  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [visitasData, pacientesData] = await Promise.all([
        VisitaService.listar(),
        PacienteService.listar(),
      ]);
      setVisitas(visitasData);
      setPacientes(pacientesData);
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
      setFormData({ ...item });
      setModoEdicion(true);
      setVisitaEditando(item);
    } else {
      setFormData({
        fechaVisita: "",
        horaVisita: "",
        motivoConsulta: "",
        estadoVisita: "",
        idPaciente: "",
      });
      setModoEdicion(false);
      setVisitaEditando(null);
    }
    setShowModal(true);
  };

  const guardarVisita = async () => {
    try {
      if (modoEdicion) {
        await VisitaService.actualizar(visitaEditando.idVisita, formData);
      } else {
        await VisitaService.registrar(formData);
      }
      setShowModal(false);
      cargarDatos();
    } catch (err) {
      console.error("❌ Error al guardar visita:", err);
      alert("Error al registrar o actualizar la visita.");
    }
  };

  const eliminarVisita = async (id) => {
    if (window.confirm("¿Deseas eliminar esta visita?")) {
      try {
        await VisitaService.eliminar(id);
        cargarDatos();
      } catch (err) {
        console.error("❌ Error al eliminar visita:", err);
      }
    }
  };

  const buscarPorPaciente = async () => {
    if (!busqueda.trim()) {
      cargarDatos();
      return;
    }
    try {
      const data = await VisitaService.buscarPorPaciente(busqueda.trim());
      setVisitas(data);
    } catch (err) {
      console.error("❌ Error al buscar visitas del paciente:", err);
    }
  };

  const buscarPorEstado = async () => {
    if (!filtroEstado.trim()) {
      cargarDatos();
      return;
    }
    try {
      const data = await VisitaService.buscarPorEstado(filtroEstado.trim());
      setVisitas(data);
    } catch (err) {
      console.error("❌ Error al buscar visitas por estado:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Gestión de Visitas</h2>

      {/* FILTROS */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3" style={{ gap: "1rem" }}>
        <Button variant="success" onClick={() => abrirModal("nuevo")}>
          + Nueva Visita
        </Button>

        <InputGroup style={{ width: "250px" }}>
          <Form.Control
            type="number"
            placeholder="ID Paciente..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <Button variant="primary" onClick={buscarPorPaciente}>
            Buscar
          </Button>
        </InputGroup>

        <InputGroup style={{ width: "250px" }}>
          <Form.Control
            placeholder="Estado (ATENCION/ALTA)"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value.toUpperCase())}
          />
          <Button variant="secondary" onClick={buscarPorEstado}>
            Filtrar
          </Button>
        </InputGroup>
      </div>

      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" />
          <p className="mt-2">Cargando visitas...</p>
        </div>
      ) : (
        <table className="table table-striped align-middle">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Motivo</th>
              <th>Estado</th>
              <th>ID Paciente</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {visitas.length > 0 ? (
              visitas.map((v) => (
                <tr key={v.idVisita}>
                  <td>{v.idVisita}</td>
                  <td>{v.fechaVisita}</td>
                  <td>{v.horaVisita}</td>
                  <td>{v.motivoConsulta}</td>
                  <td>{v.estadoVisita}</td>
                  <td>{v.idPaciente}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => abrirModal("editar", v)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => eliminarVisita(v.idVisita)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No hay visitas registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* MODAL REGISTRO */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modoEdicion ? "Editar Visita" : "Registrar Visita"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Fecha de la Visita</Form.Label>
              <Form.Control
                type="date"
                name="fechaVisita"
                value={formData.fechaVisita}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Hora</Form.Label>
              <Form.Control
                type="time"
                name="horaVisita"
                value={formData.horaVisita}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Motivo de Consulta</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="motivoConsulta"
                value={formData.motivoConsulta}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Estado</Form.Label>
              <Form.Select
                name="estadoVisita"
                value={formData.estadoVisita}
                onChange={handleChange}
              >
                <option value="">Seleccione</option>
                <option value="ATENCION">ATENCIÓN</option>
                <option value="ALTA">ALTA</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Paciente</Form.Label>
              <Form.Select
                name="idPaciente"
                value={formData.idPaciente}
                onChange={handleChange}
              >
                <option value="">Seleccione un paciente</option>
                {pacientes.map((p) => (
                  <option key={p.idPaciente} value={p.idPaciente}>
                    {p.idPaciente} - {p.primerNombre} {p.primerApellido}
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
          <Button variant="primary" onClick={guardarVisita}>
            {modoEdicion ? "Guardar Cambios" : "Registrar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Visitas;