import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import { addDays, set } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

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
    <div>
      <p>When would you like to go?</p>
      <DateRange
        editableDateInputs={true}
        onChange={(date) => handleChange(date.selection)}
        moveRangeOnFirstSelection={false}
        ranges={range}
        className="scale-90"
      />
    </div>
  );
}

export default Calendar;
