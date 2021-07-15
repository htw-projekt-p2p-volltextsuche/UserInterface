import SpeechModal from "./SpeechModal"
import Backdrop from "./Backdrop"
import { useState } from "react";
function ListElement(props) {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    function showSpeechModal(){
        setModalIsOpen(true);
        console.log("showModal: " + modalIsOpen)
      }
    
      function closeSpeechModal() {
        setModalIsOpen(false);
        console.log("showModal: " + modalIsOpen)
      }

    return(<div key={props._id} className="listElement" onClick={showSpeechModal}>
    <div className="elementTitel">{props.title}</div>
    <div className="elementExtra">
      {props.speaker}
      {props.affiliation}
      {props.date}
    </div>
    {modalIsOpen ? <SpeechModal onClick={closeSpeechModal} text={props.text}/> : null}
    {modalIsOpen ? <Backdrop onClick={closeSpeechModal}/> : null}
  </div>)
}
export default ListElement;