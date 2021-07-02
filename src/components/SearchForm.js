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
    let data = {
      total: 3,
      results: [
        {
          docId: "5b1b4727-0bb6-49d6-b8f2-401561fc8ebc",
          score: 0.6782134,
          positions: [76, 123, 612],
        },
        {
          docId: "7912d5ce-9e53-4317-82ac-c309e1d7674c",
          score: 0.3582134,
          positions: [36, 122],
        },
        {
          docId: "f74a18bc-cdec-4f7c-9b7d-0b0ec2ec3683",
          score: 0.1282134,
          positions: [50, 143],
        },
      ],
    };
    buildResultList(data);
  }

  function buildResultList(data) {
    console.log(data);
    console.log(data.results);
    let i = 0;
    let entries = [];
    let metaData = {};
    while (i < data.results.length) {
      metaData = getMetaData(data.results[i].docId);
      entries.push(addListElement(i, metaData.title, metaData.speaker, metaData.affiliation, metaData.date, metaData.sample));
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
      },
    })
    .then((responseJson) => {
      buildResultList(responseJson);
    })
    .catch((error) => {
      console.log(error)
    });
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
