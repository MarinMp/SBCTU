# 🏥 SBCTU – Sistema de Base de Conocimientos para Triage en Urgencias

**SBCTU** es una aplicación full-stack diseñada para apoyar el proceso de **triaje hospitalario**, permitiendo registrar visitas, pacientes, triages, diagnósticos, síntomas, enfermedades y niveles de urgencia.  
El sistema proporciona una vista consolidada y analítica del flujo de atención mediante un panel interactivo (dashboard) desarrollado en React, y una API REST robusta construida en Spring Boot.

---

## 🧩 1. Descripción General

El proyecto busca ofrecer una solución modular y escalable para la gestión del proceso de **triaje en servicios de urgencias**, incorporando la relación entre **síntomas, enfermedades y diagnósticos médicos**.  

Cuenta con:
- **Backend (API REST)**: desarrollado en **Spring Boot**.
- **Frontend (Dashboard Web)**: construido en **React**.
- **Base de Datos relacional**: implementada en **MariaDB** sobre Debian 12.
- **Arquitectura distribuida** entre una **máquina virtual Debian (base de datos)** y un **host Windows (cliente + servidor)**.

---

## ⚙️ 2. Arquitectura General

```
┌──────────────────────────────┐
│          FRONTEND             │
│  React + Bootstrap + ChartJS   │
│  (Puerto 3000 - Windows Host)  │
└──────────────┬────────────────┘
               │ REST API
               ▼
┌──────────────────────────────┐
│           BACKEND            │
│   Spring Boot (Java 17)      │
│   (Puerto 8081 - IntelliJ)   │
└──────────────┬────────────────┘
               │ JDBC
               ▼
┌──────────────────────────────┐
│        BASE DE DATOS         │
│ MariaDB 10.11 – Debian 12    │
│ (IP fija: 192.168.56.102)    │
└──────────────────────────────┘
```

---

## 🧠 3. Tecnologías Principales

| Capa | Tecnología | Descripción |
|------|-------------|-------------|
| **Frontend** | React 18, Bootstrap 5, React Icons, Chart.js | Interfaz dinámica, panel de métricas y gestión visual |
| **Backend** | Java 17, Spring Boot 3.x, Spring Data JPA | API REST, servicios de negocio y conexión con BD |
| **Base de Datos** | MariaDB 10.11 (sobre Debian 12) | Persistencia, relaciones entre entidades clínicas |
| **IDE / Entorno** | IntelliJ IDEA, Node.js, VS Code | Entornos de desarrollo integrados |
| **Infraestructura** | VirtualBox + Red Host-Only | Comunicación entre Host (Windows) y VM (Debian) |

---

## 🧩 4. Estructura del Proyecto

### 📦 Backend (`/backend` o `/sbctu`)

- **Controller Layer:** expone endpoints REST (`/sbctu/api/...`)
- **Service Layer:** lógica de negocio y validaciones.
- **Repository Layer:** acceso a datos mediante Spring Data JPA.
- **Entities / DTOs:** representación de datos persistentes y de transporte.

Ejemplo de endpoint:
```
GET  /sbctu/api/pacientes
POST /sbctu/api/diagnosticos
```

### 💻 Frontend (`/frontend`)
- **React Router:** para navegación entre vistas (`/pacientes`, `/diagnosticos`, `/dashboard`...).
- **Bootstrap / CSS personalizado:** para el diseño visual moderno.
- **Chart.js:** para visualización de métricas en tiempo real.
- **Axios / Fetch:** para consumir los endpoints del backend.

---

## 🗄️ 5. Base de Datos (MariaDB)

### Conexión
Configurada en el archivo `application.properties` del backend:

```properties
spring.datasource.url=jdbc:mysql://192.168.56.102:3306/sbctu?useSSL=false&serverTimezone=UTC
spring.datasource.username=sbctu_user
spring.datasource.password=sbctu_pass
spring.datasource.driver-class-name=org.mariadb.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
```

### Estructura Principal
Tablas:
- `paciente`
- `personal_medico`
- `sintoma`
- `enfermedad`
- `nivel_urgencia`
- `visita`
- `triage`
- `diagnostico`
- `triage_sintoma`
- `enfermedad_sintoma`

Con relaciones 1:N y N:M según el modelo entidad-relación.

---

## 🧱 6. Implementación del Sistema

### 🔹 Backend
**Requisitos previos:**
- Java 17+
- Maven 3.8+
- IntelliJ IDEA / Eclipse

**Ejecución:**
```bash
# Clonar el repositorio
git clone https://github.com/tuusuario/SBCTU.git
cd SBCTU/backend

# Compilar y ejecutar
mvn spring-boot:run
```

Por defecto, el backend corre en:
> http://localhost:8081/sbctu/api

---

### 🔹 Base de Datos (Debian 12)
**Instalación:**
```bash
sudo apt update
sudo apt install mariadb-server
sudo systemctl enable mariadb
sudo systemctl start mariadb
```

**Configuración de acceso remoto:**
1. Editar `/etc/mysql/mariadb.conf.d/50-server.cnf`:
   ```
   bind-address = 0.0.0.0
   ```
2. Crear usuario remoto:
   ```sql
   CREATE USER 'sbctu_user'@'%' IDENTIFIED BY 'sbctu_pass';
   GRANT ALL PRIVILEGES ON sbctu.* TO 'sbctu_user'@'%';
   FLUSH PRIVILEGES;
   ```

3. Permitir el puerto:
   ```bash
   sudo ufw allow 3306/tcp
   ```

---

### 🔹 Frontend (React)
**Requisitos previos:**
- Node.js 18+
- npm 9+

**Instalación:**
```bash
cd SBCTU/frontend
npm install
npm start
```

El frontend estará disponible en:
> http://localhost:3000

---

## 📊 7. Dashboard Interactivo

El dashboard incluye:
- Métricas visuales (pacientes atendidos, triages diarios, diagnósticos por tipo).
- Gráficos de barras y torta mediante Chart.js.
- Sección lateral moderna con navegación (React Router + Bootstrap).
- Adaptación responsive con CSS personalizado.

---

## 🧩 8. Despliegue (Deployment)

### 🔹 En entorno local (Windows + Debian)
1. Asegurar que la máquina Debian tenga IP fija (ej. 192.168.56.102).
2. Ejecutar MariaDB (`sudo systemctl start mariadb`).
3. Levantar el backend con `mvn spring-boot:run`.
4. Iniciar el frontend con `npm start`.
5. Acceder desde navegador:
   ```
   http://localhost:3000
   ```

### 🔹 En entorno productivo (opcional)
- Empaquetar backend:
  ```bash
  mvn clean package
  java -jar target/sbctu-0.0.1-SNAPSHOT.jar
  ```
- Compilar frontend:
  ```bash
  npm run build
  ```
- Servir estáticos en Nginx o Apache.

---

## 🧑‍💻 9. Autores y Créditos

**Equipo de desarrollo:**  
- 👨‍💻 Miguel — Full Stack Developer  
- 👩‍💻 [Nombre compañera] — Frontend Developer  
- 🎓 Proyecto académico – SENA / Universidad El Bosque  

---

## 📜 10. Licencia
Proyecto académico de libre uso bajo licencia **MIT**.
