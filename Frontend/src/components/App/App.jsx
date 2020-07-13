import React from 'react';
import H1 from "./../H1"
import H2 from "./../H2"
import H3 from "./../H3"
import HBold from "./../HeadingBold"

function App() {
  return (
    <div className="App">
      Hello world
      <H1 color="#232327">Team<HBold>Food</HBold></H1>
      <H2 color="#CACAFF">Po prostu zamów swoje <HBold>jedzenie</HBold>.</H2>
      <H3 color="#FFCA0C">Po prostu zamów swoje <HBold>jedzenie</HBold>.</H3>
    </div>
  )
}

export default App
