import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Format the date as needed (e.g., YYYY-MM-DD)
    const formattedDate = date.toISOString().split('T')[0];
    navigate(`/prenotazioni?date=${formattedDate}`);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <DatePicker 
        selected={selectedDate} 
        onChange={handleDateChange} 
        dateFormat="yyyy-MM-dd"
      />
    </div>
  );
};

export default Calendar;