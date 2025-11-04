import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

function Notify({ show, onClose, message, type = "info" }) {
  const bgClass =
    type === "success"
      ? "bg-success text-white"
      : type === "error"
      ? "bg-danger text-white"
      : type === "warning"
      ? "bg-warning text-dark"
      : "bg-primary text-white";

  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 2000 }}>
      <Toast show={show} onClose={onClose} bg={bgClass} delay={4000} autohide>
        <Toast.Header closeButton={true}>
          <strong className="me-auto">
            {type === "success"
              ? "✅ Éxito"
              : type === "error"
              ? "❌ Error"
              : type === "warning"
              ? "⚠️ Advertencia"
              : "ℹ️ Información"}
          </strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default Notify;