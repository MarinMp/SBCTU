-- pacientes
INSERT INTO paciente (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, fecha_nacimiento, genero, direccion, correo)
VALUES
('Juan', 'Carlos', 'Perez', 'Gomez', '1988-04-12', 'M', 'Cra 10 #20-30', 'juan.perez@example.com'),
('Ana', NULL, 'Lopez', 'Martinez', '1995-11-03', 'F', 'Calle 45 #12-34', 'ana.lopez@example.com'),
('Luis', 'Alberto', 'Ramirez', 'Torres', '1990-06-21', 'M', 'Av 3 #15-22', 'luis.ramirez@example.com'),
('Maria', 'Elena', 'Diaz', 'Castro', '1985-02-14', 'F', 'Calle 9 #8-10', 'maria.diaz@example.com'),
('Carlos', NULL, 'Mendez', 'Ruiz', '1978-12-30', 'M', 'Cra 7 #11-45', 'carlos.mendez@example.com'),
('Laura', 'Isabel', 'Gonzalez', 'Moreno', '1992-07-19', 'F', 'Av 6 #20-50', 'laura.gonzalez@example.com'),
('Pedro', 'Jose', 'Sanchez', 'Vargas', '1983-03-05', 'M', 'Calle 12 #5-25', 'pedro.sanchez@example.com'),
('Sofia', 'Andrea', 'Ramirez', 'Lopez', '1997-09-10', 'F', 'Cra 4 #18-60', 'sofia.ramirez@example.com'),
('Diego', NULL, 'Torres', 'Gomez', '1989-11-22', 'M', 'Av 1 #3-15', 'diego.torres@example.com'),
('Valentina', 'Maria', 'Castillo', 'Perez', '1993-05-17', 'F', 'Calle 7 #9-40', 'valentina.castillo@example.com');

-- personal medico
INSERT INTO personal_medico (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, numero_licencia, cargo, correo_institucional)
VALUES
('Jorge', 'Andres', 'Salazar', 'Mejia', 'LIC-10000', 'Enfermero', 'jorge.salazar@hospital.org'),
('Claudia', NULL, 'Ramirez', 'Torres', 'LIC-10001', 'Enfermero', 'claudia.ramirez@hospital.org'),
('Fernando', 'Luis', 'Gomez', 'Diaz', 'LIC-10002', 'Enfermero', 'fernando.gomez@hospital.org'),
('Ricardo', NULL, 'Martinez', 'Lopez', 'LIC-10003', 'Doctor', 'ricardo.martinez@hospital.org'),
('Tatiana', 'Maria', 'Vargas', 'Castillo', 'LIC-10004', 'Enfermero', 'tatiana.vargas@hospital.org'),
('Luisa', NULL, 'Moreno', 'Garcia', 'LIC-10005', 'Enfermera', 'luisa.moreno@hospital.org'),
('Sebastian', 'David', 'Torres', 'Gonzalez', 'LIC-10006', 'Doctor', 'sebastian.torres@hospital.org'),
('Paola', NULL, 'Rojas', 'Fernandez', 'LIC-10007', 'Enfermera', 'paola.rojas@hospital.org'),
('Marcela', 'Andrea', 'Cruz', 'Navarro', 'LIC-10008', 'Doctora', 'marcela.cruz@hospital.org'),
('Isabel', NULL, 'Nieto', 'Delgado', 'LIC-10009', 'Enfermera', 'isabel.nieto@hospital.org');

-- nivel de urgencia
INSERT INTO nivel_urgencia (codigo_nivel, descripcion) VALUES
(1,'CRITICO'),(2,'GRAVE'),(3,'MODERADO'),(4,'LEVE');

-- enfermedad
INSERT INTO enfermedad (nombre_enfermedad, descripcion, codigo_enfermedad, tratamiento, categoria)
VALUES
('Neumonia', 'Infeccion pulmonar', 10001, 'Antibioticos y reposo', 'Respiratoria'),
('Gastroenteritis', 'Inflamacion gastrointestinal', 20001, 'Hidratacion y dieta', 'Infecciosa'),
('Migraña', 'Dolor de cabeza intenso', 30001, 'Analgesicos', 'Neurologica'),
('Diabetes', 'Alteracion de glucosa', 40001, 'Insulina y dieta', 'Metabolica'),
('Hipertension', 'Presion arterial elevada', 50001, 'Antihipertensivos', 'Cardiovascular'),
('Bronquitis', 'Inflamacion de bronquios', 60001, 'Reposo y medicamentos', 'Respiratoria'),
('Covid-19', 'Infeccion viral', 70001, 'Aislamiento y tratamiento', 'Viral'),
('Otitis', 'Inflamacion del oido', 80001, 'Antibioticos', 'Infecciosa'),
('Anemia', 'Deficiencia de hierro', 90001, 'Suplementos de hierro', 'Hematologica'),
('Dermatitis', 'Inflamacion de la piel', 100001, 'Cremas y antihistaminicos', 'Dermatologica');

-- sintoma
INSERT INTO sintoma (nombre_sintoma, descripcion)
VALUES
('Fiebre', 'Temperatura mayor a 38°C'),
('Tos persistente', 'Tos por más de 2 semanas'),
('Dolor abdominal', 'Dolor localizado en el abdomen'),
('Dolor de cabeza', 'Presión en la cabeza'),
('Náuseas', 'Sensación de vómito'),
('Fatiga', 'Cansancio extremo'),
('Dificultad para respirar', 'Sensación de ahogo'),
('Dolor en el pecho', 'Molestia torácica'),
('Pérdida de apetito', 'No desea comer'),
('Erupciones', 'Manchas en la piel');

