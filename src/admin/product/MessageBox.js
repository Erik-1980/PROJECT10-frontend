
export default function MessageBox (props) {
    const { message, onCancel } = props;
  
    return (
      <div className="modal">           
              <button type="button" className="close-button"  onClick={onCancel}>X</button>
              <p>{message}</p>
      </div>
    );
  };