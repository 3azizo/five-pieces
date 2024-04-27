// src/App.js

import React, { useState } from 'react';
import './App.css';
import Board from './Board3x3';
import EasyBoard from './EasyBoard';
import Board1vs1 from './Board1vs1';
import MediumBoard from './MediumBoard';
import HardBoard from './HardBoard';
import Grid_15 from './dev/Grid15';
function App() {
  const[level,setLevel]=useState("");
  const handleChange = (event) => {
    setLevel(event.target.value); 
  };


    return <div className="App">
    <div>
    <h1>five pieces</h1>
    <span>select level</span>
      <select value={level} onChange={handleChange}>
      <option selected > -- select an option -- </option>
      <option value="3x3">3x3</option>
      <option value="1vs1">1 vs 1</option>
      <option value="esayBorad">Esay level</option>
      <option value="medBorad">Medium level</option>
      <option value="hardBorad">Hard level</option>
      <option value="grid">Grid</option>
    </select>
    </div>
    
    {level=="3x3"&&<Board/>}
    {level=="1vs1"&&<Board1vs1/>}
    {level=="esayBorad"&&<EasyBoard/>}
    {level=="medBorad"&&<MediumBoard/>}
    {level=="grid"&&<Grid_15/>}
    {level=="hardBorad"&&<HardBoard/>}
  </div>

}

export default App;
