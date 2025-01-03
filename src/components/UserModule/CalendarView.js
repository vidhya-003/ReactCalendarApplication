import React, { useState } from 'react';
import { format, getDaysInMonth, startOfMonth, addMonths, subMonths, isToday, isPast, isSameDay, parseISO } from 'date-fns';
import '../../css/CalendarView.css';  // Add your CSS for styling

const CalendarView = ({ communications = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [communicationDetails, setCommunicationDetails] = useState({
    date: '',
    type: '',
    notes: ''
  });

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    const communicationForDate = communications.filter((comm) => isSameDay(parseISO(comm.date), date));
    if (communicationForDate.length > 0) {
      setCommunicationDetails({
        ...communicationForDate[0],
      });
    }
  };

  const handleAddCommunication = () => {
    if (communicationDetails.type && communicationDetails.notes) {
      // Add communication logic here (e.g., updating state or calling an API)
      alert('Communication added');
    } else {
      alert('Please fill in all fields');
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const startDate = startOfMonth(currentMonth);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    let calendarDays = [];
    for (let i = 0; i < daysInMonth; i++) {
      const currentDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1);
      calendarDays.push(currentDay);
    }

    return (
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={handlePrevMonth}>Prev</button>
          <h2>{format(currentMonth, 'MMMM yyyy')}</h2>
          <button onClick={handleNextMonth}>Next</button>
        </div>
        <div className="calendar-body">
          <div className="calendar-weekdays">
            {weekDays.map((day) => (
              <div key={day} className="calendar-weekday">{day}</div>
            ))}
          </div>
          <div className="calendar-days">
            {calendarDays.map((day, index) => {
              const communicationForDay = communications.filter((comm) => isSameDay(parseISO(comm.date), day));
              return (
                <div
                  key={index}
                  className={`calendar-day ${isToday(day) ? 'today' : ''} ${isPast(day) ? 'past' : ''}`}
                  onClick={() => handleSelectDate(day)}
                >
                  {format(day, 'd')}
                  {communicationForDay.length > 0 && <div className="dot"></div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="calendar-container">
      <div className="calendar-view">
        {renderCalendar()}
      </div>
      {selectedDate && (
        <div className="communication-details">
          <h2>Communication Details for {format(selectedDate, 'MMMM d, yyyy')}</h2>
          <input
            type="text"
            value={communicationDetails.type}
            onChange={(e) => setCommunicationDetails({ ...communicationDetails, type: e.target.value })}
            placeholder="Communication Type"
          />
          <textarea
            value={communicationDetails.notes}
            onChange={(e) => setCommunicationDetails({ ...communicationDetails, notes: e.target.value })}
            placeholder="Notes"
          />
          <button onClick={handleAddCommunication}>Save Communication</button>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
