import { useRef, useEffect, useState } from "react";
import ListElement from "./ListElement";
function ResultList(params) {

    const data = useRef(new Object());

    useEffect(() => {
        data.current = JSON.parse(params.data);
    });

  return (<div>
      {data}
  </div>
  )
  function getMetaData() {
    let data = JSON.parse(params.data);
    let entries = data.results;
    console.log(entries[0].docId);
    console.log(entries[1].docId);
    console.log(entries[2].docId);
        for (let i = 0; i < entries.length; i++) {
            <ListElement title={data.results[i].docId} />
          }
  }
}
export default ResultList;
