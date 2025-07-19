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
    <div className="flex flex-col gap-4 shadow-2xl rounded-4xl pr-4 pl-4 pt-4">
      <p className="pb-2">How long is your trip?</p>
      <div className="flex items-center ">
        <DateRange
          editableDateInputs={true}
          onChange={(date) => handleChange(date.selection)}
          moveRangeOnFirstSelection={false}
          ranges={range}
          className="scale-110 h-[40vh] rounded-4xl "
        />
      </div>
    </div>
  );
}

export default Calendar;
