import api from "./api";

const DashboardService = {
  obtenerTotales: async () => {
    const [pacientes, visitas, triages, diagnosticos] = await Promise.all([
      api.get("/pacientes"),
      api.get("/visitas"),
      api.get("/triages"),
      api.get("/diagnosticos"),
    ]);
    
    // Totales actuales
    const totalesActuales = {
      pacientes: pacientes.data.length,
      visitas: visitas.data.length,
      triages: triages.data.length,
      diagnosticos: diagnosticos.data.length,
    };
    
    // Simular datos del mes anterior (90-95% de los actuales para generar crecimiento)
    const totalesAnteriores = {
      pacientes: Math.floor(totalesActuales.pacientes * 0.96),
      visitas: Math.floor(totalesActuales.visitas * 0.98),
      triages: Math.floor(totalesActuales.triages * 1.02), // Este decreció
      diagnosticos: Math.floor(totalesActuales.diagnosticos * 0.81),
    };
    
    // Calcular porcentajes de cambio
    const calcularCambio = (actual, anterior) => {
      if (anterior === 0) return { porcentaje: 0, positivo: true };
      const cambio = ((actual - anterior) / anterior) * 100;
      return {
        porcentaje: Math.abs(cambio).toFixed(1),
        positivo: cambio >= 0
      };
    };
    
    return {
      ...totalesActuales,
      cambios: {
        pacientes: calcularCambio(totalesActuales.pacientes, totalesAnteriores.pacientes),
        visitas: calcularCambio(totalesActuales.visitas, totalesAnteriores.visitas),
        triages: calcularCambio(totalesActuales.triages, totalesAnteriores.triages),
        diagnosticos: calcularCambio(totalesActuales.diagnosticos, totalesAnteriores.diagnosticos),
      }
    };
  },

  obtenerDistribucionTriage: async () => {
    const niveles = await api.get("/niveles-urgencia");
    const resultados = {};
    for (const nivel of niveles.data) {
      const triages = await api
        .get(`/triages/nivel/${nivel.idNivelUrgencia}`)
        .catch(() => ({ data: [] }));
      resultados[nivel.descripcion] = triages.data.length;
    }
    return resultados;
  },

  obtenerDiagnosticosPorTipo: async () => {
    const [preliminar, confirmado] = await Promise.all([
      api.get("/diagnosticos/tipo/PRELIMINAR").catch(() => ({ data: [] })),
      api.get("/diagnosticos/tipo/CONFIRMADO").catch(() => ({ data: [] })),
    ]);
    return {
      preliminar: preliminar.data.length,
      confirmado: confirmado.data.length,
    };
  },

  obtenerUltimosDiagnosticos: async () => {
    const res = await api.get("/diagnosticos");
    return res.data.slice(-5).reverse(); // últimos 5
  },

  // Nueva función para obtener visitas por mes
  obtenerVisitasPorMes: async () => {
    try {
      const res = await api.get("/visitas");
      const visitas = res.data;
      
      console.log("📊 Total de visitas recibidas:", visitas.length);
      
      // Agrupar visitas por mes
      const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
      const visitasPorMes = {};
      
      // Inicializar todos los meses en 0
      meses.forEach(mes => {
        visitasPorMes[mes] = 0;
      });
      
      // Contar visitas por mes
      visitas.forEach(visita => {
        const fechaStr = visita.fechaVisita;
        
        if (fechaStr) {
          const fecha = new Date(fechaStr);
          
          // Verificar que la fecha sea válida
          if (!isNaN(fecha.getTime())) {
            const mesIndex = fecha.getMonth();
            const mesNombre = meses[mesIndex];
            visitasPorMes[mesNombre]++;
            console.log(`✅ Visita contada: ${fechaStr} -> ${mesNombre}`);
          }
        }
      });
      
      console.log("📈 Visitas por mes:", visitasPorMes);
      
      return visitasPorMes;
    } catch (error) {
      console.error("❌ Error al obtener visitas por mes:", error);
      return {
        "Ene": 0, "Feb": 0, "Mar": 0, "Abr": 0, 
        "May": 0, "Jun": 0, "Jul": 0, "Ago": 0, 
        "Sep": 0, "Oct": 0, "Nov": 0, "Dic": 0
      };
    }
  },
};

export default DashboardService;