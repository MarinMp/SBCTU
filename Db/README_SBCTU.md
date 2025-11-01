\# README – Base de Datos SBCTU (Sistema de Base de Conocimientos para Triage en Urgencias)



\## Descripción general del proyecto



El sistema \*\*SBCTU\*\* (Sistema de Base de Conocimientos para Triage en Urgencias) tiene como propósito registrar, organizar y consultar la información generada durante el proceso de atención inicial (triage) en los servicios de urgencias de una institución hospitalaria.

&nbsp;

Además, cuenta con \*\*vistas, procedimientos almacenados y triggers\*\* que permiten automatizar operaciones y facilitar consultas globales del sistema.



---



\## Estructura general del proyecto



El proyecto de base de datos está compuesto por tres scripts principales:



1\. \*\*01\_creacion\_tablas.sql\*\*  

&nbsp;  Contiene las sentencias SQL necesarias para crear la base de datos, las tablas y las claves primarias y foráneas que definen las relaciones entre ellas.



2\. \*\*02\_insercion\_datos.sql\*\*  

&nbsp;  Incluye los registros de ejemplo para poblar las tablas con información inicial y realizar pruebas del sistema.



3\. \*\*03\_vistas\_y\_triggers.sql\*\*  

&nbsp;  Contiene las vistas, procedimientos almacenados y triggers diseñados para consultas clínicas y automatización de tareas.



---



\## Script 01 – Creación de objetos



El primer script define la estructura física de la base de datos.  

El flujo de ejecución elimina la base existente (si la hay), crea la nueva base `SBCTU` y define las siguientes tablas:



\- `PACIENTE`  

\- `PERSONAL\_MEDICO`  

\- `NIVEL\_URGENCIA`  

\- `ENFERMEDAD`  

\- `SINTOMA`  

\- `ENFERMEDAD\_SINTOMA`  

\- `VISITA`  

\- `TRIAGE`  

\- `TRIAGE\_SINTOMA`  

\- `DIAGNOSTICO`



\### Características técnicas:

\- Se declaran claves primarias y foráneas explícitas.  

\- Se definen relaciones \*\*1–N\*\* (por ejemplo, un paciente tiene muchas visitas) y \*\*N–N\*\* (por ejemplo, una enfermedad puede tener varios síntomas).  

\- Se establecen restricciones \*\*NOT NULL\*\* para campos obligatorios y \*\*UNIQUE\*\* para correos electrónicos y números de licencia.  

\- La codificación utilizada es \*\*utf8mb4\*\*, para soportar caracteres especiales y acentos.



---



\## Script 02 – Inserción de registros



El segundo script (`02\_insercion\_datos.sql`) inserta datos de ejemplo en las tablas principales, permitiendo realizar pruebas iniciales del sistema.



\### Datos cargados:

\- \*\*Pacientes:\*\* 2 registros (`Juan Pérez`, `Ana López`)  

\- \*\*Personal médico:\*\* 2 registros (`Laura Rodríguez`, `Miguel Suárez`)  

\- \*\*Niveles de urgencia:\*\* 4 registros (`Crítico`, `Grave`, `Moderado`, `Leve`)  

\- \*\*Enfermedades:\*\* 2 registros (`Neumonía`, `Gastroenteritis`)  

\- \*\*Síntomas:\*\* 3 registros (`Fiebre`, `Tos persistente`, `Dolor abdominal`)  

\- \*\*Relaciones enfermedad–síntoma:\*\* 4 asociaciones  

\- \*\*Visitas:\*\* 2 registros  

\- \*\*Triages:\*\* 2 evaluaciones médicas iniciales  

\- \*\*Triage–síntoma:\*\* 3 asociaciones  

\- \*\*Diagnósticos:\*\* 2 resultados médicos (uno preliminar y otro confirmado)



\### Propósito del script:

\- Probar las relaciones entre entidades.  

