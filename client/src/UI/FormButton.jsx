import React from 'react';

function FormButton({ text, onClick }) {
  return (
    <button
      className="bg-sky-600 text-white rounded-4xl p-3 font-semibold text-md"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default FormButton;
