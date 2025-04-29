function Button({ type, children, onClick }) {
  return (
    <button className={`button-${type}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
