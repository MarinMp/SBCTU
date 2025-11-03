import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  
  const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Días vacíos del mes anterior
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };
  
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };
  
  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };
  
  // Días con eventos de triage (ejemplo: días 17, 19, 20, 21)
  const triageDays = [17, 19, 20, 21];
  
  const days = getDaysInMonth(currentDate);
  
  return (
    <Card className="calendar-card">
      <Card.Body>
        {/* Header del calendario */}
        <div className="calendar-header">
          <button className="calendar-nav-btn" onClick={prevMonth}>
            <FaChevronLeft />
          </button>
          <h6 className="calendar-month">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h6>
          <button className="calendar-nav-btn" onClick={nextMonth}>
            <FaChevronRight />
          </button>
        </div>
        
        {/* Días de la semana */}
        <div className="calendar-weekdays">
          {daysOfWeek.map((day, idx) => (
            <div key={idx} className="calendar-weekday">
              {day}
            </div>
          ))}
        </div>
        
        {/* Grid de días */}
        <div className="calendar-grid">
          {days.map((day, idx) => (
            <div
              key={idx}
              className={`calendar-day ${!day ? 'empty' : ''} ${
                isToday(day) ? 'today' : ''
              } ${triageDays.includes(day) ? 'has-event' : ''}`}
            >
              {day}
            </div>
          ))}
        </div>
        
        {/* Estadística de triages */}
        <div className="calendar-stats">
          <div className="stat-item">
            <div className="stat-label">Triages del mes</div>
            <div className="stat-value">
              <span className="stat-number">2</span>
              <span className="stat-change positive">+9%</span>
            </div>
            <div className="stat-subtitle">desde el mes pasado</div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CalendarWidget;