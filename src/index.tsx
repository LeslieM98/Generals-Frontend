import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Troop, { ITroopAPIResponse } from "./components/Troop.component";


const App = () => {
  const [troops, setUnits] = useState<ITroopAPIResponse[]>([])
  const fetchAllTroops = () => fetch("http://localhost:8080/troop/getall").then(x => x.json()).then(x => setUnits(x))
  useEffect(() => { fetchAllTroops() }, [])
  return (
    <div>
      {troops.map(troop => <Troop data={troop} />)}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))

