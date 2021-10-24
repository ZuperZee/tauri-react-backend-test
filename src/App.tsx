import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import tauriCircles from "./tauri.svg";
import tauriWord from "./wordmark.svg";
import "./App.css";

const getData = async () => {
  const response = await fetch("http://localhost:8000/", {
    headers: { Origin: "tauri://localhost" },
  });
  const data = await response.text();
  return data;
};

function App() {
  const [data, setData] = useState("Requesting");

  useEffect(() => {
    getData()
      .then((data) => setData(data))
      .catch((err) => {
        console.error(err);
        setData("No response from server");
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="inline-logo">
          <img src={tauriCircles} className="App-logo rotate" alt="logo" />
          <img src={tauriWord} className="App-logo smaller" alt="logo" />
        </div>
        <a
          className="App-link"
          href="https://tauri.studio"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Tauri
        </a>
        <img src={logo} className="App-logo rotate" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>
          <strong>Response from server:</strong> {data}
        </p>
        <p>{window.location.href}</p>
      </header>
    </div>
  );
}

export default App;
