import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import '../styles/Calendar.css';
function Calendar({ onDateChange }) {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const handleChange = (date) => {
    setRange([date]);
    onDateChange({
      startDate: date.startDate,
      endDate: date.endDate,
    });
  };

  return (
    <div className="flex flex-col shadow-2xl p-4 rounded-4xl w-full h-full justify-start">
      <p className="mb-2 text-lg font-medium">How long is your trip?</p>
      <DateRange
        editableDateInputs={true}
        onChange={(date) => handleChange(date.selection)}
        moveRangeOnFirstSelection={false}
        ranges={range}
        className="w-[20vw] h-[30vh]"
      />
    </div>
  );
}

export default Calendar;
