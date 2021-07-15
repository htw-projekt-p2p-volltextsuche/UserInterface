import SpeechModal from "./SpeechModal"
import { useState } from "react"

function ListElement(props) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showSpeechModal = () => setIsModalOpen(true)
  const closeSpeechModal = () => setIsModalOpen(false)

  return (
    <div key={props._id} className="listElement">
      <div key={props._id} className="innerListElement" onClick={showSpeechModal}>
        <div className="elementTitel">{props.title}</div>
        <div className="elementExtra">
          {props.speaker}
          {props.affiliation}
          {props.date}
        </div>
      </div>
      {isModalOpen && <SpeechModal
        title={props.title}
        text={props.text}
        speaker={props.speaker}
        affiliation={props.affiliation}
        date={props.date}
        onClose={closeSpeechModal} />
      }
    </div>
  )
}
export default ListElement;