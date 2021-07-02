import { useState } from "react";
import { useForm } from "react-hook-form";
function SearchForm(params) {
  const { register, handleSubmit, getValues } = useForm();

  const onSubmit = (data) => {
    //mockQueryResult();
    sendQuery(buildJSON(data));
  };
  const [resultListEntries, setResultListEntries] = useState([]);

  const [inputFulltextList, setInputFulltextList] = useState([]);
  const [fulltextRowCount, setFulltextRowCount] = useState(0);

  const [inputSpeakerList, setinputSpeakerList] = useState([]);
  const [speakerRowCount, setSpeakerRowCount] = useState(1);

  const [inputAffiliationList, setInputAffiliationList] = useState([]);
  const [affiliationRowCount, setAffiliationRowCount] = useState(1);

  return (
    <div className="formContainer">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="formHeader">
          <div className="formMainRow">
            <label className="freieSucheLabel">Freie Suche</label>
            <br />
            <input
              className="mainTextInput"
              type="text"
              {...register("mainTerm")}
            ></input>
          </div>
          <input
            type="button"
            id="addSearchButton"
            value="+"
            onClick={addFulltextFormRow}
          ></input>
        </div>
        {inputFulltextList}
        <br />
        <div className="formHeader">
          <div className="formMainRow">
            <label className="freieSucheLabel">Redner</label>
            <br />
            <input
              className="mainTextInput"
              type="text"
              {...register("speaker0")}
            ></input>
          </div>
          <input
            type="button"
            id="addSearchButton"
            value="+"
            onClick={addSpeakerFormRow}
          ></input>
        </div>
        {inputSpeakerList}
        <br />
        <div className="formHeader">
          <div className="formMainRow">
            <label className="freieSucheLabel">Partei</label>
            <br />
            <input
              className="mainTextInput"
              type="text"
              {...register("affiliation0")}
            ></input>
          </div>
          <input
            type="button"
            id="addSearchButton"
            value="+"
            onClick={addAffiliationFormRow}
          ></input>
        </div>
        {inputAffiliationList}
        <input type="submit"></input>
      </form>
      {resultListEntries}
    </div>
  );

  function mockQueryResult() {
    let data = {"total":1,"results":[{"doc_id":"2cd6a8db-fdcd-4f56-9356-5e937540c94b","score":1.870930349021494}]};
    buildResultList(data);
  }

  function buildResultList(data) {
    var string = new TextDecoder().decode(data);
    data = JSON.parse(string);
    console.log(data);
    console.log(data.results);
    let i = 0;
    let entries = [];
    let metaData = {};
    while (i < data.results.length) {
      //metaData = getMetaData(data.results[i].docId);
      entries.push(addListElement(i, data.results[i].doc_id, metaData.speaker, metaData.affiliation, metaData.date, metaData.sample));
      i++;
    }
    setResultListEntries(entries);
    return resultListEntries;
  }

  function getMetaData(uuid){
    const url = 'mongodb://localhost:8430/';
  }

  function addListElement(i, title, speaker, affiliation, date, sample) {
    return (
      <div key={i} className="listElement">
        <div className="elementTitel">{title}</div>
        <div className="elementExtra">
          {speaker}
          {affiliation}
          {date}
        </div>
        <div className="textSample">{sample}</div>
      </div>
    );
  }

  function buildJSON() {
    let additions = [];

    for (let index = 0; index < fulltextRowCount; index++) {
      let fulltextKey = "fulltext" + index;
      let operatorKey = "fulltextOperator" + index;
      let addition = {
        connector: getValues(operatorKey),
        terms: getValues(fulltextKey),
      };
      additions.push(addition);
    }

    let filter = [];

    for (let index = 0; index < speakerRowCount; index++) {
      let speakerKey = "speaker" + index;
      let oneFilter = {
        criteria: "speaker",
        value: getValues(speakerKey),
      };
      filter.push(oneFilter);
    }

    for (let index = 0; index < affiliationRowCount; index++) {
      let affiliationKey = "affiliation" + index;
      let oneFilter = {
        criteria: "affiliation",
        value: getValues(affiliationKey),
      };
      filter.push(oneFilter);
    }

    let terms = getValues("mainTerm");
    let query = {
      search: {
        max_results: 25,
        query: {
          terms: terms,
          additions: additions,
        },
        filter: filter,
      },
    };
    return JSON.stringify(query);
  }

  function sendQuery(json) {
    fetch(window.location.protocol + "//" + window.location.host + ":8421/api/searches", {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(responseJson => responseJson.body.getReader().read())
    .then(({_, value})=> buildResultList(value))
    .catch((error) => console.log(error));
    // .then((data) => {
    //     buildResultList(JSON.parse(data));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  function addFulltextFormRow(params) {
    setInputFulltextList(
      inputFulltextList.concat(addFormRow(fulltextRowCount, "fulltext"))
    );
    setFulltextRowCount(fulltextRowCount + 1);
  }
  function addSpeakerFormRow(params) {
    setinputSpeakerList(
      inputSpeakerList.concat(addFormRow(speakerRowCount, "speaker"))
    );
    setSpeakerRowCount(speakerRowCount + 1);
  }
  function addAffiliationFormRow(params) {
    setInputAffiliationList(
      inputAffiliationList.concat(
        addFormRow(affiliationRowCount, "affiliation")
      )
    );
    setAffiliationRowCount(affiliationRowCount + 1);
  }

  function addFormRow(index, type) {
    if (type === "fulltext") {
      return (
        <div key={index} className="formRow">
          <select
            className="regexSelect"
            {...register("fulltextOperator" + index)}
          >
            <option value="and">und</option>
            <option value="or">oder</option>
            <option value="and_not">und nicht</option>
          </select>
          <br />
          <input type="text" {...register("fulltext" + index)} />
        </div>
      );
    } else if (type === "speaker") {
      return (
        <div key={index} className="formRow">
          <label className="extraSucheLabel">oder</label>
          <br />
          <input type="text" {...register("speaker" + index)} />
        </div>
      );
    } else if (type === "affiliation") {
      return (
        <div key={index} className="formRow">
          <label className="extraSucheLabel">oder</label>
          <br />
          <input type="text" {...register("affiliation" + index)} />
        </div>
      );
    }
  }
}
export default SearchForm;
