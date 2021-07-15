// return <div className="speechModal">
//     <p>{props.text}</p>
//     <input type="button" onClick={closeHandler} value="Schließen" />
// </div>

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function SpeechModal(props) {
    return (
        <Modal 
            show={true}
            onHide={props.onClose}
            fullscreen="xl-down"
            size="xl"
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <Modal.Title id="speechModalTitle">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{props.text}</p>
            </Modal.Body>
            <Modal.Footer className="speechModalFooter">
                <div>
                    <div><strong>Speaker:</strong> {props.speaker} ({props.affiliation})</div>
                    <div><strong>Datum:</strong>{props.date}</div>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default SpeechModal