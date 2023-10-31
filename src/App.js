import { useEffect, useState } from 'react';
import axios from 'axios';
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Item from './Item';


function App(props) {
  const [url, setUrl] = useState('https://localhost:7112/api/Hits/GetHits');
  const [pics, setPics] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  const [flag, setFlag] = useState(false);

  function getPics() {
    axios({
      method: 'post',
      url: `${url}?request=${searchStr}`,
      data: null,
    }).then(res => {
      setPics([]);
      setPics(res.data.value);
    })
  }

  useEffect(getPics, [flag])

  function search() {
    getPics();
    setFlag(!flag);
  }

  return (
    <div className="container">
      <div className="container-sm d-flex p-2 flex-wrap justify-content-end">
        <input className="m-1" onChange={e => setSearchStr(e.target.value)} value={searchStr} placeholder="Search"></input>
        <button className="btn btn-primary m-1" onClick={() => setSearchStr("")}>Clear</button>
        <button className="btn btn-primary m-1" onClick={search}>Search</button>
      </div>
      <div className="container-sm d-flex p-2 flex-wrap justify-content-evenly">
        {pics == null ? null : pics.map((i) => <Item key={i.id} pic={i}></Item>)}
      </div>
    </div>
  );
}

export default App;
