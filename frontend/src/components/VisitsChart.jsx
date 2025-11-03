import React from "react";
import { Card } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function VisitsChart({ visitasPorMes }) {
  // Preparar datos para el gráfico
  const labels = Object.keys(visitasPorMes);
  const valores = Object.values(visitasPorMes);
  
  // Calcular el total de visitas
  const totalVisitas = valores.reduce((acc, val) => acc + val, 0);
  
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Visitas",
        data: valores,
        backgroundColor: labels.map((_, idx) => {
          // Mes destacado (por ejemplo, Marzo)
          if (idx === 2) return "#1e293b";
          return "#94a3b8";
        }),
        borderRadius: 8,
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1e293b",
        padding: 12,
        borderRadius: 8,
        titleFont: {
          size: 13,
          weight: 600,
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          label: function(context) {
            return `${context.parsed.y} visitas`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: "#f1f5f9",
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 11,
          },
          color: "#94a3b8",
          callback: function(value) {
            return value;
          },
          stepSize: 20,
        },
        border: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
            weight: 500,
          },
          color: "#64748b",
        },
        border: {
          display: false,
        },
      },
    },
  };

  return (
    <Card className="chart-card">
      <Card.Body>
        <div className="chart-header">
          <div>
            <h5 className="chart-title">Total de Visitas</h5>
            <h2 className="chart-total">{totalVisitas.toLocaleString()}</h2>
          </div>
          <button className="chart-action-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M14 10L10 14L6 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="chart-wrapper" style={{ height: "280px" }}>
          <Bar data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
}

export default VisitsChart;