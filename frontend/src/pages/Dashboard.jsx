import React, { useEffect, useState } from "react";
import { Row, Col, Card, Spinner } from "react-bootstrap";
import DashboardService from "../services/DashboardService";
import { FaUserInjured, FaHeartbeat, FaChartPie, FaNotesMedical, FaArrowUp, FaArrowDown } from "react-icons/fa";
import CalendarWidget from "../components/CalendarWidget";
import VisitsChart from "../components/VisitsChart";
import "../styles/dashboard.css";

function Dashboard() {
  const [totales, setTotales] = useState({});
  const [distTriage, setDistTriage] = useState({});
  const [diagTipo, setDiagTipo] = useState({});
  const [ultimosDiag, setUltimosDiag] = useState([]);
  const [visitasPorMes, setVisitasPorMes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const [t, d, dt, ud, vpm] = await Promise.all([
          DashboardService.obtenerTotales(),
          DashboardService.obtenerDistribucionTriage(),
          DashboardService.obtenerDiagnosticosPorTipo(),
          DashboardService.obtenerUltimosDiagnosticos(),
          DashboardService.obtenerVisitasPorMes(),
        ]);
        setTotales(t);
        setDistTriage(d);
        setDiagTipo(dt);
        setUltimosDiag(ud);
        setVisitasPorMes(vpm);
      } catch (e) {
        console.error("Error al cargar Dashboard:", e);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Cargando Dashboard...</p>
      </div>
    );
  }

  // Cards con iconos y cambios porcentuales
  const metricCards = [
    {
      title: "Pacientes Registrados",
      value: totales.pacientes,
      icon: <FaUserInjured />,
      change: totales.cambios?.pacientes ? 
        `${totales.cambios.pacientes.positivo ? '+' : '-'}${totales.cambios.pacientes.porcentaje}%` : 
        "+4.2%",
      isPositive: totales.cambios?.pacientes?.positivo ?? true,
      color: "#3b82f6"
    },
    {
      title: "Visitas a Urgencias",
      value: totales.visitas,
      icon: <FaHeartbeat />,
      change: totales.cambios?.visitas ? 
        `${totales.cambios.visitas.positivo ? '+' : '-'}${totales.cambios.visitas.porcentaje}%` : 
        "+1.8%",
      isPositive: totales.cambios?.visitas?.positivo ?? true,
      color: "#10b981"
    },
    {
      title: "Triages Realizados",
      value: totales.triages,
      icon: <FaChartPie />,
      change: totales.cambios?.triages ? 
        `${totales.cambios.triages.positivo ? '+' : '-'}${totales.cambios.triages.porcentaje}%` : 
        "-2.4%",
      isPositive: totales.cambios?.triages?.positivo ?? false,
      color: "#f59e0b"
    },
    {
      title: "Diagnósticos Emitidos",
      value: totales.diagnosticos,
      icon: <FaNotesMedical />,
      change: totales.cambios?.diagnosticos ? 
        `${totales.cambios.diagnosticos.positivo ? '+' : '-'}${totales.cambios.diagnosticos.porcentaje}%` : 
        "+23%",
      isPositive: totales.cambios?.diagnosticos?.positivo ?? true,
      color: "#8b5cf6"
    }
  ];

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2 className="dashboard-title">Dashboard</h2>
          <div className="dashboard-filters">
            <button className="filter-btn">Day</button>
            <button className="filter-btn">Week</button>
            <button className="filter-btn active">Month</button>
            <button className="filter-btn">Year</button>
          </div>
        </div>

        {/* Tarjetas de métricas principales */}
        <Row className="metrics-row">
          {metricCards.map((metric, idx) => (
            <Col key={idx} lg={3} md={6} className="mb-4">
              <Card className={`metric-card ${idx === 0 ? 'featured' : ''}`}>
                <Card.Body>
                  <div className="metric-header">
                    <div 
                      className="metric-icon" 
                      style={{ backgroundColor: `${metric.color}20`, color: metric.color }}
                    >
                      {metric.icon}
                    </div>
                    <div className={`metric-change ${metric.isPositive ? 'positive' : 'negative'}`}>
                      {metric.isPositive ? <FaArrowUp /> : <FaArrowDown />}
                      <span>{metric.change}</span>
                    </div>
                  </div>
                  <h6 className="metric-title">{metric.title}</h6>
                  <h2 className="metric-value">{metric.value?.toLocaleString() || 0}</h2>
                  <p className="metric-subtitle">from last month</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Gráfico de Visitas y Calendario */}
        <Row className="mt-4">
          <Col lg={8}>
            <VisitsChart visitasPorMes={visitasPorMes} />
          </Col>
          <Col lg={4}>
            <CalendarWidget />
          </Col>
        </Row>

        {/* Tabla de últimos diagnósticos */}
        <Card className="mt-4 table-card">
          <Card.Body>
            <div className="table-header">
              <h5 className="fw-bold">Últimos Diagnósticos Registrados</h5>
            </div>
            <div className="table-responsive">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Fecha</th>
                    <th>Tipo</th>
                    <th>Observaciones</th>
                    <th>Enfermedad ID</th>
                    <th>Médico ID</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {ultimosDiag.map((d) => (
                    <tr key={d.idDiagnostico}>
                      <td>#{d.idDiagnostico}</td>
                      <td>{new Date(d.fechaDiagnostico).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge-${d.tipoDiagnostico.toLowerCase()}`}>
                          {d.tipoDiagnostico}
                        </span>
                      </td>
                      <td className="text-truncate" style={{maxWidth: '200px'}}>
                        {d.observaciones}
                      </td>
                      <td>{d.idEnfermedad}</td>
                      <td>{d.idPersonalMedico}</td>
                      <td>
                        <span className="status-badge success">Completado</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;