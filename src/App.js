import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [searchText, setSearchText] = useState([]);
  const [searchTextLink, setSearchTextLink] = useState([]);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      // console.log(e.key);
      switch (e.key) {
        case "ArrowDown":
          console.log("down");
          break;
        case "ArrowUp":
          console.log("up");
          break;
        default:
          break;
      }
    });
  });
  const apiCall = (str) => {
    fetch(
      `https://en.wikipedia.org/w/api.php?&origin=*&format=json&action=opensearch&search=${str}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSearchText(data[1]);
        setSearchTextLink(data[3]);
      });
  };
  var timer;

  //debounce
  const debounce = (value) => {
    clearTimeout(timer);
    setTimeout(() => {
      apiCall(value);
    }, 500);
  };

  //throttle
  // const throttle = (value) => {
  //   if (timer) return;
  //   setTimeout(() => {
  //     apiCall(value);
  //   }, 500);
  // };

  const inputClickHandler = (e) => {
    // console.log(e.target.value);
    if (e.target.value) debounce(e.target.value);
    // throttle(e.target.value)
    // apiCall(e.target.value);
  };
  return (
    <div className="App">
      <h1>Wiki Search</h1>
      <div className="search-container">
        <input
          className="input"
          type="text"
          placeholder="Search"
          onChange={inputClickHandler}
        />
        <div className="serach-result">
          {searchText &&
            searchText.map((item, index) => (
              <div className="result" key={`${index + 1}`}>
                <a href={`${searchTextLink[index]}`} onClick={() => {}}>
                  {item}
                </a>
                <br />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
