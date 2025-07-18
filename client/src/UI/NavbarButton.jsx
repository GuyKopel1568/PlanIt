import React from 'react';

function NavbarButton({ Icon, action, x = 0, y = 0, children }) {
  const commonStyle = {
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`,
    transform: 'translate(-50%, -50%)',
  };

  return (
    <div
      style={commonStyle}
      className="w-16 h-16 flex items-center justify-center bg-sky-400 dark:bg-sky-900 text-sky-60 dark:text-sky-600 rounded-full hover:text-sky-800 transition duration-300 cursor-pointer active:scale-70"
      onClick={action}
    >
      {children}
    </div>
  );
}

export default NavbarButton;
