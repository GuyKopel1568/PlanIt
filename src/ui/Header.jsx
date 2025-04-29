

function Header({ children, type }) {
  return <div className={`header-${type}`}>{children}</div>;
}

export default Header;
