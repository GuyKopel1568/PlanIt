import Button from './Button';

function Popup({ children }) {
  return (
    <div className="popup">
      {children}
      <div className='popupButtons'>
        <Button type="cancel">Cancel</Button>
        <Button type="secondary">Confirm</Button>
      </div>
    </div>
  );
}

export default Popup;
