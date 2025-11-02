-- 02_vistas_y_triggers.sql
-- Contiene vistas, procedimientos y triggers del sistema sbctu
USE sbctu;

-- vista: historial CLÍNICO completo de cada paciente
CREATE OR REPLACE VIEW vw_historial_paciente AS
SELECT p.id_paciente, concat(p.primer_apellido,' ',p.primer_nombre) AS paciente,
v.fecha_visita, t.observaciones, d.tipo_diagnostico, e.nombre_enfermedad, n.descripcion AS nivel
FROM paciente p
JOIN visita v ON v.paciente_id_paciente = p.id_paciente
LEFT JOIN triage t ON t.visita_id_visita = v.id_visita
LEFT JOIN diagnostico d ON d.triage_id_triage = t.id_triage
LEFT JOIN enfermedad e ON e.id_enfermedad = d.enfermedad_id_enfermedad
LEFT JOIN nivel_urgencia n ON n.id_nivel_urgencia = d.nivel_urgencia_id_nivel_urgencia;

-- procedimiento: buscar paciente por correo
DELIMITER $$
CREATE PROCEDURE sp_buscar_paciente_correo(IN p_correo VARCHAR(100))
BEGIN
  SELECT * FROM paciente WHERE correo = p_correo;
END $$
DELIMITER ;

-- TRIGGER: actualiza la vista cuando se inserta un triage
DELIMITER $$
CREATE TRIGGER trg_triage_insert
AFTER INSERT ON triage
FOR EACH ROW
BEGIN
  UPDATE visita SET triage_id_triage = new.id_triage WHERE id_visita = new.visita_id_visita;
END $$
DELIMITER ;
