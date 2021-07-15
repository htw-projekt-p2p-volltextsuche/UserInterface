import SpeechModal from "./SpeechModal"
import { useState } from "react"

function ListElement(props) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showSpeechModal = () => setIsModalOpen(true)
  const closeSpeechModal = () => setIsModalOpen(false)
  const shortTitle = (props.title.length > 250) ? props.title.substring(0, 250) + "..." : props.title
  return (
    <div key={props._id} className="listElement">
      <div className="innerListElement" onClick={showSpeechModal}>
        <div className="elementTitel">{shortTitle}</div>
        <div className="elementExtra">
          <label><strong>{props.speaker}</strong></label>
          <label>{props.affiliation}</label>
          <label>{props.date}</label>
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