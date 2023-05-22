
export default function ModalConfirm(props) {
  const { message, onConfirm, onCancel } = props;

  return (
    <div className="modal" >           
            <button type="button" className="close-button"  onClick={onCancel}>X</button>
          <div>
            <p>{message}</p>
            <p style={{ fontSize: "20px", textAlign: "center", color: 'red', width: 'bolder' }}>Are you sure you want to perform this action?</p>
          </div>
            <button type="button"  onClick={onCancel}>Cancel</button>
            <br/>  <br/>
            <button type="button" onClick={onConfirm}>Confirm</button>
    </div>
  );
}
