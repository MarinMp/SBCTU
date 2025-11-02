-- 03_insercion_datos.sql
-- Inserta datos de ejemplo para el sistema sbctu
USE sbctu;

-- pacientes
INSERT INTO paciente (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, fecha_nacimiento, genero, direccion, correo)
VALUES
('juan','carlos','perez','gomez','1988-04-12','m','cra 10 #20-30','juan.perez@example.com'),
('ana',NULL,'lopez','martinez','1995-11-03','f','calle 45 #12-34','ana.lopez@example.com');

-- personales medicos
INSERT INTO personal_medico (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, numero_licencia, cargo, correo_institucional)
VALUES
('laura','maria','rodriguez','hernandez','lic-12345','medico','laura.rodriguez@hospital.org'),
('miguel',NULL,'suarez','pardo','lic-98765','enfermero','miguel.suarez@hospital.org');

-- nivel de urgencia
INSERT INTO nivel_urgencia (codigo_nivel, descripcion) VALUES
(1,'critico'),(2,'grave'),(3,'moderado'),(4,'leve');

-- enfermedad
INSERT INTO enfermedad (nombre_enfermedad, descripcion, codigo_enfermedad, tratamiento, categoria) VALUES
('neumonia','infeccion pulmonar',10001,'antibioticos y reposo','respiratoria'),
('gastroenteritis','inflamacion gastrointestinal',20001,'hidratacion y dieta','infecciosa');

-- sintoma
INSERT INTO sintoma (nombre_sintoma, descripcion) VALUES
('fiebre','temperatura mayor a 38°c'),
('tos persistente','tos por mas de 2 semanas'),
('dolor abdominal','dolor localizado en el abdomen');

-- enfermedad - sintoma
INSERT INTO enfermedad_sintoma VALUES (1,1),(2,1),(1,2),(3,2);

-- visita
INSERT INTO visita (fecha_visita, hora_visita, motivo_consulta, estado_visita, paciente_id_paciente)
VALUES
(CURDATE(),'08:30:00','fiebre y tos','atencion',1),
(CURDATE(),'09:15:00','dolor abdominal','atencion',2);

-- triage
INSERT INTO triage (observaciones, constantes_vitales, hora_atencion, visita_id_visita, personal_medico_id_personal, nivel_urgencia_id_nivel_urgencia)
VALUES
('paciente con disnea leve','ta 120/80 temp 38.5 fc 95','08:45:00',1,1,2),
('dolor moderado e hidratado','ta 110/70 temp 37.8 fc 88','09:30:00',2,2,3);

-- triage - sintoma
INSERT INTO triage_sintoma VALUES (1,1),(1,2),(2,3);

-- diagnostico
INSERT INTO diagnostico (fecha_diagnostico, tipo_diagnostico, observaciones, enfermedad_id_enfermedad, triage_id_triage, personal_medico_id_personal, nivel_urgencia_id_nivel_urgencia)
VALUES
(CURDATE(),'preliminar','sospecha de neumonia',1,1,1,2),
(CURDATE(),'confirmado','cuadro compatible con gastroenteritis',2,2,2,3);
