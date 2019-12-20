import React from "react";
import "./App.css";

import Grid from "./components/Grid/Grid";

function App() {
  console.log(window.innerWidth <= 760);
  return (
    <div className="App">
      <Grid />
    </div>
  );
}

export default App;
