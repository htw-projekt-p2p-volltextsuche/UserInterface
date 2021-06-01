function ListElement(params) {
    return(
        <div className="listElement">
            <div className="elementTitel">{params.titel}</div>
            <div className="elementExtra">Dr. von Undzu, Krasse Partei, 14.05.12</div>
            <div className="textSample">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</div>
        </div>
    );
}
export default ListElement;