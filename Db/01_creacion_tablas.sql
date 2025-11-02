-- 01_creacion_tablas.sql
-- Proyecto Final - Bases de Datos 1
-- Sistema de Base de Conocimientos para Triage en Urgencias (sbctu)
-- Crea la base de datos y todas las tablas principales
-- Motor: MySQL (Workbench 8.0+)

-- Elimina la base si ya existe y crea una nueva
DROP DATABASE if exists sbctu;
CREATE DATABASE sbctu character SET utf8mb4 collate utf8mb4_0900_ai_ci;
USE sbctu;

-- tabla: paciente
-- Guarda la información personal y de contacto
CREATE TABLE paciente (
  id_paciente INT AUTO_INCREMENT PRIMARY KEY,
  primer_nombre VARCHAR(15) NOT NULL,
  segundo_nombre VARCHAR(15),
  primer_apellido VARCHAR(15) NOT NULL,
  segundo_apellido VARCHAR(15),
  fecha_nacimiento DATE NOT NULL,
  genero CHAR(1) NOT NULL,
  direccion VARCHAR(50),
  correo VARCHAR(100) NOT NULL UNIQUE
);

-- tabla: personal_medico
-- Médicos o enfermeros que realizan triages y diagnósticos
CREATE TABLE personal_medico (
  id_personal INT AUTO_INCREMENT PRIMARY KEY,
  primer_nombre VARCHAR(15) NOT NULL,
  segundo_nombre VARCHAR(15),
  primer_apellido VARCHAR(15) NOT NULL,
  segundo_apellido VARCHAR(15),
  numero_licencia VARCHAR(30) NOT NULL UNIQUE,
  cargo VARCHAR(20) NOT NULL,
  correo_institucional VARCHAR(100) NOT NULL UNIQUE
);

-- tabla: nivel_urgencia
-- Define la prioridad de atención (1 Crítico - 4 Leve)
CREATE TABLE nivel_urgencia (
  id_nivel_urgencia INT AUTO_INCREMENT PRIMARY KEY,
  codigo_nivel TINYINT NOT NULL UNIQUE,
  descripcion VARCHAR(30) NOT NULL
);

-- tabla: enfermedad
-- Registra las enfermedades conocidas en la base de conocimiento
CREATE TABLE enfermedad (
  id_enfermedad INT AUTO_INCREMENT PRIMARY KEY,
  nombre_enfermedad VARCHAR(50) NOT NULL,
  descripcion VARCHAR(100),
  codigo_enfermedad INT NOT NULL UNIQUE,
  tratamiento VARCHAR(100),
  observaciones VARCHAR(100),
  categoria VARCHAR(30) NOT NULL
);

-- tabla: sintoma
-- Lista de síntomas observados en los pacientes
CREATE TABLE sintoma (
  id_sintoma INT AUTO_INCREMENT PRIMARY KEY,
  nombre_sintoma VARCHAR(100) NOT NULL,
  descripcion VARCHAR(100)
);

-- tabla: enfermedad_sintoma
-- Relación muchos a muchos entre enfermedades y síntomas
CREATE TABLE enfermedad_sintoma (
  sintoma_id_sintoma INT NOT NULL,
  enfermedad_id_enfermedad INT NOT NULL,
  PRIMARY KEY (sintoma_id_sintoma, enfermedad_id_enfermedad),
  CONSTRAINT fk_enf_sin_sintoma FOREIGN KEY (sintoma_id_sintoma) REFERENCES sintoma(id_sintoma),
  CONSTRAINT fk_enf_sin_enfermedad FOREIGN KEY (enfermedad_id_enfermedad) REFERENCES enfermedad(id_enfermedad)
);

-- tabla: visita
-- Cada ingreso de un paciente al área de urgencias
CREATE TABLE visita (
  id_visita INT AUTO_INCREMENT PRIMARY KEY,
  fecha_visita DATE NOT NULL,
  hora_visita TIME NOT NULL,
  motivo_consulta VARCHAR(200) NOT NULL,
  estado_visita VARCHAR(20) NOT NULL,
  paciente_id_paciente INT NOT NULL,
  triage_id_triage INT NULL,
  CONSTRAINT fk_visita_paciente FOREIGN KEY (paciente_id_paciente)
    REFERENCES paciente(id_paciente)
);

-- tabla: triage
-- Evaluación inicial realizada al paciente
CREATE TABLE triage (
  id_triage INT AUTO_INCREMENT PRIMARY KEY,
  observaciones VARCHAR(100) NOT NULL,
  constantes_vitales VARCHAR(100) NOT NULL,
  hora_atencion TIME NOT NULL,
  visita_id_visita INT NOT NULL,
  personal_medico_id_personal INT NOT NULL,
  nivel_urgencia_id_nivel_urgencia INT NOT NULL,
  CONSTRAINT fk_triage_visita FOREIGN KEY (visita_id_visita) REFERENCES visita(id_visita),
  CONSTRAINT fk_triage_personal FOREIGN KEY (personal_medico_id_personal) REFERENCES personal_medico(id_personal),
  CONSTRAINT fk_triage_nivel FOREIGN KEY (nivel_urgencia_id_nivel_urgencia) REFERENCES nivel_urgencia(id_nivel_urgencia)
);

-- clave FORÁNEA cruzada visita–triage
-- Se agrega después para evitar errores de referencia circular
alter TABLE visita
add CONSTRAINT fk_visita_triage
FOREIGN KEY (triage_id_triage)
REFERENCES triage(id_triage);

-- tabla: triage_sintoma
-- Relaciona los síntomas observados durante un triage
CREATE TABLE triage_sintoma (
  triage_id_triage INT NOT NULL,
  sintoma_id_sintoma INT NOT NULL,
  PRIMARY KEY (triage_id_triage, sintoma_id_sintoma),
  CONSTRAINT fk_triage_sintoma_triage FOREIGN KEY (triage_id_triage) REFERENCES triage(id_triage),
  CONSTRAINT fk_triage_sintoma_sintoma FOREIGN KEY (sintoma_id_sintoma) REFERENCES sintoma(id_sintoma)
);

-- tabla: diagnostico
-- Resultado médico emitido tras la evaluación
CREATE TABLE diagnostico (
  id_diagnostico INT AUTO_INCREMENT PRIMARY KEY,
  fecha_diagnostico DATE NOT NULL,
  tipo_diagnostico VARCHAR(20) NOT NULL,
  observaciones VARCHAR(100),
  enfermedad_id_enfermedad INT NOT NULL,
  triage_id_triage INT NOT NULL,
  personal_medico_id_personal INT NOT NULL,
  nivel_urgencia_id_nivel_urgencia INT NOT NULL,
  CONSTRAINT fk_diag_enfermedad FOREIGN KEY (enfermedad_id_enfermedad) REFERENCES enfermedad(id_enfermedad),
  CONSTRAINT fk_diag_triage FOREIGN KEY (triage_id_triage) REFERENCES triage(id_triage),
  CONSTRAINT fk_diag_personal FOREIGN KEY (personal_medico_id_personal) REFERENCES personal_medico(id_personal),
  CONSTRAINT fk_diag_nivel FOREIGN KEY (nivel_urgencia_id_nivel_urgencia) REFERENCES nivel_urgencia(id_nivel_urgencia)
);
