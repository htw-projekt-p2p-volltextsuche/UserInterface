function SpeechModal(props){
    function closeHandler(){
        props.onClick()
    }

    return <div className="speechModal">
        <p>{props.text}</p>
        <button onClick={closeHandler}>Schließen</button>
    </div>
}
export default SpeechModal