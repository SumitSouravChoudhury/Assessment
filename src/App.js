import React from "react";
import UserList from "./Components/UserList";
import Header from "./Components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <hr style={{width: '100%'}}></hr>
      <UserList />
    </div>
  );
}

export default App;
