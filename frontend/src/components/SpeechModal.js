function SpeechModal(props){
    function closeHandler(){
        props.onClick()
    }

    return <div className="speechModal">
        <p>{props.text}</p>
        <input type="button" onClick={closeHandler}>Schließen</input>
    </div>
}
export default SpeechModal