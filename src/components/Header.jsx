const headers = [
  { type: 'default', value: '' },
  { type: 'prime', value: '' },
  { type: 'secondary', value: '' },
  { type: 'error', value: '' },
  { type: 'success', value: '' },
];

function Header({ type, text }) {
  return (
    <div className="min-h-screen   flex flex-col items-center justify-center space-y-6 bg-black">
      {text}
    </div>
  );
}

export default Header;
