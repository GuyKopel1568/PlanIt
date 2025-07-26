import React, { useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import '../styles/Calendar.css';
function Calendar({ onDateChange, selectedCountries, selectedDates }) {
  const [range, setRange] = useState(
    selectedDates || [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      },
    ]
  );

  useEffect(() => {
    if (selectedDates) {
      setRange(selectedDates.map((r) => ({ ...r, key: 'selection' })));
    }
  }, [selectedDates]);

  const handleChange = (date) => {
    setRange([date]);
    onDateChange({
      startDate: date.startDate,
      endDate: date.endDate,
    });
  };

  return (
    <div
      className={`${selectedCountries.length > 0 ? 'threeCols' : 'twoCols'} shadow-2xl rounded-4xl bg-white p-2 flex flex-col items-center`}
    >
      <p className="pb-2 text-lg font-semibold">How long is your trip?</p>

      <DateRange
        editableDateInputs={true}
        onChange={(date) => handleChange(date.selection)}
        moveRangeOnFirstSelection={false}
        ranges={range}
        className=""
      />
    </div>
  );
}

export default Calendar;
