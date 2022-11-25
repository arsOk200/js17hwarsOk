import React from 'react';
import CountryList from "./Components/Country-List/Country-list";
import InfoBlock from "./Components/Info-Block/Info-Block";

function App() {
  return (
    <div className="m-auto d-flex" style={{width:'890px'}}>
      <CountryList/>
      <div className="info-block w-75">
        <InfoBlock/>
      </div>

    </div>
  );
}

export default App;
