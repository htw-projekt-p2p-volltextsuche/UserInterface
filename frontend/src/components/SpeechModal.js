function SpeechModal(props){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 

    function closeHandler(){
        props.onClick()
    }

    return <div className="speechModal">
        <p>{props.text}</p>
        <button onClick={closeHandler}>Schließen</button>
    </div>
}
export default SpeechModal