-- enfermedad - sintoma
INSERT INTO enfermedad_sintoma (enfermedad_id_enfermedad, sintoma_id_sintoma)
VALUES
(1,1),(1,2),(1,7),
(2,3),(2,5),(2,9),
(3,4),(3,6),(3,5),
(4,6),(4,9),
(5,8),(5,4),
(6,2),(6,7),(6,1),
(7,1),(7,2),(7,7),(7,6),(7,9),
(8,1),(8,4),
(9,6),(9,9),
(10,10);

-- visita
INSERT INTO visita (fecha_visita, hora_visita, motivo_consulta, estado_visita, paciente_id_paciente)
VALUES
('2025-11-04', '08:30:00', 'Consulta por fiebre y tos', 'ALTA', 1),
('2025-11-04', '08:31:00', 'Dolor abdominal persistente', 'EN OBSERVACION', 2),
('2025-11-04', '08:32:00', 'Dolor de cabeza intenso', 'ALTA', 3),
('2025-11-04', '08:33:00', 'Control de diabetes', 'EN TRATAMIENTO', 4),
('2025-11-04', '08:34:00', 'Presión arterial elevada', 'EN OBSERVACION', 5),
('2025-11-04', '08:35:00', 'Síntomas respiratorios', 'ATENCION', 6),
('2025-11-04', '08:36:00', 'Fatiga y pérdida de apetito', 'EN TRATAMIENTO', 7),
('2025-11-04', '08:37:00', 'Dolor en el pecho', 'ATENCION', 8),
('2025-11-04', '08:38:00', 'Erupciones en la piel', 'EN TRATAMIENTO', 9),
('2025-11-04', '08:39:00', 'Consulta general', 'EN OBSERVACION', 10);

-- triage
INSERT INTO triage (observaciones, constantes_vitales, hora_atencion, visita_id_visita, personal_medico_id_personal, nivel_urgencia_id_nivel_urgencia)
VALUES
('Paciente con fiebre y dificultad respiratoria', 'TA 120/80 TEMP 38.5 FC 95', '08:45:00', 1, 1, 1),
('Dolor abdominal moderado, hidratado', 'TA 110/70 TEMP 37.8 FC 88', '08:46:00', 2, 2, 2),
('Dolor de cabeza intenso, sin otros síntomas', 'TA 115/75 TEMP 36.9 FC 85', '08:47:00', 3, 3, 3),
('Paciente con antecedentes de diabetes, control estable', 'TA 130/85 TEMP 36.7 FC 80', '08:48:00', 4, 4, 4),
('Presión elevada, sin dolor torácico', 'TA 145/95 TEMP 36.8 FC 92', '08:49:00', 5, 5, 1),
('Síntomas respiratorios leves, sin fiebre', 'TA 120/80 TEMP 36.5 FC 78', '08:50:00', 6, 6, 2),
('Fatiga persistente, apetito reducido', 'TA 110/70 TEMP 36.6 FC 76', '08:51:00', 7, 7, 3),
('Dolor torácico leve, sin dificultad respiratoria', 'TA 125/80 TEMP 36.9 FC 82', '08:52:00', 8, 8, 4),
('Erupciones cutáneas, sin fiebre', 'TA 120/80 TEMP 36.8 FC 80', '08:53:00', 9, 9, 1),
('Consulta general, sin signos de alarma', 'TA 118/78 TEMP 36.6 FC 75', '08:54:00', 10, 10, 2);

-- triage_sintoma
INSERT INTO triage_sintoma (triage_id_triage, sintoma_id_sintoma)
VALUES
(1,1),(1,2),
(2,3),(2,5),
(3,4),(3,6),
(4,9),
(5,8),(5,4),
(6,2),(6,7),
(7,6),
(8,10),
(9,1),(9,9),
(10,3),(10,5);

-- diagnostico
INSERT INTO diagnostico (fecha_diagnostico, tipo_diagnostico, observaciones, enfermedad_id_enfermedad, triage_id_triage, personal_medico_id_personal, nivel_urgencia_id_nivel_urgencia)
VALUES
('2025-11-04', 'CONFIRMADO', 'Paciente con fiebre y tos, diagnóstico de neumonía confirmado', 1, 1, 1, 1),
('2025-11-04', 'PRELIMINAR', 'Síntomas gastrointestinales, posible gastroenteritis', 2, 2, 2, 2),
('2025-11-04', 'CONFIRMADO', 'Dolor de cabeza persistente, diagnóstico de migraña confirmado', 3, 3, 3, 3),
('2025-11-04', 'PRELIMINAR', 'Paciente con antecedentes de diabetes, se requiere seguimiento', 4, 4, 4, 4),
('2025-11-04', 'CONFIRMADO', 'Presión arterial elevada, diagnóstico de hipertensión confirmado', 5, 5, 5, 1),
('2025-11-04', 'PRELIMINAR', 'Síntomas respiratorios leves, posible bronquitis', 6, 6, 6, 2),
('2025-11-04', 'PRELIMINAR', 'Fatiga y pérdida de apetito, sospecha de Covid-19', 7, 7, 7, 3),
('2025-11-04', 'PRELIMINAR', 'Dolor en oído, posible otitis media aguda', 8, 8, 8, 4),
('2025-11-04', 'CONFIRMADO', 'Análisis de sangre confirma anemia', 9, 9, 9, 1),
('2025-11-04', 'PRELIMINAR', 'Erupciones cutáneas, posible dermatitis alérgica', 10, 10, 10, 2);