\- Permitir la ejecución de endpoints REST (desde Postman o un backend en Spring Boot).  

\- Simular el flujo de atención médica desde la llegada del paciente hasta su diagnóstico final.



---



\## Script 03 – Vistas, procedimientos y triggers



Este script complementa el modelo con componentes adicionales que permiten la automatización y el análisis global de la información.



\### Vista: `VW\_HISTORIAL\_PACIENTE`  

La vista muestra un historial clínico consolidado de cada paciente, incluyendo:

\- Nombre del paciente  

\- Fecha de visita  

\- Observaciones del triage  

\- Tipo de diagnóstico  

\- Enfermedad detectada  

\- Nivel de urgencia asociado  



La consulta combina las tablas \*\*PACIENTE\*\*, \*\*VISITA\*\*, \*\*TRIAGE\*\*, \*\*DIAGNOSTICO\*\*, \*\*ENFERMEDAD\*\* y \*\*NIVEL\_URGENCIA\*\* mediante \*\*JOINS\*\* para ofrecer una vista integral del caso clínico.



---



\### Procedimiento almacenado: `SP\_BUSCAR\_PACIENTE\_CORREO`  

Este procedimiento permite buscar un paciente mediante su correo electrónico.  

Recibe como parámetro de entrada el correo (`P\_CORREO`) y devuelve toda la información del paciente correspondiente.



---



\### Trigger: `TRG\_TRIAGE\_INSERT`  

Este trigger se ejecuta automáticamente cada vez que se inserta un nuevo registro en la tabla \*\*TRIAGE\*\*.  

Su función es actualizar la tabla \*\*VISITA\*\*, asignando el `ID\_TRIAGE` correspondiente al registro de la visita asociada.  



De esta manera se mantiene sincronizada la relación entre ambos registros, garantizando la integridad de los datos.



---



\## Orden de ejecución de los scripts



El orden correcto para ejecutar los scripts es el siguiente:



1\. \*\*01\_creacion\_tablas.sql\*\* → Crea la base de datos y las estructuras.  

2\. \*\*03\_vistas\_y\_triggers.sql\*\* → Crea vistas, procedimientos y triggers.

3\. \*\*02\_insercion\_datos.sql\*\* → Inserta los registros iniciales.  





> Es importante respetar este orden para evitar errores de referencia o dependencias no resueltas.



---



\## Características técnicas



\- \*\*Gestor de base de datos:\*\* MySQL 8.0+  

\- \*\*Motor de almacenamiento:\*\* InnoDB  

\- \*\*Codificación:\*\* UTF8MB4 (para compatibilidad completa con caracteres Unicode)  

\- \*\*Integridad referencial:\*\* Total, con claves foráneas explícitas y sin eliminaciones en cascada no controladas.  

\- \*\*Compatibilidad:\*\*  

&nbsp; - Framework \*\*Spring Boot (JPA / Hibernate)\*\*  

&nbsp; - Herramientas de prueba como \*\*Postman\*\* y \*\*MySQL Workbench\*\*  



---



\## Resumen general



\- \*\*Tablas creadas:\*\* 10  

\- \*\*Relaciones foráneas:\*\* 15  

\- \*\*Registros de prueba:\*\* 19  

\- \*\*Vistas creadas:\*\* 1 (`VW\_HISTORIAL\_PACIENTE`)  

\- \*\*Procedimientos almacenados:\*\* 1 (`SP\_BUSCAR\_PACIENTE\_CORREO`)  

\- \*\*Triggers:\*\* 1 (`TRG\_TRIAGE\_INSERT`)



---



\## Autoría



\*\*Nombre:\*\* Paula Marín y Laura Torres  

\*\*Proyecto:\*\* Sistema de Base de Conocimientos para Triage en Urgencias (SBCTU)  

\*\*Asignatura:\*\* Bases de Datos I  

\*\*Institución:\*\* Universidad el Bosque

\*\*Fecha:\*\* Octubre de 2025  



