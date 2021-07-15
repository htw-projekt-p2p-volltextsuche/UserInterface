function ListElement(props) {
    return(<div key={data._id} className="listElement" >
    <div className="elementTitel">{title}</div>
    <div className="elementExtra">
      {data.speaker}
      {data.affiliation}
      {data.date}
    </div>
    <button onClick={showSpeechModal}>Show Speech</button>
    {modalIsOpen ? <SpeechModal onClick={closeSpeechModal} text={data.text}/> : null}
    {modalIsOpen ? <Backdrop onClick={closeSpeechModal}/> : null}
  </div>)
}