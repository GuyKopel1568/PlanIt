import React from 'react';

const ButtonTypes = {
  PRIMARY:
    'bg-sky-600 dark:bg-sky-950 text-sky-950 dark:text-sky-600 hover:text-sky-800 transition duration-300 cursor-pointer font-semibold active:scale-90 rounded-full w-18 h-18',
  SECONDARY:
    'bg-sky-600 dark:bg-sky-950 text-sky-950 dark:text-sky-600 hover:text-sky-800 transition duration-300 cursor-pointer font-semibold active:scale-90 rounded-full w-18 h-18',
  TERTIARY:
    'bg-sky-600 dark:bg-sky-950 text-sky-950 dark:text-sky-600 hover:text-sky-800 transition duration-300 cursor-pointer font-semibold active:scale-90 rounded-full w-18 h-18',
  DANGER:
    'bg-red-500 flex justify-center items-center text-sky-950 hover:bg-red-600 focus:bg-red-600 cursor-pointer font-semibold active:scale-90 rounded-full w-9 h-9',
  APPROVE:
    'dark:bg-sky-950 bg-green-950 flex justify-center items-center text-sky-950 hover:bg-green-600 focus:bg-green-600 cursor-pointer font-semibold active:scale-90 rounded-full w-9 h-9',
  LINK: 'bg-sky-600 dark:bg-sky-950 text-sky-950 dark:text-sky-600 hover:text-sky-800 transition duration-300 cursor-pointer font-semibold active:scale-90 rounded-full w-18 h-18',
  NAVBAR:
    'bg-sky-600 dark:bg-sky-950 text-sky-950 dark:text-sky-600 hover:text-sky-800 transition duration-300 cursor-pointer font-semibold active:scale-90 rounded-full w-18 h-18',
  'NAVBAR-APPROVE':
    'flex justify-center items-center bg-sky-600 dark:bg-sky-950 text-sky-950 dark:text-sky-600 hover:text-sky-800 cursor-pointer font-semibold active:scale-90 rounded-full w-9 h-9',
  'NAVBAR-DANGER':
    'bg-sky-600 dark:bg-sky-950 text-sky-950 dark:text-sky-600 hover:text-sky-800 flex justify-center items-center cursor-pointer font-semibold active:scale-90 rounded-full w-9 h-9',
};

function Button({ type, text, onClick, image }) {
  return (
    <button className={`button ${ButtonTypes[type]}`} onClick={onClick}>
      {image && <span className="mr-2">{image}</span>}
      {text}
    </button>
  );
}

export default Button;
